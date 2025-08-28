const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all available commands!'),
  async execute(interaction) {
    const commands = interaction.client.commands;
    
    const embed = new EmbedBuilder()
      .setColor('#3498DB')
      .setTitle('🤖 Bot Commands')
      .setDescription('Here are all the commands you can use:')
      .addFields(
        { 
          name: '🎮 Fun & Games', 
          value: [
            '`/trivia` - Play a quick trivia game',
            '`/8ball <question>` - Ask the magic 8-ball',
            '`/roll [dice] [sides]` - Roll some dice',
            '`/poll <question> [options]` - Create a poll'
          ].join('\n'),
          inline: false 
        },
        { 
          name: 'ℹ️ Information', 
          value: [
            '`/ping` - Check bot latency',
            '`/serverinfo` - Get server information',
            '`/cloud` - Show deployment information',
            '`/help` - Show this help message'
          ].join('\n'),
          inline: false 
        }
      )
      .setTimestamp()
      .setFooter({ 
        text: 'Use / before any command to use it!', 
        iconURL: interaction.client.user.displayAvatarURL() 
      });
    
    await interaction.reply({ embeds: [embed] });
  },
};
