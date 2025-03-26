/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
ConfigModule.forRoot();
const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<string>('POSTGRES_PORT')
    ? configService.get<number>('POSTGRES_PORT')
    : 5432,
    password: configService.get<string>('POSTGRES_PASSWORD'),
    username: configService.get<string>('POSTGRES_USER'),
    database: configService.get<string>('POSTGRES_DATABASE'),
    migrations: ['dist/migrations/*.js'],
    entities: [__dirname + '/**/*.entity{.ts,.js)'],
    ssl: true
});