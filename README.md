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
You can add a random secret values for access token(AT) and refresh token(RT) secrets. 

## Step 4: Database setup

Postgres is the database for the project. 
Add a postgres url to ```DATABASE_URL``` either from locally or an online solution like [Neon](https://neon.tech/).

### use a local postgres instance
create a new database locally and add the URI as follows.<br>
```postgresql://<postgres_username>:<password_of_the_user>@localhost:5432/<db_name>```

## Step 4: Run the project by following command

```npm run start```

#### Swagger Url: go to ```http://localhost:3002/api#/``` in your browser
