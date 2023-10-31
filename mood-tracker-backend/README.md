# Mood Tracker and Support Chat

An implementation with Node Express.

## Requirements

- Node 18.0.0 or later (see [checking the Node version](#checking-the-nodejs-version))
- [a .env file with your Quickstart app secrets](#set-up-your-env-file)

## Running this app independently

### Set up your `.env` file

1. Go to https://ably.com/ and generate your API key and enter it in `ABLY_API_KEY`

2. Generate a secrect code usingt he below code and enter it in `JWT_SECRET`
    const crypto = require("crypto");
    const secretKey = crypto.randomBytes(32).toString("hex");
    console.log(secretKey);

4. Get the [openai](https://openai.com/product) API Key and enter it in `OPENAI_API_KEY`.

5. Setup Sqlite3 database
   `DATABASE_URL="file:./dev.db"`

Below is the fuill list of env variables for backend:
DATABASE_URL="file:./dev.db"
ABLY_API_KEY=
JWT_SECRET=08caa78b955ef773df88423fd892555315f2b7f375a024df575d1d30456c914b
OPENAI_API_KEY=

### Install Node dependencies

Run the following command to install the Node dependencies for this sample app.

```bash
npm install
```

### Setup Prisma

Setup local sqlite database using prisma.

`npx prisma migrate dev --name init`

`npx prisma generate`

### Run the backend server locally

Start the backend server before you start the frontend. You will need two terminal sessions so you can run both at the same time.

```bash
npm run dev
```

Your backend server is now running on `localhost:3000` and you can now make API calls, or start a frontend for this sample application to run on top of it.
(See the README file in the `frontend` folder for more information.)

### Checking the Node.js version

To check which Node version you have, run the following command in your terminal:

```bash
node -v
```

If the command doesn't return a version, you might not have Node installed.

You can go to [nodejs.org](https://nodejs.org/en/) to download and set up Node (`v18.0.0` or later) on your machine. If you use a version manager for Node, use it to install Node 18.

Once you install node, run `node -v` again to confirm the version. You might need to restart your terminal for the changes to take effect.
