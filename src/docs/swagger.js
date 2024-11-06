import config from 'configs/env.config'
import apis from 'docs/apis'
import schemas from 'docs/schemas'
import tags from 'docs/tags'

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Node.js application',
    },
    schemas: ['http', 'https'],
    'Content-type': 'multipart/form-data; boundary=abcde12345',
    tags,
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'Local server',
      },
      {
        url: `ws://localhost:${config.PORT}`,
        description: 'Local WebSocket server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'Bearer',
        },
      },
      schemas,
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: apis,
  },
  apis: ['./routes/**/*.js'],
}

export default swaggerOptions
