import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ruthniddam';

  if (cached!.conn && mongoose.connection.readyState === 1) {
    return cached!.conn;
  }

  try {
    if (!cached!.promise) {
      cached!.promise = mongoose.connect(uri, {
        serverSelectionTimeoutMS: 3000,
        maxPoolSize: 10,
      });
    }
    cached!.conn = await cached!.promise;
    return cached!.conn;
  } catch (err: any) {
    console.warn('MongoDB connection unavailable:', err?.message || err);
    cached!.promise = null;
    cached!.conn = null;
    return null;
  }
}

export default connectDB;
