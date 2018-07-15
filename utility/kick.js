exports.run = async (client, message, args) => {
    const target = message.mentions.members.first() || message.guild.members.get(args[0]);
    const reason = args.slice(1).join(' ');
    
    if (!message.member.hasPermission('KICK_MEMBERS')) {
        throw 'Sorry, but requires the following permission node `KICK_MEMBERS`.'
    }

    if (args.length < 2) {
        throw 'Please provide both a user and a reason.';
    }
    
    if (!target) {
        throw 'Sorry, but that user could not be found.';
    }
        
    if (target.hasPermission('KICK_MEMBERS')) {
        throw 'Sorry, but you may not kick a fellow staff member.'
    }

    if (reason) {
        await target.send(`You were kicked for **${reason}**`);
    }
    
    target.kick(reason);
    message.channel.send(`:white_check_mark: **${target.user.tag}** has been successfully kicked.`);
};

exports.info = {
    name: 'kick',
    usage: 'kick <user> [reason]',
    description: 'Kicks a user.'
};
