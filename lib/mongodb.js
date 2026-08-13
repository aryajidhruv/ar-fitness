import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables (see .env.example)");
}

// Reuse the connection across hot reloads in dev and across invocations
// in serverless (Vercel) so we don't open a new connection per request.
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
