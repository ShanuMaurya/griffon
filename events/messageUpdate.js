module.exports = async (client, om, nm) => {
  if(!om.content || !nm.content) return;
  if(om.content === nm.content) return;
  const logChannel = om.guild.channels.find(c => c.name === 'raw-logs');
  logChannel.send(`\`Message Edited\` in <#${om.channel.id}> (Author: ${om.author.tag} - ${om.author.id})
  ${om.cleanContent}
  ---
  ${nm.cleanContent}`);
};
