exports.run = async (client, message, args) => {
    const target = message.author;
    const profile = await client.managers.profiles.getOrCreateProfile(target.id);

    if (args.length > 0) {
        if (/^bio(graphy)?$/i.test(args[0])) {
            let bio = args.slice(1).join(' ');
            if (!bio) {
                bio = null;
            }

            profile.bio = bio;

            await client.managers.profiles.updateProfile(target.id, profile);
            return message.channel.send(':white_check_mark: Updated biography.');
        }
    }

    const embed = global.factory.embed()
        .setDescription(profile.bio || '*This user has no biography.*')
        .setTitle(target.tag)
        .setThumbnail(target.avatarURL)
        .addField('Money:', `${profile.money} :gem:`, true)
        .addField('XP:', `${profile.xp.toFixed(2)} :sparkles:`, true)
        .addField('Friends:', profile.friends.map(id => {
            let user = client.users.get(id);
            if (user) {
                return user.username;
            } else {
                return '(Unknown)';
            }
        }).join(', ') || 'None');

    message.channel.send({ embed });
};

exports.info = {
    name: 'profile',
    description: 'Shows you your profile'
};
