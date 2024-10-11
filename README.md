# Project Setup Instructions

Follow the steps below to set up and run the application locally:

## Step 1: Clone the Repository

Clone the repository to your local machine.

## Step 2: Install the packages with following command.

```npm i```


## Step 3: Create a .env file in the root directory and add the following environment variables.

```
DATABASE_URL=
JWT_AT_SECRET=
JWT_RT_SECRET=
```
You can add a random secret values for access token(AT) and refresh token(RT) secrets. Postgres is the database for the project. Add a postgres url either from locally or an online solution like neon.

## Step 4: Run the project by following command

```npm run start```

#### Swagger Url: go to ```http://localhost:3002/api#/``` in your browser
