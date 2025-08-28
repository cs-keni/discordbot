const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Get information about this server!'),
  async execute(interaction) {
    const guild = interaction.guild;
    
    // Get member counts
    const totalMembers = guild.memberCount;
    const botCount = guild.members.cache.filter(member => member.user.bot).size;
    const humanCount = totalMembers - botCount;
    
    // Get channel counts
    const textChannels = guild.channels.cache.filter(channel => channel.type === 0).size;
    const voiceChannels = guild.channels.cache.filter(channel => channel.type === 2).size;
    const categoryChannels = guild.channels.cache.filter(channel => channel.type === 4).size;
    
    // Get role count
    const roleCount = guild.roles.cache.size;
    
    // Get boost level and count
    const boostLevel = guild.premiumTier;
    const boostCount = guild.premiumSubscriptionCount;
    
    // Get server creation date
    const createdAt = guild.createdAt;
    const daysSinceCreation = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    
    const embed = new EmbedBuilder()
      .setColor('#9B59B6')
      .setTitle(`📊 Server Information: ${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 256 }))
      .addFields(
        { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
        { name: '🆔 Server ID', value: guild.id, inline: true },
        { name: '📅 Created', value: `${createdAt.toLocaleDateString()} (${daysSinceCreation} days ago)`, inline: true },
        { name: '👥 Total Members', value: totalMembers.toString(), inline: true },

        { name: '🤖 Bots', value: botCount.toString(), inline: true },
        { name: '👤 Humans', value: humanCount.toString(), inline: true },
        { name: '💬 Text Channels', value: textChannels.toString(), inline: true },
        { name: '🔊 Voice Channels', value: voiceChannels.toString(), inline: true },
        { name: '📁 Categories', value: categoryChannels.toString(), inline: true },
        { name: '🎭 Roles', value: roleCount.toString(), inline: true },
        { name: '🚀 Boost Level', value: `Level ${boostLevel} (${boostCount} boosts)`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: 'Requested by ' + interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
    
    // Add description if available
    if (guild.description) {
      embed.setDescription(guild.description);
    }
    
    await interaction.reply({ embeds: [embed] });
  },
};
