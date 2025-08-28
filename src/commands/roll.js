const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll some dice!')
    .addIntegerOption(option =>
      option.setName('dice')
        .setDescription('Number of dice to roll (default: 1)')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(10))
    .addIntegerOption(option =>
      option.setName('sides')
        .setDescription('Number of sides on each die (default: 6)')
        .setRequired(false)
        .setMinValue(2)
        .setMaxValue(100)),
  async execute(interaction) {
    const diceCount = interaction.options.getInteger('dice') || 1;
    const sides = interaction.options.getInteger('sides') || 6;
    
    if (diceCount > 10) {
      return await interaction.reply({ 
        content: '❌ You can only roll up to 10 dice at once!', 
        ephemeral: true 
      });
    }
    
    const results = [];
    let total = 0;
    
    for (let i = 0; i < diceCount; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      results.push(roll);
      total += roll;
    }
    
    const embed = new EmbedBuilder()
      .setColor('#E74C3C')
      .setTitle('🎲 Dice Roll Results')
      .addFields(
        { name: 'Dice Rolled', value: `${diceCount}d${sides}`, inline: true },
        { name: 'Individual Rolls', value: results.join(', '), inline: true },
        { name: 'Total', value: total.toString(), inline: true }
      )
      .setTimestamp()
      .setFooter({ text: 'Rolled by ' + interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
    
    await interaction.reply({ embeds: [embed] });
  },
};
