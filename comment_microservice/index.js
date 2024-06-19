import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './utils/dbUtils.js';
import router from './route/routes.js';

const app = express();
dotenv.config();

connectToDatabase()
    .then(() => {
        app.use(router);

        const microservicesPort = process.env.COMMENT_MICROSERVICE_PORT || 3013;
        app.listen(microservicesPort, () => {
            console.log(`Server running on port ${microservicesPort}`);
        });
    })
    .catch(error => {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    });
