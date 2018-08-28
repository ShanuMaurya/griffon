const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const target = message.mentions.users.first() 
    || client.users(args[0]) 
    || await client.fetchUser(args[0]).catch(()=>{})
    || message.author;
  if (!client.logs.has(`${message.guild.id}-${target.id}`))
    return message.channel.send("No moderation action detected");

  const actions = {};
  Object.values(client.logs.get(`${message.guild.id}-${target.id}`)).forEach(action => {
    if (!actions[action.type]) {
      actions[action.type] = 1;
    } else {
      actions[action.type]++;
    }
  });
  const embed = new Discord.RichEmbed
    .setTitle("Moderation History")
    .setAuthor(`${target.tag} (${target.id})`, target.displayAvatarURL);
  for (const [key, value] of Object.entries(actions)) {
    embed.addField(`**${key}**`, `${value} entries`);
  }
  message.channel.send(embed);
};