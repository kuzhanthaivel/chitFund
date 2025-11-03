import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Chit Fund API Documentation',
        description: 'Chit Fund API Documentation',
    },
    host: 'localhost:5000',
    schemes: ['http'],
    basePath: '/',
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Enter your bearer token in the format **Bearer &lt;token>**'
        }
    },
    definitions: {
        Users: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                username: { type: 'string' },
                phone: { type: 'string' },
                profilePic: { type: 'string' },
                events: { type: 'array', items: { type: 'object' } },
            },
        },
        ChitNote: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                NoteName: { type: 'string' },
                Date: { type: 'string' },
                Discribtion: { type: 'string' },
            },
        },
        Transaction: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                Date: { type: 'string' },
                ReceiptNo: { type: 'string' },
                Amount: { type: 'string' },
                TotalAmount: { type: 'string' },
                Total: { type: 'string' },
            },
        },
    },
};

const endpointsFiles = ['./index.ts'];

const outputFile = './swagger-output.json';
const generateSwagger = swaggerAutogen();
generateSwagger(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated successfully!');
});