import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
    imports: [AuthModule, PrismaModule, FirebaseModule],
    controllers: [],
    providers: [FirebaseService],
})
export class AppModule {}
