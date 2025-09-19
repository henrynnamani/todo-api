import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

config();

const isProduction = process.env.NODE_ENV === 'production';

const datasource = new DataSource({
  type: 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/database/migrations/**/*.ts'],
  ssl: true,
  synchronize: false,
});

export default datasource;
