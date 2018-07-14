exports.run = async (client, message) => {
    const m = await message.channel.send('Ping!');
    m.edit(`Pong! \`${m.createdTimestamp - message.createdTimestamp}ms\``);
};

exports.info = {
    name: 'ping',
    description: 'Pings the bot.'
};
