require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Bot is ready! Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const regex = /#(\w+)\s+(https?:\/\/\S+)/i;
  const match = message.content.match(regex);

  if (match) {
    try {
      await message.react('⏳');
      const category = match[1].toLowerCase();
      const url = match[2];
      
      // Add to Google Sheet logic here
      
      await message.reactions.removeAll();
      await message.react('✅');
    } catch (error) {
      console.error('Error:', error);
      await message.reactions.removeAll();
      await message.react('❌');
      await message.reply('Error processing your message.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
