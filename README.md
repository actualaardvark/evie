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

The application uses environment variables to store your Discord webhook URLs securely.

Create the file `/server/.env`.

Copy the following content into the file. You will have to replace the placeholder URLs below with the actual URLs you get from Discord, as well as your Discord token.
```
DISCORD_WEBHOOK_URL_1=[https://discord.com/api/v9/channels/CHANNEL1/messages](https://discord.com/api/v9/channels/CHANNEL1/messages)
DISCORD_WEBHOOK_URL_2=[https://discord.com/api/v9/channels/CHANNEL2/messages](https://discord.com/api/v9/channels/CHANNEL2/messages)
DISCORD_WEBHOOK_URL_3=[https://discord.com/api/v9/channels/CHANNEL3/messages](https://discord.com/api/v9/channels/CHANNEL3/messages)

# Add as many webhook URLs as you need. Just follow the naming convention.

DISCORD_AUTHORIZATION=averylongstringofrandomcharactersthatwewillobtainshortly
```

The **best** way to find these is to follow [this youtube video](https://www.youtube.com/watch?v=g0jsaTIWz5I), but I will try my best to explain here as well:

To find these webhook URLs and your discord authorization, you will need to log in to [Discord](discord.com) on the browser. Open DevTools (shortcut varies per browser but typically `F12`), and navigate to the network panel.

Send a message to a person or channel you want to be notified, then click on the POST request titled `messages`. Copy the request URL, which should be of format [https://discord.com/api/v9/channels/stringofdigits/messages](https://discord.com/api/v9/channels/stringofdigits/messages). Add this to your `.env`. I recommend labling your env variables based on where they go, for example, `DISCORD_WEBHOOK_URL_APATHETICBRICK`

The first time you do this, you will also need to get your discord authorization token, which is what allows the program to send messages on your behalf. DO NOT SHARE YOUR TOKEN WITH ANYONE ELSE, as they will be able to remotely send messages from your account.

To find your authorziation token, find the `Authorization` header under Request Headers. Paste that into your `.env` after DISCORD_AUTHORIZATION. You will likely have to redo this every once in a while, since this whole project goes against Discord's TOS and they really doesn't like people turning their accounts into bots, for understandable reasons. So in general, when the program isn't properly sending discord messages, it is probably because you need to update your token, or because you've been banned (sorry).

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

Get started by adding a new task with the button or ctrl+n. Add a title and optional description, then click save to add it to your list. Once you've added your first task, it will appear as a card below, displaying the title, description, and how long you have been working on the given task. From there you are able to edit or mark the task complete.

When you mark a task complete, the program will automatically send a message to each of the channels in your `.env`.

# Backend server

The backend sends discord messages by creating an API endpoint on port 3001. When a task is completed on the frontend, it sends a POST request with the relevent message using the built-in `fetch` method.

The API gets the contents of the POST request and reads all the webhook urls starting with `DISCORD_WEBHOOK_URL`. It then sends a POST request to each of those webhooks using your Discord authorization token in the header, sending the message to each channel.















