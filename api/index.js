// /api/sendMessage.js
const { Client, GatewayIntentBits } = require('discord.js');

// Initialize the Discord client outside of the handler function.
// This allows Vercel to cache it for subsequent "cold starts"
// which is a key performance optimization.
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Use an async function for the API handler
module.exports = async (req, res) => {
  // Check if the Discord client is already ready.
  if (client.isReady()) {
    console.log("Discord client is ready.");
  } else {
    // If not, log in to Discord.
    // await the login to ensure the client is ready before proceeding.
    await client.login(process.env.DISCORD_BOT_TOKEN);
    console.log("Discord client logged in successfully.");
  }

  // Check for the POST method as serverless functions can handle various methods.
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Get the message from the request body
  const { message } = req.body;

  if (!message) {
    return res.status(400).send('Message body is required.');
  }

  // Get the channel from the cached channels
  const channel = client.channels.cache.get(process.env.CHANNEL);

  if (!channel) {
    return res.status(404).send('Channel not found.');
  }

  try {
    // Send the message and await the response.
    await channel.send(message);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.error('Failed to send message:', error);
    res.status(500).send('Failed to send message.');
  }
};