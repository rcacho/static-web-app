/** @type {import('next').NextConfig} */

require('dotenv').config()

module.exports = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
    AUTH_CLIENT_SECRET: process.env.AUTH_CLIENT_SECRET,
    AUTH_TENANT_NAME: process.env.AUTH_TENANT_NAME,
    AUTH_TENANT_GUID: process.env.AUTH_TENANT_GUID,
    JWT_SECRET: process.env.JWT_SECRET,
    USER_FLOW: process.env.USER_FLOW,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_SERVER:process.env.DB_SERVER,
    DB_NAME:process.env.DB_NAME,
  },
  reactStrictMode: true
}
