/** @type {import('next').NextConfig} */

require('dotenv').config()

module.exports = {
  env: {
    AZURE_AD_B2C_CLIENT_ID: process.env.AZURE_AD_B2C_CLIENT_ID,
    AZURE_AD_B2C_TENANT_NAME: process.env.AZURE_AD_B2C_TENANT_NAME,
    AZURE_AD_B2C_PRIMARY_USER_FLOW: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
    AZURE_AD_B2C_PROFILE_EDIT: process.env.AZURE_AD_B2C_PROFILE_EDIT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_SERVER:process.env.DB_SERVER,
    DB_NAME:process.env.DB_NAME,

  },
  reactStrictMode: true
}
