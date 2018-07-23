exports.run = (client, message, args) => {
    if (args.length < 1 || !/^(#?)[0-9a-fA-F]{6}$/.test(args[0])) {
        throw 'Please input a valid hex code.';
    }

    const color = args[0].replace(/^#/, '');

    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);

    message.channel.send({
        embed: global.factory.embed()
            .setTitle(`#${color}`)
            .setColor([r, g, b])
            .setImage(`http://placehold.it/100/${color}/${color}`)
            .setFooter(`R=${r}, G=${g}, B=${b}`)
    });
};

exports.info = {
    name: 'color',
    usage: 'color <hex code>',
    description: 'Shows you information about a color.'
};
