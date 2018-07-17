exports.run = async (client, message, args) => {
    let responses = [
        'Yes.',
        'No.',
        'Hopefully.',
        'Hopefully not.',
        'Maybe, maybe not.',
        'No, I don\'t think so.',
        'Uhhhhh... no comment...',
        'Why would you even ask?'
    ];

    if (args.length < 1) {
        throw 'Please provide a question.';
    }

    let randomResponse = responses[Math.floor(Math.random() * responses.length)];

    message.channel.send(`:8ball: - ${randomResponse}`);
};

exports.info = {
    name: '8ball',
    usage: '8ball [question]',
    description: 'Asks the magic ball a question.'
};
