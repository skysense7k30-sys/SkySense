import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In dev, Next.js hot-reloads modules, which would otherwise open a new
  // MongoClient on every save. Cache the promise on the global object so
  // the same connection is reused across reloads.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, avoid the global and just create one client per instance.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;