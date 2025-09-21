import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvSchema } from './database/environment.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth-guard.guard';
import datasource from './database/datasource';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 5,
        },
      ],
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_ACCESS_EXPIRY') },
      }),
      global: true,
    }),
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
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
