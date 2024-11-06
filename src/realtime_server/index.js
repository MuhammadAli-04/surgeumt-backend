import logger from 'configs/logger.config'
import { SOCKET_EVENTS } from 'constants/socket.constant'
import { onSocketConnectValidate } from 'middlewares/socket.middleware'

const throwError = (socket, message, statusCode) => {
  socket.emit('error', { message, statusCode })
}

const ping = (socket) => {
  socket.on(SOCKET_EVENTS.PING, () => {
    logger.info(`ping received from ${socket.user.id}`)
    socket.emit(SOCKET_EVENTS.PONG, 'PONG')
  })
}

const onConnect = (io, socket) => {
  logger.info(`${socket.type} {${socket.user.id}} connected`)

  socket.join(socket.user.id)
  logger.info(
    `${socket.type} {${socket.user.id}} joined room ${socket.user.id}`
  )
}

const onDisconnect = (io, socket) => {
  socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
    logger.info(
      `${socket.type} {${socket.user.id}} disconnected due to ${reason}`
    )
  })
}

const onReconnect = (io, socket) => {
  socket.on(SOCKET_EVENTS.RECONNECT, (attemptNumber) => {
    logger.info(
      `${socket.type} {${socket.user.id}} reconnected after ${attemptNumber} attempts`
    )
  })
}

export const socketServer = (httpServer) => {
  const { Server } = require('socket.io')

  const io = new Server(httpServer, {
    pingTimeout: 11000,
    pingInterval: 5000,
  })

  io.use(onSocketConnectValidate)

  io.on(SOCKET_EVENTS.CONNECTION, async (socket) => {
    ping(socket)

    onConnect(io, socket)

    onReconnect(io, socket)

    onDisconnect(io, socket)
  })
}
