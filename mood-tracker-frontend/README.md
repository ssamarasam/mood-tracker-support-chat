# Mood Tracker with Support Chat - frontend

An implementation with React.

## Requirements

- Node 18.0.0 or later (see [checking the Node version](#checking-the-nodejs-version))

## Setup the .env file in the frontend folder
Go to https://ably.com/ and generate your API key and enter it in `VITE_ABLY_API_KEY`
Add the server url in `VITE_BACKEND_URL` as mentioned below

VITE_ABLY_API_KEY=
VITE_BACKEND_URL="http://localhost:3000"


## Running this app independently

### Install Node dependencies

Run the following command to install the Node dependencies for this frontend sample app.

```bash
npm install
```

The `package.json` in this sample already includes the Ably React package. 


### Confirm that a backend is running

Start a backend server before you start the frontend. You will need two terminal sessions so you can run both at the same time.

Confirm that a backend API server is running on [http://localhost:3000](http://localhost:3000) (see the backend README for more information).

### Run the frontend server locally

Start the frontend client.

```bash
npm run dev
```

Visit the frontend client at [http://localhost:5173](http://localhost:5173) to try it out!

## Checking the Node.js version

To check which Node version you have, run the following command in your terminal:

```bash
node -v
```

If the command doesn't return a version, you might not have Node installed.

You can go to [nodejs.org](https://nodejs.org/en/) to download and set up Node (`v18.0.0` or later) on your machine. If you use a version manager for Node, use it to install Node 18.

Once you install node, run `node -v` again to confirm the version. You might need to restart your terminal for the changes to take effect.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


