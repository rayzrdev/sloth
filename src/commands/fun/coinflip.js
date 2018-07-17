exports.run = async (client, message) => {
    let alternatives = [
        'Heads',
        'Tails'
    ];

    // Variable name will probably be changed in the future.
    let randomAlternative = alternatives[Math.floor(Math.random() * alternatives.length)];

    message.channel.send(randomAlternative);
};

exports.info = {
    name: 'coinflip',
    usage: 'coinflip',
    description: 'Flips a coin.'
};
