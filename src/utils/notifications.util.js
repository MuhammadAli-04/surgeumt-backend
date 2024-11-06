export const notificationBody = {
  ENTERED_ALLOWED_CHECKPOINT:
    'Your child {{child}} has entered into premises of an allowed area {{checkpoint}}',
  ENTERED_RESTRICTED_CHECKPOINT:
    'Your child {{child}} has entered into premises of an restricted area {{checkpoint}}',
  EXIT_ALLOWED_CHECKPOINT:
    'Your child {{child}} has exits from premises of an allowed area {{checkpoint}}',
  EXIT_RESTRICTED_CHECKPOINT:
    'Your child {{child}} has exits from premises of an allowed area {{checkpoint}}',
  NOTIFY_CHILD_LOGOUT: 'Your child {{child}} has been logged out',
  NOTIFY_CHILD_CONNECT:
    'Your child {{child}} device internet has been restored.',
  NOTIFY_CHILD_DISCONNECT:
    'Your child {{child}} device internet has been disconnected.',
  NOTIFY_CHILD_LOW_BATTERY:
    'Your child {{child}} device battery is low. Please recharge to stay connected.',
  NOTIFY_CHILD_CRITICALLY_LOW_BATTERY:
    'Your child {{child}} device battery is critically low. Please recharge to stay connected.',
  NOTIFY_CHILD_DELETE: '{{child}} is deleted',
  SOS: 'An SOS alert has been received from {{user}}. Please contact immediately.',
  SOS_CANCEL:
    'Your child {{user}} has canceled the SOS alert, Please contact further clarification.',
}

export const notificationTitle = {
  ENTERED_ALLOWED_CHECKPOINT: 'Entered into Allowed Area',
  ENTERED_RESTRICTED_CHECKPOINT: 'Entered into Restricted Area',
  EXIT_ALLOWED_CHECKPOINT: 'Exits from Allowed Area',
  EXIT_RESTRICTED_CHECKPOINT: 'Exits from Restricted Area',
  NOTIFY_CHILD_LOGOUT: 'Logged Out',
  NOTIFY_CHILD_CONNECT: 'Child device Internet restored',
  NOTIFY_CHILD_DISCONNECT: 'Child device Internet Disconnected',
  NOTIFY_CHILD_LOW_BATTERY: 'Child device battery low',
  NOTIFY_CHILD_CRITICALLY_LOW_BATTERY: 'Child device battery critically low',
  NOTIFY_CHILD_DELETE: '{{child}} deleted',
  SOS: 'SOS ALERT',
  SOS_CANCEL: 'SOS ALERT canceled',
}

export const substitutePlaceholders = (message, payload, defaultValue = '') => {
  return message.replace(/{{(.*?)}}/g, (_, key) => {
    return payload[key] || defaultValue
  })
}
