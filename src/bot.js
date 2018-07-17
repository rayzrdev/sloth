const path = require('path');
const discord = require('discord.js');
const fse = require('fs-extra');
const readdir = require('readdir-recursive');

const CommandManager = require('./managers/commands');

const client = new discord.Client();

const config = client.config = (() => {
    try {
        if (!fse.existsSync('config.json')) {
            throw 'Config does not exist!';
        }

        return fse.readJSONSync('config.json');
    } catch (err) {
        console.error('Failed to load config:', err);
        process.exit(1);
    }
})();

global.paths = {
    base: __dirname
};

client.managers = {
    commands: new CommandManager(client)
};


client.on('ready', () => {
    client.managers.commands.init();

    console.log(`Sloth connected to ${client.guilds.size} guilds and ${client.users.size} users.`);
    console.log(`Default prefix: ${config.prefix}`);
    console.log('Generating invite...');

    client.user.setActivity(`over ${client.users.size} users | ${config.prefix}help`, { type: 'WATCHING' });
    client.generateInvite(['ADMINISTRATOR']).then(console.log);
});

client.on('message', async message => {
    // Only users can trigger commands.
    if (message.author.bot) return;

    client.managers.commands.onMessage(message);
});

config.token && client.login(config.token).catch(console.error);
