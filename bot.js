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
  if (message.content.toLowerCase() !== "wl") return;

  try {

    // BUTTONS (used for both messages)
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("🔗 Join DiamondRP")
          .setStyle(ButtonStyle.Link)
          .setURL("https://cfx.re/join/vg9a35"),

        new ButtonBuilder()
          .setLabel("📜 Server Rules")
          .setStyle(ButtonStyle.Link)
          .setURL("https://discord.com/channels/1479591868143763736/1479622500106244258"),

        new ButtonBuilder()
          .setLabel("📚 New Player Guide")
          .setStyle(ButtonStyle.Link)
          .setURL("https://discord.com/channels/1479591868143763736/1479621896931905608")
      );

    // MORE RELIABLE ROLE CHECK
    const hasRole = message.member.roles.cache.some(role => role.id === ROLE_ID);

    if (hasRole) {

      const alreadyEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle("Diamond Roleplay Whitelist")
        .setThumbnail("https://r2.fivemanage.com/bb4cjGZWu2F80OWT1Z7eL/3C9DAE35-5715-490B-8DD3-B4520087B09A-Photoroom.png")
        .setDescription(
`❌ You have already been whitelisted!

You already have access to **Diamond Roleplay**.

↘️``Use the buttons below to join the server or view important information.``↙️`
        )
        .setFooter({ text: "Diamond Roleplay" });

      return message.reply({
        embeds: [alreadyEmbed],
        components: [row]
      });
    }

    // GIVE ROLE
    await message.member.roles.add(ROLE_ID);

    const embed = new EmbedBuilder()
      .setColor(0x00ff88)
      .setTitle("Diamond Roleplay Whitelist")
      .setThumbnail("https://r2.fivemanage.com/bb4cjGZWu2F80OWT1Z7eL/3C9DAE35-5715-490B-8DD3-B4520087B09A-Photoroom.png")
      .setDescription(
`✅ You are now whitelisted!

Welcome to **Diamond Roleplay**.

↘️``Use the buttons below to join the server or view important information.``↙️`
      )
      .setFooter({ text: "Diamond Roleplay" });

    await message.reply({
      embeds: [embed],
      components: [row]
    });

  } catch (error) {
    console.error(error);
    message.reply("❌ I couldn't give the role. Check permissions.");
  }

});

client.login(TOKEN);
