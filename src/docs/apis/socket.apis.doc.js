import { socketTag } from 'docs/tags'
const tags = [socketTag.name]

export default {
  '/connection': {
    post: {
      tags,
      summary: 'Connection',
      description: 'Triggered when a client connects to the server.',
      responses: {
        101: {
          description: 'Switching Protocols, Connection established',
        },
      },
    },
  },
  '/disconnect': {
    post: {
      tags,
      summary: 'Disconnect',
      description: 'Triggered when a client disconnects from the server.',
      responses: {
        200: {
          description: 'Client disconnected',
        },
      },
    },
  },
  '/reconnect': {
    post: {
      tags,
      summary: 'Reconnect',
      description:
        'Triggered when a client attempts to reconnect after a disconnection.',
      responses: {
        200: {
          description: 'Reconnection attempt acknowledged',
        },
      },
    },
  },
  '/ping': {
    post: {
      tags,
      summary: 'Ping',
      description: 'Ping event to keep the connection alive.',
      responses: {
        200: {
          description: 'Pong response',
        },
      },
    },
  },
}
