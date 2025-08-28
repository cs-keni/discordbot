const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cloud')
    .setDescription('Get information about where the bot is running and its status!'),
  async execute(interaction) {
    // Get system information
    const platform = os.platform();
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    
    // Convert uptime to readable format
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    
    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    
    // Determine if running on Render
    const isRender = process.env.RENDER || process.env.RENDER_EXTERNAL_URL;
    const hostingProvider = isRender ? 'Render Cloud' : 'Local Machine';
    const hostingIcon = isRender ? '☁️' : '💻';
    
    // Get environment info
    const nodeVersion = process.version;
    const discordJsVersion = require('discord.js/package.json').version;
    
    const embed = new EmbedBuilder()
      .setColor(isRender ? '#00D4AA' : '#7289DA')
      .setTitle(`${hostingIcon} Bot Deployment Information`)
      .setDescription(`**${interaction.client.user.username}** is currently running on **${hostingProvider}**`)
      .addFields(
        { 
          name: '🏠 Hosting Location', 
          value: isRender ? '☁️ **Render Cloud Servers**\n*Professional cloud hosting*' : '💻 **Your Local Machine**\n*Development/testing mode*', 
          inline: false 
        },
        { 
          name: '⏱️ Uptime', 
          value: uptimeString, 
          inline: true 
        },
        { 
          name: '🖥️ Platform', 
          value: platform.charAt(0).toUpperCase() + platform.slice(1), 
          inline: true 
        },
        { 
          name: '🧠 Memory Usage', 
          value: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB / ${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`, 
          inline: true 
        },
        { 
          name: '📦 Node.js Version', 
          value: nodeVersion, 
          inline: true 
        },
        { 
          name: '🤖 Discord.js Version', 
          value: `v${discordJsVersion}`, 
          inline: true 
        }
      )
      .setTimestamp()
      .setFooter({ 
        text: isRender ? 'Running 24/7 in the cloud! ☁️' : 'Running locally for development', 
        iconURL: interaction.client.user.displayAvatarURL() 
      });
    
    // Add special note for Render
    if (isRender) {
      embed.addFields({
        name: '💡 Render Features',
        value: '• **24/7 Uptime** - Never goes offline\n• **Auto-deploy** - Updates when you push to GitHub\n• **Smart sleep** - Saves resources when not in use\n• **Instant wake-up** - Responds immediately to commands',
        inline: false
      });
    }
    
    await interaction.reply({ embeds: [embed] });
  },
};
