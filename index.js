const path = require('path');
const discord = require('discord.js');
const fse = require('fs-extra');
const readdir = require('readdir-recursive');

const client = new discord.Client();

client.commands = new Map();

const config = (() => {
    try {
        if (!fse.existsSync('config.json')) {
            throw 'Config does not exist!';
        }

        const contents = fse.readFileSync('config.json').toString();

        return JSON.parse(contents);
    } catch (err) {
        console.error('Failed to load config:', err);
        process.exit(1);
    }
})();

readdir.fileSync(path.join(__dirname, 'commands'))
    .filter(file => file.endsWith('.js'))
    .forEach(commandFile => {
        try {
            const commands = [].concat(require(commandFile));

            commands.forEach(command => {
                if (typeof command !== 'object') {
                    throw 'Expected object from command file!';
                } else if (typeof command.run !== 'function') {
                    throw 'Command is missing run method!';
                } else if (typeof command.info !== 'object') {
                    throw 'Missing command info object!';
                }

                client.commands.set(command.info.name, command);

                // hack solution: register the command under aliases, as well
                if (command.info.aliases instanceof Array) {
                    command.info.aliases.forEach(alias => client.commands.set(alias, command));
                }
            });
        } catch (err) {
            console.error(`Failed to load command file '${commandFile}':`, err);
        }
    });

client.on('ready', () => {
    client.user.setActivity(`over ${client.users.size} users | ${config.prefix}help`, { type: 'WATCHING' });
    console.log(`Sloth connected to ${client.guilds.size} guilds and ${client.users.size} users.`);
    console.log(`Default prefix: ${config.prefix}`);
    console.log('Generating invite...');
    client.generateInvite(['ADMINISTRATOR']).then(console.log);
});

client.on('message', message => {
    // Only users can trigger commands.
    if (message.author.bot) return;

    // Make sure the message starts with the prefix.
    if (!message.content.startsWith(config.prefix)) return;

    let args = message.content.substr(config.prefix.length).trim().split(' ');
    let commandLabel = args.shift().toLowerCase();

    let command = client.commands.get(commandLabel);

    if (command) {
        command.run(client, message, args);
    }
});

config.token && client.login(config.token).catch(console.error);
