// Prepares the database for the app. Safe to run repeatedly.
//
//   npm run db:setup   -> indexes + data migrations
//   npm run db:seed    -> the above, plus a local test user
//
// Reads MONGODB_URI from .env.
import { config } from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

config();

// Local-only test account. Override with SEED_USER_EMAIL / SEED_USER_PASSWORD.
const TEST_USER = {
  name: "Test Learner",
  email: process.env.SEED_USER_EMAIL || "test@pathwise.local",
  password: process.env.SEED_USER_PASSWORD || "pathwise-test-123",
};

const seed = process.argv.includes("--seed");
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("✖ MONGODB_URI is not set. Copy .env.example to .env first.");
  process.exit(1);
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

try {
  await client.connect();
  const db = client.db();
  console.log(`✔ Connected to "${db.databaseName}"`);

  await db
    .collection("users")
    .createIndex({ email: 1 }, { unique: true, name: "email_unique" });
  await db
    .collection("roadmaps")
    .createIndex({ userId: 1, updatedAt: -1 }, { name: "user_recent" });
  await db
    .collection("projectIdeas")
    .createIndex({ userId: 1, createdAt: -1 }, { name: "user_recent" });
  console.log("✔ Indexes ensured");

  // Older versions stored roadmaps.userId as a string; queries now expect an ObjectId.
  let migrated = 0;
  const legacy = db.collection("roadmaps").find({ userId: { $type: "string" } });
  for await (const doc of legacy) {
    if (!ObjectId.isValid(doc.userId)) continue;
    await db.collection("roadmaps").updateOne(
      { _id: doc._id },
      {
        $set: {
          userId: new ObjectId(doc.userId),
          updatedAt: doc.updatedAt ?? doc.createdAt ?? new Date(),
        },
      },
    );
    migrated++;
  }
  // Roadmaps saved before progress tracking existed
  const backfilled = await db.collection("roadmaps").updateMany(
    { progress: { $exists: false } },
    { $set: { progress: {}, progressPercent: 0 } },
  );
  console.log(
    `✔ Migrations: ${migrated} userId fixed, ${backfilled.modifiedCount} progress backfilled`,
  );

  if (seed) {
    const existing = await db.collection("users").findOne({ email: TEST_USER.email });
    if (existing) {
      console.log(`• Test user already exists: ${TEST_USER.email}`);
    } else {
      await db.collection("users").insertOne({
        name: TEST_USER.name,
        email: TEST_USER.email,
        password: await bcrypt.hash(TEST_USER.password, 10),
        createdAt: new Date(),
      });
      console.log(`✔ Created test user: ${TEST_USER.email} (password in scripts/db-setup.mjs)`);
    }
  }
} catch (err) {
  console.error("✖ Database setup failed:", err.message);
  console.error("  Is MongoDB running? Try `npm run db:up`.");
  process.exitCode = 1;
} finally {
  await client.close();
}
