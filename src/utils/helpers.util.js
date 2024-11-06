export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000)
  return otp.toString()
}

export const parseDate = (dateStr) => {
  const separator = dateStr.includes('-') ? '-' : '/'

  const [day, month, year] = dateStr.split(separator).map(Number)

  return new Date(year, month - 1, day)
}

export const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + Number(days))
  return result
}

export const generateCode = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const array = new Array()
  for (let index = 0; index < 8; index++) {
    array.push(characters[Math.floor(Math.random() * characters.length)])
  }

  return array.join('')
}

export const concatName = (firstname, middlename, lastname) => {
  if (middlename) {
    return `${firstname} ${middlename} ${lastname}`
  }

  return `${firstname} ${lastname}`
}
