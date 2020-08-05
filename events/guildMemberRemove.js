const randomMessages = [
  'Buh-bye ~~felicia~~ {user}!',
  
];

module.exports = async (client, member) => {
  const logChannel = member.guild.channels.get("318579723989155840");
  logChannel.send(`Goodbye ${member.id}, you shall be missed!`);
};
