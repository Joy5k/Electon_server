import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.join(process.cwd(),'.env')})
export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    super_admin_password:process.env.SUPER_ADMIN_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
    app_password:process.env.NODEMAILER_APP_PASSWORD_KEY,
    jwt: {
      jwt_access_secret: process.env.JWT_SECRET,
      expires_in: process.env.EXPIRES_IN,
      refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
      refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
      reset_pass_secret: process.env.RESET_PASS_TOKEN,
      reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
      reset_pass_link:process.env.RESET_PASS_LINK
    },
  };