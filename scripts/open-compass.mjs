// Opens MongoDB Compass connected to the MONGODB_URI in .env.
import { config } from "dotenv";
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";

config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("✖ MONGODB_URI is not set in .env");
  process.exit(1);
}

const candidates =
  process.platform === "win32"
    ? [
        path.join(process.env.LOCALAPPDATA ?? "", "MongoDBCompass", "MongoDBCompass.exe"),
        path.join(process.env.ProgramFiles ?? "", "MongoDB Compass", "MongoDBCompass.exe"),
      ]
    : process.platform === "darwin"
      ? ["/Applications/MongoDB Compass.app/Contents/MacOS/MongoDB Compass"]
      : ["/usr/bin/mongodb-compass"];

const exe = candidates.find((p) => existsSync(p));
if (!exe) {
  console.error("✖ MongoDB Compass not found. Install it from https://www.mongodb.com/products/compass");
  console.error("  Then connect manually using MONGODB_URI from your .env file.");
  process.exit(1);
}

spawn(exe, [uri], { detached: true, stdio: "ignore" }).unref();
console.log("✔ Launched MongoDB Compass");
