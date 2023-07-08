import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { config } from 'dotenv';
config();

@Injectable()
export class FirebaseService {
    constructor() {
        console.log(process.env.project_id);

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    // replace with your Firebase project config
                    projectId: process.env.project_id,
                    clientEmail: process.env.client_email,
                    privateKey: process.env.private_key.replace(/\\n/g, '\n'),
                }),
            });
        }
    }

    async verifyIdToken(idToken: string): Promise<any> {
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            return decodedToken;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async refreshToken(refreshToken: string): Promise<string> {
        try {
            const decodedToken = await admin.auth().verifyIdToken(refreshToken);
            const { uid } = decodedToken;
            const newToken = await admin.auth().createCustomToken(uid);
            return newToken;
        } catch (error) {
            // Handle error
        }
    }
}
