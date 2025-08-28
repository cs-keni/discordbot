const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      
      // Check if interaction is still valid before responding
      if (!interaction.isRepliable()) {
        console.log('Interaction is no longer repliable, skipping error response');
        return;
      }
      
      try {
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ 
            content: 'There was an error while executing this command!', 
            ephemeral: true 
          });
        } else {
          await interaction.reply({ 
            content: 'There was an error while executing this command!', 
            ephemeral: true 
          });
        }
      } catch (responseError) {
        console.error('Failed to send error response:', responseError);
      }
    }
  },
};
