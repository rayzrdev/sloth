exports.run = async (client, message, args) => {
    let target = message.mentions.members.first() || message.guild.members.get(args[0]); // Gets the mentioned member.
    let reason = args.slice(1).join(' ');

    if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.channel.send(':x: Sorry, but you do not have the required permission node `KICK_MEMBERS`.');

    if (!target)
        return message.channel.send(':x: Please provide a user to kick.');

    if (target.hasPermission('KICK_MEMBERS'))
        return message.channel.send(':x: Sorry, but you can not kick fellow staff members.');

    if (reason) {
        await target.send(`You have been kicked due to **${reason}**`);
    }

    target.kick(`Kicked by ${message.author.tag}`);
    message.channel.send(`:white_check_mark: ${target} has been successfully kicked.`);
};

exports.info = {
    name: 'kick',
    usage: 'kick <user> [reason]',
    description: 'Kicks a user.'
};
