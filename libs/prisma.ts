import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const database = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") 
  global.prisma = database;

export default database;