# 🤖 Discord Bot

A fun and feature-rich Discord bot built with Discord.js for small friend servers!

## ✨ Features

### 🎮 Fun & Games
- **Trivia Game** - Interactive trivia with multiple choice questions
- **Magic 8-Ball** - Ask questions and get mysterious answers
- **Dice Rolling** - Roll any number of dice with custom sides
- **Polls** - Create quick polls with custom options

### ℹ️ Utility Commands
- **Ping** - Check bot latency and response time
- **Server Info** - Display detailed server statistics
- **Help** - Show all available commands

### 🔮 Future Features (Coming Soon!)
- Weather updates
- Reminders and scheduling
- Member activity tracking
- Weekly server analytics
- Mini RPG system
- Welcome messages for new members

## 🚀 Quick Setup

### Prerequisites
- Node.js 16.0.0 or higher
- A Discord account
- A Discord server where you have admin permissions

### Step 1: Create Discord Application
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section and click "Add Bot"
4. Copy the bot token (you'll need this later)
5. Go to "OAuth2" → "URL Generator"
6. Select "bot" scope and these permissions:
   - Send Messages
   - Use Slash Commands
   - Read Message History
   - Add Reactions
   - Embed Links
   - Read Server Insights
7. Copy the generated URL and open it in a browser to invite the bot to your server

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
1. Copy `env.example` to `.env`
2. Edit `.env` with your bot's information:
   ```
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_application_client_id
   GUILD_ID=your_server_id
   ```

### Step 4: Deploy Commands
```bash
node src/deploy-commands.js
```

### Step 5: Start the Bot
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## 🏗️ Project Structure

```
discordbot/
├── src/
│   ├── commands/          # Bot commands
│   │   ├── ping.js       # Basic ping command
│   │   ├── 8ball.js      # Magic 8-ball
│   │   ├── roll.js       # Dice rolling
│   │   ├── poll.js       # Poll creation
│   │   ├── trivia.js     # Trivia game
│   │   ├── serverinfo.js # Server information
│   │   └── help.js       # Help command
│   ├── events/            # Event handlers
│   │   ├── ready.js      # Bot ready event
│   │   └── interactionCreate.js # Command handling
│   ├── index.js          # Main bot file
│   └── deploy-commands.js # Command deployment
├── package.json           # Dependencies and scripts
├── env.example           # Environment variables template
└── README.md             # This file
```

## 🌐 Hosting for 24/7 Uptime

### Free Options:
1. **Railway** - 500 hours/month free
2. **Render** - Free tier with sleep after inactivity
3. **Heroku** - Free tier (limited but reliable)

### Railway Setup (Recommended):
1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

## 🔧 Customization

### Adding New Commands:
1. Create a new file in `src/commands/`
2. Follow the existing command structure
3. Run `node src/deploy-commands.js` to register the command

### Example Command Structure:
```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('commandname')
    .setDescription('Description of what the command does'),
  async execute(interaction) {
    // Command logic here
    await interaction.reply('Command response!');
  },
};
```

## 🎯 Command Usage

- `/ping` - Test bot responsiveness
- `/8ball <question>` - Ask the magic 8-ball
- `/roll [dice] [sides]` - Roll dice (default: 1d6)
- `/poll <question> [options]` - Create a poll
- `/trivia` - Start a trivia game
- `/serverinfo` - Get server statistics
- `/help` - Show all commands

## 🐛 Troubleshooting

### Common Issues:
1. **Bot not responding**: Check if the bot is online and has proper permissions
2. **Commands not working**: Run `node src/deploy-commands.js` to register commands
3. **Permission errors**: Ensure the bot has the required permissions in your server

### Getting Help:
- Check the Discord.js documentation
- Verify your environment variables are correct
- Ensure the bot is invited to your server with proper permissions

## 📝 License

MIT License - feel free to modify and distribute!

## 🤝 Contributing

Feel free to add new features, fix bugs, or improve existing functionality!

---

**Happy botting! 🎉**
