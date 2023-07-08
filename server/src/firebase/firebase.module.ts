import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Module({})
export class FirebaseModule {
    providers: [FirebaseService];
}
