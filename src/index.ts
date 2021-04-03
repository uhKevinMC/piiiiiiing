import { Client, ClientOptions, Message } from 'discord.js';

const client: Client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] } as ClientOptions);
const prefix: string = '!';
const token: string = 'insert token here';

void client.login(token);

client.on('message', async (message: Message): Promise<Message> => {
  if (message.system) return;
  if (message.author.bot) return;

  if (message.content === `${prefix}ping`) {
    const startTime: number = new Date().getTime();
    const newMsg: Message = await message.reply('Pinging...');
    const endTime: number = new Date().getTime();

    newMsg.edit(`Pong! \`${endTime - startTime}ms\``);
  } else if (message.content === `${prefix}heartbeat`) {
    message.reply(`Pong! \`${client.ws.ping}\``);
  }
});

void client.on('ready', () => {
  console.log(`I'm ready!`);
});