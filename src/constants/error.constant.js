export const APP_ERROR = {
  API_NOT_FOUND: "The requested API endpoint doesn't exist on this server. ",
  USER_NOT_FOUND: 'No user found related to this data',
  SERVER_ERROR: 'Something went wrong on the server.',
  NOT_ACCESSIBLE: 'You are not authorized to access this source',
  NOT_FOUND: 'Not found',
  FORBIDDEN: 'Forbidden',
  JWT: {
    INVALID_TOKEN: 'Invalid token. Please authenticate yourself again!',
    UN_AUTHORIZED: 'You are not authorized to access this resource.',
    TOKEN_MISSING: 'Authentication token is missing',
  },
  AUTH: {
    SIGNUP: {
      DUPLICATE_EMAIL: 'Email exists already',
      DUPLICATE_PHONENO: 'Phone number exists already',
      DUPLICATE_PHONENO_OR_EMAIL: 'Email or Phone number exists already',
    },
    LOGIN: {
      INVALID_CREDENTIALS: 'Invalid credentials',
    },
    OTP: {
      INVALID_OTP: 'Invalid Email or OTP',
      ALREADY_USED: 'OTP already used',
      EXPIRED: 'Expired OTP',
    },
    PASSWORD: {
      INVALID_PASSWORD: 'Invalid or incorrect password',
    },
  },
  USER: {
    PHONENUMBER_ALREADY_IN_USE: 'Phone number already in use',
    PHONENUMBER_UPDATE_NOT_ALLOWED: 'Phone number update is not allowed',
    INVALID_UPDATE_REQUEST: 'Other user update not allowed',
  },
}
