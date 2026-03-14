
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const TOKEN=process.env.BOT_TOKEN;
const ROLE_ID=process.env.ROLE_ID;
const CHANNEL_ID=process.env.CHANNEL_ID;

client.once("ready",()=>{
  console.log(`WL Bot running as ${client.user.tag}`);
});

client.on("messageCreate", async (message)=>{
  if(message.author.bot) return;

  if(message.channel.id===CHANNEL_ID && message.content.toLowerCase()==="wl"){
    try{
      const role=message.guild.roles.cache.get(ROLE_ID);
      if(!role) return message.reply("Whitelist role not found.");

      await message.member.roles.add(role);
      await message.reply("You are now whitelisted!✅ 🔗 FiveM Connect Code:
cfx.re/join/vg9a35  📜Server Rules: <#1479622500106244258> 📕 New Player Guide: <#1479621896931905608>");
    }catch(err){
      console.error(err);
      message.reply("❌ I couldn't give the role. Check permissions.");
    }
  }
});

client.login(TOKEN);
