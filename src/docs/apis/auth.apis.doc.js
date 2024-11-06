import { authTag } from 'docs/tags'
import { getResponses } from 'utils/swagger.util'

const tags = [authTag.name]

const login = {
  tags,
  summary: 'Login API',
  description: 'API for user authenticate in our application',
  operationId: 'login',
  requestBody: {
    description: 'Login credentials',
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/loginBody',
        },
      },
    },
  },
  responses: getResponses({
    data: {
      $ref: '#/components/schemas/loginResponse',
    },
  }),
}

const signup = {
  tags,
  summary: 'Signup API',
  description: 'API for user signup in our application',
  operationId: 'signup',
  requestBody: {
    description: 'Signup request body',
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/signupBody',
        },
      },
    },
  },
  responses: getResponses({
    data: {
      $ref: '#/components/schemas/signupResponse',
    },
  }),
}

const me = {
  tags,
  summary: 'Get user information',
  description: 'API for get user information',
  operationId: 'me',
  responses: getResponses({
    data: {
      $ref: '#/components/schemas/meResponse',
    },
  }),
}

const refreshToken = {
  tags,
  summary: 'Refresh Access Token API',
  description: 'API for refreshing access token upon expiring',
  operationId: 'refreshToken',
  responses: getResponses({
    data: {
      $ref: '#/components/schemas/refreshTokenResponse',
    },
  }),
}

const sendOtp = {
  tags,
  summary: 'Send OTP API',
  description:
    'API for sending email to user containing email verification OTP',
  operationId: 'sendOtp',
  requestBody: {
    description: 'sendOtp request body',
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/sendOtpBody',
        },
      },
    },
  },
  responses: getResponses(),
}

const verifyOtp = {
  tags,
  summary: 'Verify OTP API',
  description: 'API for verifying email through OTP',
  operationId: 'verifyOtp',
  requestBody: {
    description: 'verifyOtp request body',
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/verifyOtpBody',
        },
      },
    },
  },
  responses: getResponses({
    data: {
      $ref: '#components/schemas/verifyOtpResponse',
    },
  }),
}

const childLogin = {
  tags,
  summary: 'Child Login through Join code API',
  description: 'API for verifying child Join code for login',
  operationId: 'childLogin',
  requestBody: {
    description: 'childLogin request body',
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/childLoginBody',
        },
      },
    },
  },
  responses: getResponses({
    data: {
      $ref: '#components/schemas/childLoginResponse',
    },
  }),
}

const childLogout = {
  tags,
  summary: 'Child Logout through Logout code API',
  description: 'API for verifying child Logout code',
  operationId: 'childLogout',
  requestBody: {
    description: 'childLogout request body',
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/childLogoutBody',
        },
      },
    },
  },
  responses: getResponses(),
}

const resetPassword = {
  tags,
  summary: 'Reset Password API',
  description: 'API for resetting password',
  operationId: 'resetPassword',
  requestBody: {
    description: 'resetPassword request body',
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/resetPasswordBody',
        },
      },
    },
  },
  responses: getResponses(),
}

const updatePassword = {
  tags,
  summary: 'Update Password API',
  description: 'API for updating password',
  operationId: 'updatePassword',
  requestBody: {
    description: 'updatePassword request body',
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/updatePasswordBody',
        },
      },
    },
  },
  responses: getResponses(),
}

export default {
  '/api/auth/login': {
    post: login,
  },
  '/api/auth/signup': {
    post: signup,
  },
  '/api/auth/me': {
    get: me,
  },
  '/api/auth/refreshToken': {
    post: refreshToken,
  },
  '/api/auth/sendOtp': {
    post: sendOtp,
  },
  '/api/auth/verifyOtp': {
    post: verifyOtp,
  },
  '/api/auth/childLogin': {
    post: childLogin,
  },
  '/api/auth/childLogout': {
    post: childLogout,
  },
  '/api/auth/resetPassword': {
    post: resetPassword,
  },
  '/api/auth/updatePassword': {
    post: updatePassword,
  },
}
