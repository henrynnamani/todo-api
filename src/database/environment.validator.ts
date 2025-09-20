import { z } from 'zod';

export const EnvSchema = z.object({
  DB_HOST: z.string().min(1, { message: 'DB_HOST is required' }),
  DB_PORT: z.coerce
    .number()
    .min(1, { message: 'DB_PORT must be a valid port number' }),
  DB_USERNAME: z.string().min(1, { message: 'DB_USERNAME is required' }),
  DB_PASSWORD: z.string().min(1, { message: 'DB_PASSWORD is required' }),
  DB_NAME: z.string().min(1, { message: 'DB_NAME is required' }),
  NODE_ENV: z.enum(['development', 'production', 'test'], {
    message: "NODE_ENV must be one of 'development', 'production', or 'test'",
  }),
  JWT_SECRET: z.string().min(1, { message: 'JWT_SECRET is required' }),
  JWT_ACCESS_EXPIRY: z
    .string()
    .min(1, { message: 'JWT_ACCESS_EXPIRY is required' }),
});
