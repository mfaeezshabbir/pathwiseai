// Runs once, the first time the Mongo volume is created.
// `scripts/db-setup.mjs` creates the same indexes idempotently for existing databases.
const dbName = process.env.MONGO_INITDB_DATABASE || "pathwise";
const target = db.getSiblingDB(dbName);

target.users.createIndex({ email: 1 }, { unique: true, name: "email_unique" });
target.roadmaps.createIndex(
  { userId: 1, updatedAt: -1 },
  { name: "user_recent" },
);
target.projectIdeas.createIndex(
  { userId: 1, createdAt: -1 },
  { name: "user_recent" },
);

print(`[init] indexes created in "${dbName}"`);
