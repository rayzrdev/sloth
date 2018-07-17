const path = require('path');
const CommandLoader = require('./loader');

class CommandManager {
    constructor(client) {
        this.client = client;
    }

    init() {
        const commandsFolder = path.resolve(global.paths.base, 'commands');
        this.loader = new CommandLoader(commandsFolder);
        this.commands = this.loader.loadCommands();
    }

    /**
     * Tries to match user input to any command in the bot.
     * 
     * @param {string} input The inputted command label.
     */
    matchCommand(input) {
        return this.commands.find(command => command.info.name.toLowerCase() === input.toLowerCase())
            // Separate the find calls so that command name will take priority
            || this.commands.filter(command => command.info.aliases instanceof Array)
                .find(command => command.info.aliases.find(alias => alias.toLowerCase() === input.toLowerCase()));
    }

    getPrefixedContent(message) {
        return [
            this.client.config.prefix,
            this.client.user.toString()
        ].map(prefix => message.content.startsWith(prefix) ? message.content.substr(prefix.length) : null)
            .find(content => !!content);
    }

    onMessage(message) {
        const content = this.getPrefixedContent(message);
        if (!content) {
            return;
        }

        const split = content.trim().split(' ');
        const label = split[0];
        const args = split.slice(1);

        const command = this.matchCommand(label);
        if (!command) {
            return;
        }

        this.executeCommand(command, message, args);
    }

    async executeCommand(command, message, args) {
        try {
            await command.run(this.client, message, args);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error running command '${command.info.name}' with args [${args.map(arg => `"${arg}"`).join(', ')}]:`, error);
            }

            let errorMessage = error instanceof Error ? error.message : error;
            if (errorMessage) {
                message.channel.send(`:x: ${errorMessage}`);
            } else {
                message.channel.send(':x: An unknown error has occurred!');
            }
        }
    }
}

module.exports = CommandManager;
