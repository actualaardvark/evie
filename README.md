# Overview

This program is a way to organize to-do lists and tasks with the added accountability of messaging your friends (or people of your choice) on discord whenever you finish a task or have been working on the task for a given amount of time.

# Installation

To get started, clone this repository and install the dependencies for both the server and the client. You'll need two separate terminal windows for this process.

1. Install server dependencies:

```bash
	cd server
	npm install
```
2. Install client dependencies:
```bash
	cd ../client
	npm install
```

## Configuration

The application uses environment variables to store your Discord bot token and channel info secure.

Create the file `/server/.env`.

Copy the following content into the file. You will have to replace the placeholder URLs below with the actual URLs you get from Discord, as well as your Discord token.
```
DISCORD_BOT_TOKEN="token goes here"
CHANNEL="channel number goes here"
```

With that complete, you are ready to...

# Run the program

First, start the development server:

```bash
cd client
npm run dev
```
(for now, run everything on the dev server for debugging purposes)

Then, run the backend server, in a seperate terminal:

```bash
cd server
node index.js
```

The client will be hosted to [http://localhost:3000](http://localhost:3000). Have fun!


# Client

The program is interfaced through the web app.

Get started by adding a new task with the button. Add a title and optional description, then click save to add it to your list. Once you've added your first task, it will appear as a card below, displaying the title, description, and how long you have been working on the given task. From there you are able to edit by clicking anywhere on the card or mark the task complete.

Whenever you create a new task or mark a task complete, the program will send a post request to the backend server, which will in turn message to the channel specified in `.env` via the discord bot.

When you complete a task, the task is not deleted forever but instead goes to a separate `completedTasks` array. You can see and 'uncomplete' a task under the completed tasks dropdown.

# Backend server

The backend sends discord messages by creating an API endpoint on port 3001. When a task is completed on the frontend, it sends a POST request with the relevent message using the built-in `fetch` method.

The API gets the contents of the POST request and reads all the webhook urls starting with `DISCORD_WEBHOOK_URL`. It takes the contents of the message and then uses the discord API to send the message through the bot.














