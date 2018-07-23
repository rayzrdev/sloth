exports.run = async (client, message, args) => {
    const target = message.author;

    const profile = await client.managers.profiles.getOrCreateProfile(target.id);
    message.channel.send({
        embed: global.factory.embed()
            .setTitle(target.tag)
            .addField('Money:', `$${profile.money}`)
            .addField('XP:', `${profile.xp.toFixed(2)}`)
            .addField('Friends:', profile.friends.map(id => {
                let user = client.users.get(id);
                if (user) {
                    return user.username;
                } else {
                    return '(Unknown)';
                }
            }).join(', ') || 'None')
    });
};

exports.info = {
    name: 'profile',
    description: 'Shows you your profile'
};
