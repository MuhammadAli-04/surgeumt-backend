import bcrypt from 'bcrypt'

export const generateHash = (password) => {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

export const compareHash = async (enteredPassword, hashedPassword) => {
  return bcrypt.compare(enteredPassword, hashedPassword)
}
