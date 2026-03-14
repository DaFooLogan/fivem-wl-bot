require("dotenv").config();
const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle 
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.BOT_TOKEN;
const ROLE_ID = process.env.ROLE_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;

client.once("ready", () => {
  console.log(`WL Bot running as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.channel.id !== CHANNEL_ID) return;

  if (message.content.toLowerCase() === "wl") {

    try {

      await message.member.roles.add(ROLE_ID);

      const embed = new EmbedBuilder()
        .setColor(0x00ff88)
        .setTitle("Diamond Roleplay Whitelist")
        .setDescription(
`You are now whitelisted✅!

Welcome to **Diamond Roleplay**.

Use the buttons below to join the server and view important information.`
        )
        .setFooter({ text: "Diamond Roleplay" });

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel("Join DiamondRP")
            .setStyle(ButtonStyle.Link)
            .setURL("https://cfx.re/join/vg9a35"),

          new ButtonBuilder()
            .setLabel("Server Rules")
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.com/channels/1479591868143763736/1479622500106244258"),

          new ButtonBuilder()
            .setLabel("New Player Guide")
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.com/channels/1479591868143763736/1479621896931905608")
        );

      await message.reply({
        embeds: [embed],
        components: [row]
      });

    } catch (error) {
      console.error(error);
      message.reply("❌ I couldn't give the role. Check permissions.");
    }
  }
});

client.login(TOKEN);
