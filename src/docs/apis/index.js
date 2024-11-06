import userApisDoc from './user.apis.doc'
import appApisDocs from 'docs/apis/app.apis.doc'
import authApisDocs from 'docs/apis/auth.apis.doc'
import notificationApisDocs from 'docs/apis/notification.apis.doc'
import socketDocs from 'docs/apis/socket.apis.doc'

export default {
  ...authApisDocs,
  ...appApisDocs,
  ...userApisDoc,
  ...notificationApisDocs,
  ...socketDocs,
}
