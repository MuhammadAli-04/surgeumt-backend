// import fs from 'fs'
// import path from 'path'
import firebase from 'firebase-admin'
import envConfig from './env.config'
import logger from './logger.config'
import AppError from 'utils/appError.util'

// const serviceFilename = path.join(
//   __dirname,
//   '..',
//   '..',
//   envConfig.FIREBASE_SERVICE_FILE_NAME
// )

const firebaseConfig = JSON.parse(envConfig.FIREBASE_SERVICE_CONFIG)

if (firebaseConfig) {
  firebase.initializeApp({
    credential: firebase.credential.cert(firebaseConfig),
  })
  logger.info('👍 Firebase admin initialized')
} else {
  throw new AppError('Firebase configs not found')
}

export default firebase
