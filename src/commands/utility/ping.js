exports.run = async (client, message) => {
    const m = await message.channel.send(':stopwatch: Ping!');
    m.edit(`:stopwatch: Pong! \`${m.createdTimestamp - message.createdTimestamp}ms\``);
};

exports.info = {
    name: 'ping',
    aliases: ['p'],
    description: 'Pings the bot.'
};
