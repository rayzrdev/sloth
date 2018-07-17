exports.run = async (client, message, args) => {
    const target = message.mentions.members.first() || message.guild.members.get(args[0]);
    const reason = args.slice(1).join(' ');

    if (args.length < 2) {
        throw 'Please provide both a user and a reason.';
    }

    if (!target) {
        throw 'Sorry, but that user could not be found.';
    }

    if (target.hasPermission('KICK_MEMBERS')) {
        throw 'Sorry, but you may not kick a fellow staff member.';
    }

    if (reason) {
        const discord = require('discord.js');
        const embed = new discord.RichEmbed()
            .setColor(0xff6868)
            .setAuthor(`${target.user.tag}`, `${target.user.avatarURL}`)
            .setTitle('You have been kicked!')
            .addField('By:', `${message.author.tag} (ID: ${message.author.id})`)
            .addField('Reason:', `${reason}`)
            .setTimestamp();
        await target.send({ embed });
    }

    target.kick(reason);
    message.channel.send(`:white_check_mark: **${target.user.tag}** has been successfully kicked.`);
};

exports.info = {
    name: 'kick',
    usage: 'kick <user> [reason]',
    description: 'Kicks a user.',
    permissions: ['KICK_MEMBERS'],
    guildOnly: true
};
