import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../../src/app.module";
import {INestApplication, ValidationPipe} from "@nestjs/common";

export class CreateAppTesting {
    static async createApp(): Promise<INestApplication> {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        const app: INestApplication = moduleFixture.createNestApplication();
        app.enableCors();
        app.useGlobalPipes(new ValidationPipe());
        return app;
    }
}