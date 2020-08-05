const { RichEmbed } = require("discord.js");

const actions = require("../modules/modactions.js");
console.log('ACTIONS: ', actions);

exports.run = async (client, message, { userid }, level) => { // eslint-disable-line no-unused-vars
  const m = await message.channel.send("Fetching History...");
  const modChannel = message.guild.channels.find(c => c.name === message.settings.modLogChannel);
  if (!modChannel) {
    return m.edit(`Could not find #${message.settings.modLogChannel} channel. Please create it and try again`);
  }
  const target = await actions.getUser(message, userid) || message.author;
  
  console.log(userid, target, message.author);

  await m.edit(`Fetching History for **${target.tag} (${target.id})** ...`);
  if (!client.logs.has(`${message.guild.id}-${target.id}`))
    return m.edit("No moderation action detected. This guy's clean as a whistle, Boss.");

  const modactions = {};
  Object.values(client.logs.get(`${message.guild.id}-${target.id}`)).forEach(action => {
    if (!actions[action.type]) {
      modactions[action.type] = 1;
    } else {
      modactions[action.type]++;
    }
  });
  const embed = new RichEmbed()
    .setThumbnail(target.displayAvatarURL)
    .setAuthor(`${target.tag} (${target.id})`, target.displayAvatarURL);
  let str = "";
  for (const [key, value] of Object.entries(modactions)) {
    str += `**${value} ${key.toProperCase()}s**\n`;
  }
  embed.addField("**Moderation History**", str);
  message.channel.send(embed);
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "history",
  category: "Moderation",
  description: "View your moderation history or some other user's.",
  usage: "history [@user/ID]"
};
