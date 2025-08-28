const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const http = require('http');
require('dotenv').config();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ]
});

// Collection to store commands
client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Error handling
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

// Create simple HTTP server for Render health checks
const server = http.createServer((req, res) => {
  const url = req.url;
  
  if (url === '/health') {
    // Simple health check for Render
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }
  
  if (url === '/status') {
    // JSON status endpoint
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const status = {
      bot: client.user ? client.user.username : 'Starting up...',
      status: 'online',
      uptime: Math.floor(process.uptime()),
      servers: client.guilds ? client.guilds.cache.size : 0,
      timestamp: new Date().toISOString()
    };
    res.end(JSON.stringify(status, null, 2));
    return;
  }
  
  // Main status page
  res.writeHead(200, { 'Content-Type': 'text/html' });
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Discord Bot Status</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #2c2f33; color: white; }
        .status { background: #7289da; padding: 20px; border-radius: 10px; margin: 20px; }
        .online { color: #43b581; }
        .bot-name { font-size: 24px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="bot-name">🤖 ${client.user ? client.user.username : 'Discord Bot'}</div>
      <div class="status">
        <h2 class="online">✅ Bot is Online!</h2>
        <p>Status: Connected to Discord</p>
        <p>Uptime: ${Math.floor(process.uptime() / 60)} minutes</p>
        <p>Server Count: ${client.guilds ? client.guilds.cache.size : 0}</p>
      </div>
      <div class="status">
        <h3>🌐 Endpoints</h3>
        <p><strong>/</strong> - This status page</p>
        <p><strong>/health</strong> - Simple health check</p>
        <p><strong>/status</strong> - JSON status data</p>
      </div>
    </body>
    </html>
  `;
  
  res.end(html);
});

// Start HTTP server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🌐 HTTP server running on port ${PORT}`);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);
