import fastGateway from 'fast-gateway';
import dotenv from 'dotenv';
dotenv.config();

const apiGateway = fastGateway({
    routes: [
        {
            prefix: '/usersService/**',
            target: process.env.USER_MICROSERVICE_SERVICE_URL
        },
        {
            prefix: '/discussionService/**',
            target: process.env.DISCUSSION_MICROSERVICE_SERVICE_URL
        },
        {
            prefix: '/commentService/**',
            target: process.env.COMMENT_MICROSERVICE_SERVICE_URL
        },
        {
            prefix: '/likeService/**',
            target: process.env.LIKE_MICROSERVICE_SERVICE_URL
        }
    ]
});

const apiGatewayPort = process.env.SOCIAL_MEDIA_APP_API_GATEWAY_PORT || 3010;

apiGateway.start(apiGatewayPort).then(server => {
    console.log(`Social Media App API Gateway Accesible On Port ${apiGatewayPort}`);
});
