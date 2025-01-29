const swaggerJsdoc = require('swagger-jsdoc');


const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Node.js API Documentation", 
        version: "1.0.0",
        description: "API documentation for Car Management Application", 
    },
    servers: [
        {
            url: "http://localhost:8080", 
            
            description: "Development server",
        },
    ],
};


const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"], 
};


const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
