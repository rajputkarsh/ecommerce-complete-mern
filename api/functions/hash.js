
const crypto = require("crypto") 

const hashPassword = (password) => {
    return crypto.pbkdf2Sync(password, process.env.HASH_SALT, 1000, 64, `sha512`).toString(`hex`)
}

const validatePassword = (password, hashedPassword) => {
    return hashPassword(password) === hashedPassword
}

module.exports = {
    hashPassword    : hashPassword,
    validatePassword: validatePassword
}