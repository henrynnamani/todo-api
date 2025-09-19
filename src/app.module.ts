import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvSchema } from './database/environment.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import datasource from './database/datasource';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...datasource.options,
      }),
      dataSourceFactory: async () => {
        if (datasource.isInitialized) {
          return datasource;
        } else {
          return datasource.initialize();
        }
      },
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: env ? `.env.${env}` : '.env',
      load: [() => process.env],
      validate: (config) => {
        const result = EnvSchema.safeParse(config);

        if (!result.success) {
          throw new Error('Invalid environment variables');
        }

        return result.data;
      },
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
