// Sends mesasges from a bot

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const port = 3001; // Or any available port

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_BOT_TOKEN);

app.use(cors());
app.use(express.json());

app.post('/api/sendMessage', (req, res) => {
  console.log("message recieved from the frontend");
  console.log(req.body);
  const channelId = process.env.CHANNEL; 
  const message = req.body.message;

  const channel = client.channels.cache.get(channelId);

  if (!channel) {
    return res.status(404).send('Channel not found.');
  }

  channel.send(message)
    .then(() => res.status(200).send('Message sent successfully.'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to send message.');
      });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//https://discord.com/channels/1419466100986482701/1419466101716156438
