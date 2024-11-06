import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import envConfig from './env.config'
import { getUserByPk } from 'services/user.service'

const jwtOptions = {
  secretOrKey: envConfig.JWT_ACCESS_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
  'jwt',
  new Strategy(jwtOptions, async (payload, done) => {
    try {
      const { id, type, access } = payload.user

      const user = await getUserByPk(id, { paranoid: false })

      if (user) {
        return done(null, { user, type, access })
      }

      return done(null, false)
    } catch (error) {
      return done(error, false)
    }
  })
)

export default passport
