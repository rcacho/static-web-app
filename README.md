## About

T3am was commissioned by Associated Engineering (AE) to construct a Master Calendar for their company to keep better track of their company calendar. AE previously distributed a calendar with key dates across the company in PDF format, which prevented dynamic changes, and led to errors and misunderstandings throughout the organization. This web-based application features a calendar which can be viewed and edited in real-time.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Contributors

This project was developed by Steven Yan, Julia Sotiri, Joseph Gao, Karl Sheng, Chris Mitchell, Jaren Agujo, Ricardo Cacho, and Chloe Curry.

## Getting Started

Setting up your local environment:

Setting up a working version of the project on Azure is required to run the project. This is due to Azure AD B2C being a requirement of the project. As AD B2C handles authentication and the project will not work without setting up user flows. The sign in page is a default web page provided by Azure. The list of users as well are handled by Azure. Furthermore part of the sign in process requires Azure to make an API call to the project’s API to confirm whether the user is an admin.

You will want to create a local env file called `.env.local` to configure your environment.

See `sample.env` to see the configuration options available.

To install all the dependencies run:

```bash
yarn install
```

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Releases are done through github actions. The repo is currently setup to release new versions as pull requests are merged into the main branch.

A live version of the application can be found at:

https://zealous-moss-07bc5e510.2.azurestaticapps.net/

## Running API tests

Tests expect a file called .env.test for configuration.

See sample.env.test to see environment variables used for testing.

On the command line run:

```
yarn test __test__
```

## Learn More About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Azure Setup

## SQL Database

- The Azure guide for setting this up can be found [here](https://learn.microsoft.com/en-us/azure/azure-sql/database/single-database-create-quickstart?view=azuresql&tabs=azure-portal)
- The project should be able to run on the cheapest options available on Azure
- When creating the SQL Database server set the authentication method to ‘Use SQL Authentication’
- You will want to save the username and password chosen which will be used as the environment variables `​​DB_USER` and `DB_PASSWORD`
  Record the servername, which have the form (name).database.windows.net, and the database name, these will be used as the environment variables DB_SERVER and DB_NAME

## Azure AD B2C Tenant

- The Azure guide for setting this up can be found [here](https://learn.microsoft.com/en-ca/azure/active-directory-b2c/tutorial-create-tenant?WT.mc_id=Portal-Microsoft_AAD_B2CAdmin)
- To setup the authentication a separate directory to handle AD B2C needs to be created which is not your default directory, this is called the Azure AD B2C Tenant Directory
- The domain of the directory will look something like (chosen-name).onmicrosoft.com, the name will be used as the environment variable `AZURE_AD_B2C_TENANT_NAME`
  Only one tenant is required to run the project locally and live though this will mean that both stages will use the same pool of users

## Groups

- The Azure guide for setting this up can be found [here](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/how-to-manage-groups)
- Within the AD B2C Tenant navigate to Groups choose the option to create a new group
- Create a group called Admin
- Record the object id of the group for later, this will be used as the environment variable `AZURE_AD_B2C_GROUP_ADMIN_ID`

## Azure AD B2C | User attributes

- The Azure guide for setting this up can be found [here](https://learn.microsoft.com/en-us/azure/active-directory/external-identities/user-flow-add-custom-attributes)
- Select Add and add a attribute with the name IsAdmin with data type Boolean

## Azure AD B2C | API connectors

- The Azure guide for setting this up can be found here
- Select New API Connector
- Give the connector a name (record it)
- For the endpoint URL you will want to enter the URL randomly generated after creating the Static Web App followed by ‘/api/admin-membership’
- Set the Authentication Type to Basic and add ‘user’ as the username and a desired password, the password should be recorded for later use as the environment variable `AZURE_AD_B2C_CONNECTOR_PASSWORD`

## Azure AD B2C | User Flows

- The Azure guide for setting this up can be found [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/add-sign-up-and-sign-in-policy?pivots=b2c-user-flow)
- Select New User flow
  - Choose Sign in as the user flow type and Recommended for Version
  - Create a name and record it for later, this will be the environment variable `AZURE_AD_B2C_PRIMARY_USER_FLOW`
  - Choose Email signin for local accounts
  - Type of method should be set to Email
  - Set MFA enforcement to Off
  - Set IsAdmin and User’s Object Id as Application claims
  - Create the flow
  - Navigate to the User Flow options and go to API Connectors under settings
  - In “Before including application….” set the API Connector to the one previously created
  - Navigate to the User Flow options and go to Properties under settings
  - In the Password Configuration options tick the box for self-service password reset

## Azure AD B2C | App Registration

- The Azure guide for setting this up can be found [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications?tabs=app-reg-ga)
- Set the redirect URI
  - Choose web as the platform
  - For the URI enter the URL of the Static Web App or http://localhost:3000 if the installation is meant to be used locally
  - Note: you will need the client ID given by creating the app registration to properly install Static Web App so you should enter in the localhost address temporarily while doing the initial setup and change it to the correct URL once the Static Web App has been setup and you have received a URL
  - Creating the App registration will given you a client id for the registration which will be used as the `AZURE_AD_B2C_CLIENT_ID`
  - Under settings go to Certificates & Secrets and create a new client secret, this will be the environment variable `AZURE_AD_B2C_CLIENT_SECRET`
  - Note: you will want to set up one registration per stage (local/development/prod) that you want to set up and will have multiple client ids and client secrets

## Azure Static Web App

- The azure guide to setting this up can be found [here](https://learn.microsoft.com/en-us/azure/static-web-apps/get-started-portal?tabs=vanilla-javascript&pivots=github)
- Create Static Web App (free is sufficient)
  - Choose github for source
  - Choose org/repo/branch
  - Choose Next.js for build presets
  - Can leave app location, api location, and output as default
  - Need to given Azure access to your repo
  - Azure will push a new file into .github folder to the designated branch
  - This file will need some edits
  - Add the following environment variables in the step named Build And Deploy
    - `AZURE_AD_B2C_CLIENT_ID`
    - `AZURE_AD_B2C_CLIENT_SECRET`: ${{ secrets.AZURE_AD_B2C_CLIENT_SECRET }}
    - `AZURE_AD_B2C_TENANT_NAME`
    - `AZURE_AD_B2C_PROFILE_EDIT`
    - `AZURE_AD_B2C_PRIMARY_USER_FLOW`
    - `AZURE_AD_B2C_GROUP_ADMIN_ID`
    - `AZURE_AD_B2C_CONNECTOR_PASSWORD`: ${{ secrets.AZURE_AD_B2C_CONNECTOR_PASSWORD }}
    - `AAD_ENDPOINT`: https://login.microsoftonline.com
    - `GRAPH_ENDPOINT`: https://graph.microsoft.com
    - `DB_USER`
    - `DB_PASSWORD`: ${{ secrets.DB_PASSWORD }}
    - `DB_SERVER`
    - `DB_NAME`
  - If you have followed the instructions in sequential order you should have all the environment variables required
  - Note: There is a version of this in the repo in the file .github/workflows/azure-static-web-apps-zealous-moss-07bc5e510.yml line 32
  - Make sure the following secrets are setup for the Github repo actions:
    - `GIT_PAT`
    - `DB_PASSWORD`
    - `AZURE_AD_B2C_CONNECTOR_PASSWORD`
    - `AZURE_AD_B2C_CLIENT_SECRET`
  - Note: Instructions on to generate the pat can be found [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
