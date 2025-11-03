"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc = {
    info: {
        title: 'Moi Note API Documentation',
        description: 'Description of your API',
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
        Events: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                Date: { type: 'string' },
                Discribtion: { type: 'string' },
                Place: { type: 'string' },
                Area: { type: 'string' },
            },
        },
    },
};
const endpointsFiles = ['./index.ts'];
const outputFile = './swagger-output.json';
const generateSwagger = (0, swagger_autogen_1.default)();
generateSwagger(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated successfully!');
});
