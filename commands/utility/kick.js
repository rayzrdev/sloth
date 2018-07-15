exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    const reason = args.slice(1).join(' ');
    
    if (args.length < 2) {
        throw ':x: Please provide both a user and a reason.';
    }
    
    if (!member) {
        throw ':x: Sorry, but that user could not be found.';
    }
    
    if (!message.member.hasPermission('KICK_MEMBERS') {
        throw ':x: Sorry, but requires the following permission node `KICK_MEMBERS`.'
    }
        
    if (member.hasPermission('KICK_MEMBERS') {
        throw ':x: Sorry, but you may not kick a fellow staff member.'
    }

    if (reason) {
        await member.send(`You were kicked for **${reason}**`);
    }
    
    member.kick(reason);
    message.channel.send(`:white_check_mark: **${member.user.tag}** has been successfully kicked.`);
};

exports.info = {
    name: 'kick',
    usage: 'kick <user> [reason]',
    description: 'Kicks a user.'
};
