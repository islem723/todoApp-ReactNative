import { config } from "dotenv";

config();

export const JWT_SECRET = `${process.env.JWT_SECRET}`;
export const JWT_EXPIRATION = `${process.env.JWT_EXPIRATION}`;
export const HASH_ROUNDS = `${process.env.HASH_ROUNDS}`;
export const __DEV__ = process.env.NODE_ENV !== "prod";
export const ATLAS_URL = `${process.env.ATLAS_URL}`;
