const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Play a quick trivia game!'),
  async execute(interaction) {
    const triviaQuestions = [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2,
        explanation: "Paris is the capital and largest city of France."
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1,
        explanation: "Mars is called the Red Planet due to iron oxide on its surface."
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3,
        explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
        correct: 1,
        explanation: "Leonardo da Vinci painted the Mona Lisa in the 16th century."
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Fe", "Cu"],
        correct: 1,
        explanation: "Au comes from the Latin word for gold, 'aurum'."
      },
      {
        question: "How many sides does a hexagon have?",
        options: ["5", "6", "7", "8"],
        correct: 1,
        explanation: "A hexagon has 6 sides, from the Greek 'hex' meaning six."
      },
      {
        question: "What year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2,
        explanation: "World War II ended in 1945 with the surrender of Germany and Japan."
      },
      {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Avocado", "Onion", "Lime"],
        correct: 1,
        explanation: "Guacamole is primarily made from mashed avocados."
      }
    ];
    
    const randomQuestion = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
    
    const embed = new EmbedBuilder()
      .setColor('#F39C12')
      .setTitle('🧠 Trivia Time!')
      .setDescription(`**${randomQuestion.question}**`)
      .addFields(
        { name: 'Options', value: randomQuestion.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n'), inline: false }
      )
      .setFooter({ text: 'Click the buttons below to answer!' });
    
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('trivia_1')
          .setLabel('1')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('trivia_2')
          .setLabel('2')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('trivia_3')
          .setLabel('3')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('trivia_4')
          .setLabel('4')
          .setStyle(ButtonStyle.Primary)
      );
    
    const response = await interaction.reply({ 
      embeds: [embed], 
      components: [row],
      fetchReply: true 
    });
    
    // Store the question data temporarily (in a real bot, you'd use a database)
    response.triviaData = randomQuestion;
    
    // Set up a collector for button interactions
    const collector = response.createMessageComponentCollector({ time: 30000 });
    
    collector.on('collect', async i => {
      if (i.user.id !== interaction.user.id) {
        await i.reply({ content: '❌ This trivia game is not for you!', ephemeral: true });
        return;
      }
      
      const selectedAnswer = parseInt(i.customId.split('_')[1]) - 1;
      const isCorrect = selectedAnswer === randomQuestion.correct;
      
      const resultEmbed = new EmbedBuilder()
        .setColor(isCorrect ? '#27AE60' : '#E74C3C')
        .setTitle(isCorrect ? '🎉 Correct!' : '❌ Wrong!')
        .setDescription(`**Question:** ${randomQuestion.question}`)
        .addFields(
          { name: 'Your Answer', value: randomQuestion.options[selectedAnswer], inline: true },
          { name: 'Correct Answer', value: randomQuestion.options[randomQuestion.correct], inline: true },
          { name: 'Explanation', value: randomQuestion.explanation, inline: false }
        );
      
      // Disable all buttons
      const disabledRow = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('trivia_1')
            .setLabel('1')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId('trivia_2')
            .setLabel('2')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId('trivia_3')
            .setLabel('3')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId('trivia_4')
            .setLabel('4')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true)
        );
      
      await i.update({ 
        embeds: [resultEmbed], 
        components: [disabledRow] 
      });
      
      collector.stop();
    });
    
    collector.on('end', async () => {
      if (!response.triviaData) return; // Already answered
      
      const timeoutEmbed = new EmbedBuilder()
        .setColor('#95A5A6')
        .setTitle('⏰ Time\'s Up!')
        .setDescription(`**Question:** ${randomQuestion.question}`)
        .addFields(
          { name: 'Correct Answer', value: randomQuestion.options[randomQuestion.correct], inline: true },
          { name: 'Explanation', value: randomQuestion.explanation, inline: false }
        );
      
      const disabledRow = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('trivia_1')
            .setLabel('1')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId('trivia_2')
            .setLabel('2')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId('trivia_3')
            .setLabel('3')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId('trivia_4')
            .setLabel('4')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true)
        );
      
      await response.edit({ 
        embeds: [timeoutEmbed], 
        components: [disabledRow] 
      });
    });
  },
};
