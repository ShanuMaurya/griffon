const Discord = require("discord.js");
const moment = require("moment");

module.exports = async (client, member) => {
  // Load the guild's settings
  const settings = client.getGuildSettings(member.guild);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  const welcomeChannel = member.guild.channels.find(c => c.name === settings.welcomeChannel);
  if (!welcomeChannel) return;

  const fromNow = moment(member.user.createdTimestamp).fromNow();
  const isNew = (new Date() - member.user.createdTimestamp) < 43200000 ? "\n🆕 Account!" : "";

  const embed = new Discord.RichEmbed()
    .setTitle("Member Joined")
    .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL)
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription(`**Account Created** : ${fromNow} ${isNew}`)
    .setColor("#00d129")
    .setTimestamp();
  welcomeChannel.send(embed);
};
