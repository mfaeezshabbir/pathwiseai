import { MongoClient } from "mongodb";

// Cached MongoClient to enable connection reuse and pooling across requests.
// Read env inside the function to avoid build-time access.
declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

export async function connectToDatabase(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI not configured");
  }

  if (global._mongoClient) {
    return global._mongoClient;
  }

  const client = new MongoClient(uri);
  await client.connect();
  global._mongoClient = client;
  return client;
}

export default connectToDatabase;
