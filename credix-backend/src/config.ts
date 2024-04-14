import 'dotenv-flow/config';

// TODO: validate
export default {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  CREDIX_API_KEY: process.env.CREDIX_API_KEY,
  CREDIX_API_BASE_URL: process.env.CREDIX_API_BASE_URL,
  CREDIX_APP_BASE_URL: process.env.CREDIX_APP_BASE_URL,
  TAX_ID: process.env.TAX_ID,
  PUBLIC_URL: process.env.PUBLIC_URL,
};
