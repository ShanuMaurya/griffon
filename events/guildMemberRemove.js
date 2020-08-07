const randomMessages = [
  'Buh-bye ~~felicia~~ {user}!',
  'Alas poor {name}, I knew him well!',
  'Good riddance, {name}, I hope you had the time of your life!',
  'I will remember you, {name}, will you remember me?',
  "Will she call his name? Will she walk on by? Don't you forget about me, {name}",
  "It might sound crazy but it ain't no lie {name} bye bye bye",
  "Na na na na, hey hey hey, goodbye {name}!",
  "Goodbye {name}, it seems to me like you lived your life like a candle in the wind.",
  "Oh you're going away? Well nevermind, I'll find someone like you!",
  "Goodbye {name}, you shall be missed.",
  "You say hello, I say goodbye {name}, goodbye goodbye!",
  "You didn't have to stoop so low, {name}, now you're just somebody that we used to know."
];

module.exports = async (client, member) => {
  const logChannel = member.guild.channels.get("318579723989155840");
  logChannel.send(randomMessages.random().replace('{name}', member.user));
};
