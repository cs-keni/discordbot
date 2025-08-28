const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`✅ ${client.user.tag} is online and ready!`);
    console.log(`🤖 Bot is in ${client.guilds.cache.size} server(s)`);
    
    // Set bot status
    client.user.setActivity('your commands!', { type: 'WATCHING' });
    
    // Log all guilds the bot is in
    client.guilds.cache.forEach(guild => {
      console.log(`📊 Server: ${guild.name} | Members: ${guild.memberCount}`);
    });
  },
};
