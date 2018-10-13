module.exports = (client, message) => {
  if (!message.guild || message.author.bot) return;

  const key = `${message.guild.id}-${message.author.id}`;

  const rep = client.rep.ensure(key, {
    user: message.author.id,
    guild: message.guild.id,
    points: message.settings.startRep
  });
  client.rep.inc(key, "points");

  const pattern = new RegExp("discord(?:app\.com|\.gg)[\/invite\/]?(?:(?!.*[Ii10OolL]).[a-zA-Z0-9]{5,6}|[a-zA-Z0-9\-]{2,32})", "gmi");
  if (pattern.test(message.content)) {
    console.log("Message had invite");
    return client.rep.math(key, "-", message.settings.repLossPerInvite, "points");
  }

  client.rep.ensure(`${message.guild.id}-${message.mentions.users.first().id}`, {
    user: message.author.id,
    guild: message.guild.id,
    points: message.settings.startRep
  });

  if (message.content.startsWith("++rep")) {
    if (!message.mentions.users.size) {
      client.rep.math(`${message.guild.id}-${message.mentions.users.first().id}`, "+", message.settings.repGainPerCmd, "points");
    }
    return;
  } else if (message.content.startsWith("--rep")) {
    if (!message.mentions.users.size) {
      client.rep.math(`${message.guild.id}-${message.mentions.users.first().id}`, "-", message.settings.repLossPerCmd, "points");
    }
    return;
  }

  console.log(rep);
};