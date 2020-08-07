module.exports = async (client, message) => {
  if(!message.content) return;
  const logChannel = message.guild.channels.find(c => c.name === 'raw-logs');
  logChannel.send(`\`Message Deleted\` in <#${message.channel.id}> (Author: ${message.author.tag} - ${message.author.id})
  ${message.cleanContent}`);
};
