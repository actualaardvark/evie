// Load environment variables from the .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Allows us to parse JSON data sent from the front-end
app.use(express.json());
// Allows the front-end and back-end to talk to each other
app.use(cors());

// Function to find all webhook URLs from environment variables
const getWebhookUrls = () => {
  const urls = [];
  for (const key in process.env) {
    // Check if the key starts with our specific pattern
    if (key.startsWith('DISCORD_WEBHOOK_URL')) {
      const url = process.env[key];
      // Push the URL to our list if it's a valid URL string
      if (typeof url === 'string' && url.startsWith('https://discord.com/api/v9/')) {
        urls.push(url);
      }
    }
  }
  return urls;
};

// API endpoint to handle the task completion message
app.post('/api/complete-task', async (req, res) => {
  // Get the message content from the request body
  const { message } = req.body;
  const DISCORD_AUTHORIZATION = process.env.DISCORD_AUTHORIZATION

  if (!message) {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  // Get the list of all webhook URLs dynamically
  const webhookUrls = getWebhookUrls();
  if (webhookUrls.length === 0) {
    console.error('No Discord webhook URLs found in environment variables.');
    return res.status(500).json({ error: 'Server is not configured to send Discord messages.' });
  }

  try {
    // Create an array of promises for each fetch request
    const fetchPromises = webhookUrls.map(url =>
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': DISCORD_AUTHORIZATION

        },
        body: JSON.stringify({
          content: message,
        }),
      })
    );

    // Wait for all the requests to complete
    await Promise.all(fetchPromises);

    console.log(`Successfully sent message to ${webhookUrls.length} Discord webhooks.`);
    res.status(200).json({ success: true, message: `Message sent to ${webhookUrls.length} Discord webhooks.` });
  } catch (error) {
    console.error('Network or server error:', error.message);
    res.status(500).json({ error: `Network or server error: ${error.message}` });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
