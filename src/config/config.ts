import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.dev';
dotenv.config({ path: envFile });

export const getConfigValue = (paramName: string, defaultVal: any = null): any => {
  return typeof process.env[paramName] !== 'undefined' ? process.env[paramName] : defaultVal;
};
