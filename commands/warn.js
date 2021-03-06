const { RichEmbed : Embed } = require("discord.js");
const actions = require("../modules/modactions.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const modChannel = message.guild.channels.find(c => c.name === message.settings.modLogChannel);
  if (!modChannel) {
    return message.reply(`Could not find #${message.settings.modLogChannel} channel. Please create it and try again`);
  }
  const target = actions.getMember(message, args[0]);

  if (message.member.highestRole.position <= target.highestRole.position) {
    return message.reply("Nice try, but you can't warn that user.");
  }
  const reason = args.slice(1).join(" ");
  if (!reason) {
    return message.reply("Please provide a reason for the warning.");
  }
  const key =`${message.guild.id}-${target.id}`;
  client.logs.ensure(key, []);

  const embed = new Embed()
    .setTitle("Member Warning")
    .setDescription(`**Action** : Warning\n**User** : ${target.user.tag} (${target.id})\n**Reason** : ${reason}`)
    .setThumbnail(target.displayAvatarURL)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL)
    .setColor("#ffbb00")
    .setTimestamp();
  const embedMessage = await modChannel.send(embed);

  client.logs.push(key, {
    type: "warn", reason, timestamp: Date.now(), user: target.id, mod: message.author.id,
    channel: modChannel.id, message: embedMessage.id
  });
  message.reply(`Warning ${target}.`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "warn",
  category: "Moderation",
  description: "Warns a user, with a reason.",
  usage: "warn @user reason"
};
