import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({});
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            exceptionFactory(errors) {
                const message = errors
                    .map((error) => {
                        return Object.values(error.constraints);
                    })
                    .join(', ');
                throw new HttpException(message, HttpStatus.BAD_REQUEST);
            },
        }),
    );
    await app.listen(8080);
}
bootstrap();
