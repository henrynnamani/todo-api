import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as glob from 'glob';
import * as path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const env = process.env.NODE_ENV || 'development';

config({ path: `.env.${env}` });

const datasource = new DataSource({
  type: 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  ssl: true,
  synchronize: false,
});

export default datasource;
