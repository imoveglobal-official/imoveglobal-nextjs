import { MongoClient, type Db } from 'mongodb'

/**
 * Shared MongoDB connection helper.
 *
 * A single MongoClient is cached across hot-reloads in development (via a
 * global) and reused across serverless invocations in production, so we never
 * open a fresh connection pool on every request. This same file is mirrored in
 * the admin app — both connect to the SAME database/cluster.
 */

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || 'imoveglobal'

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable')
}

let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  // Reuse the connection across HMR reloads.
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  clientPromise = new MongoClient(uri).connect()
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise
  return client.db(dbName)
}

export default clientPromise
