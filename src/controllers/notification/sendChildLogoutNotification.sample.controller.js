// import firebase from 'configs/firebase.config'
// import { DB_TABLE_NAMES } from 'constants/db.constant'
// import db from 'models'
// import { getDeviceTokens } from 'services/deviceToken.service'
// import { concatName } from 'utils/helpers.util'
// import {
//   notificationBody,
//   notificationTitle,
//   substitutePlaceholders,
// } from 'utils/notifications.util'

// export const sendChildLogoutNotification = async (notificationPayload) => {
//   const child = await getSingleChild(
//     {
//       id: notificationPayload.childId,
//     },
//     {
//       include: [
//         {
//           model: db[DB_TABLE_NAMES.USER],
//           attributes: { exclude: ['deletedAt', 'password'] },
//           through: {
//             attributes: [],
//           },
//         },
//       ],
//     }
//   )
//   if (!child) {
//     return true
//   }
//   let title = notificationTitle.NOTIFY_CHILD_LOGOUT

//   let body = notificationBody.NOTIFY_CHILD_LOGOUT

//   const childName = concatName(
//     child.firstName,
//     child.middleName,
//     child.lastName
//   )
//   title = substitutePlaceholders(title, {
//     child: childName,
//   })
//   body = substitutePlaceholders(body, { child: childName })

//   const parentIds = Array.from(child.parents).map((parent) => parent.id)
//   if (!parentIds) {
//     return true
//   }

//   const deviceTokens = await getDeviceTokens(parentIds)

//   if (!deviceTokens) {
//     return true
//   }

//   const messaging = firebase.messaging()
//   const sendNotifications = deviceTokens.map((deviceToken) =>
//     messaging.send({
//       token: deviceToken,
//       data: { childId: child.id, type: 'child-logout', title, body },
//       notification: undefined,
//     })
//   )

//   await Promise.allSettled(sendNotifications)

//   return true
// }
