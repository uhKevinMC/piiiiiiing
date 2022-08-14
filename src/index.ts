import { Client, ClientOptions, BaseInteraction, InteractionResponse, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token: string = 'insert token here';

await client.login(token);

client.on('interactionCreate', async (interaction: BaseInteraction): Promise<InteractionResponse<boolean>> => {
  if (interaction.isChatInputCommand()) {

    if (interaction.commandName === 'ping') {
      await interaction.reply({
        content: 'Pong!',
        ephemeral: true,
      });

      const createdTimestamp = interaction.createdTimestamp;
      const responseTimestamp = (await interaction.fetchReply()).createdTimestamp;

      return interaction.editReply({
        content: `Pong!  \`${responseTimestamp - createdTimestamp}ms\``,
      });
    } else if (interaction.commandName === 'heartbeat') {
      interaction.reply(`Pong! \`${client.ws.ping}ms\``);
    }
  }
});

client.once('ready', () => {
  console.log(`I'm ready!`);
});
