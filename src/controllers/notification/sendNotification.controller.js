import firebase from 'configs/firebase.config'
import { DB_TABLE_NAMES } from 'constants/db.constant'
import { APP_ERROR } from 'constants/error.constant'
import db from 'models'
import { getDeviceTokens } from 'services/deviceToken.service'
import { getSingleUser } from 'services/user.service'
import { catchAsync, successResponse } from 'utils/apis.util'
import AppError from 'utils/appError.util'
import { concatName } from 'utils/helpers.util'
import {
  notificationBody,
  notificationTitle,
  substitutePlaceholders,
} from 'utils/notifications.util'

export const sendNotification = catchAsync(async (req, res, next) => {
  const { id } = req.user
  const { type, batteryLevel } = req.body

  //////////////////////////////////////////////

  switch (type) {
    case 'child-battery-low':
    case 'sos': {
      if (req.type === DB_TABLE_NAMES.USER) {
        return next(new AppError(APP_ERROR.NOT_ACCESSIBLE, 403))
      }

      // const child = await getSingleChild(
      //   { id },
      //   {
      //     include: [
      //       {
      //         model: db[DB_TABLE_NAMES.USER],
      //         attributes: ['id'],
      //         through: {
      //           attributes: [],
      //         },
      //       },
      //     ],
      //   }
      // )

      let child

      if (!child) {
        return next(new AppError(APP_ERROR.NOT_FOUND, 404))
      }

      const parentIds = Array.from(child.parents).map((parent) => parent.id)

      const deviceTokens = await getDeviceTokens(parentIds)

      const childName = concatName(
        child.firstName,
        child.middleName,
        child.lastName
      )

      const title = substitutePlaceholders(
        type === 'sos'
          ? notificationTitle.SOS
          : batteryLevel > 10
          ? notificationTitle.NOTIFY_CHILD_LOW_BATTERY
          : notificationTitle.NOTIFY_CHILD_CRITICALLY_LOW_BATTERY,
        {
          user: childName,
        }
      )

      const body = substitutePlaceholders(
        type === 'sos'
          ? notificationBody.SOS
          : batteryLevel > 10
          ? notificationBody.NOTIFY_CHILD_LOW_BATTERY
          : notificationBody.NOTIFY_CHILD_CRITICALLY_LOW_BATTERY,
        {
          user: childName,
        }
      )

      const messaging = firebase.messaging()
      const sendNotifications = deviceTokens.map((deviceToken) =>
        messaging.send({
          token: deviceToken,
          data: { type, childId: child.id, title, body },
          notification: undefined,
        })
      )

      await Promise.allSettled(sendNotifications)

      break
    }
    case 'sos-cancel': {
      switch (req.type) {
        case DB_TABLE_NAMES.USER: {
          const { id } = req.user
          const { childId, type } = req.body

          const parent = await getSingleUser({ id })

          if (!parent) {
            return next(new AppError(APP_ERROR.NOT_FOUND, 404))
          }

          const deviceTokens = await getDeviceTokens([childId])

          const username = concatName(
            parent.firstName,
            parent.middleName,
            parent.lastName
          )

          const title = substitutePlaceholders(notificationTitle.SOS_CANCEL, {
            user: username,
          })

          const body = substitutePlaceholders(notificationBody.SOS_CANCEL, {
            user: username,
          })

          const messaging = firebase.messaging()
          const sendNotifications = deviceTokens.map((deviceToken) =>
            messaging.send({
              token: deviceToken,
              data: { type, childId, title, body },
              notification: undefined,
            })
          )

          await Promise.allSettled(sendNotifications)

          break
        }
        case DB_TABLE_NAMES.CHILD: {
          const { id } = req.user
          const { type } = req.body

          // const child = await getSingleChild(
          //   { id },
          //   {
          //     include: [
          //       {
          //         model: db[DB_TABLE_NAMES.PARENT],
          //         attributes: ['id'],
          //         through: {
          //           attributes: [],
          //         },
          //       },
          //     ],
          //   }
          // )

          let child

          if (!child) {
            return next(new AppError(APP_ERROR.NOT_FOUND, 404))
          }

          const parentIds = Array.from(child.parents).map((parent) => parent.id)

          const deviceTokens = await getDeviceTokens(parentIds)

          const childName = concatName(
            child.firstName,
            child.middleName,
            child.lastName
          )

          const title = substitutePlaceholders(notificationTitle.SOS_CANCEL, {
            user: childName,
          })

          const body = substitutePlaceholders(notificationBody.SOS_CANCEL, {
            user: childName,
          })

          const messaging = firebase.messaging()
          const sendNotifications = deviceTokens.map((deviceToken) =>
            messaging.send({
              token: deviceToken,
              data: { type, childId: child.id, title, body },
              notification: undefined,
            })
          )

          await Promise.allSettled(sendNotifications)

          break
        }
        default:
          break
      }
      break
    }
    default:
      break
  }

  successResponse.sendMessage(res, { message: 'success' })
})
