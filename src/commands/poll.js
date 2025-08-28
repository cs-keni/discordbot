const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a quick poll!')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('What is the poll question?')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('options')
        .setDescription('Poll options separated by commas (e.g., Yes, No, Maybe)')
        .setRequired(false)),
  async execute(interaction) {
    const question = interaction.options.getString('question');
    const options = interaction.options.getString('options');
    
    let pollOptions = ['👍 Yes', '👎 No'];
    let emojis = ['👍', '👎'];
    
    if (options) {
      const optionList = options.split(',').map(opt => opt.trim()).filter(opt => opt.length > 0);
      if (optionList.length >= 2 && optionList.length <= 10) {
        pollOptions = optionList;
        // Use number emojis for custom options
        emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'].slice(0, optionList.length);
      }
    }
    
    const embed = new EmbedBuilder()
      .setColor('#3498DB')
      .setTitle('📊 Poll Created')
      .setDescription(`**${question}**`)
      .addFields(
        { name: 'Options', value: pollOptions.map((opt, i) => `${emojis[i]} ${opt}`).join('\n'), inline: false }
      )
      .setTimestamp()
      .setFooter({ text: 'Poll by ' + interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
    
    const pollMessage = await interaction.reply({ embeds: [embed], fetchReply: true });
    
    // Add reactions
    for (const emoji of emojis) {
      await pollMessage.react(emoji);
    }
  },
};
