const path = require('path');
const readdirRecursive = require('readdir-recursive');

/**
 * @param {string} folder The folder to read from.
 * @returns {string[]} A list of all source files.
 */
const getAllSourceFiles = folder => {
    return readdirRecursive.fileSync(folder)
        .filter(name => name.endsWith('.js'));
};

class CommandLoader {
    constructor(baseFolder) {
        this.baseFolder = baseFolder;
    }

    /**
     * Validates a command to make sure it has all the required properties.
     * 
     * @param {object} command The command object.
     * @param {string} name The name of the command.
     * @returns {bool} Whether or not the command is valid.
     */
    validateCommand(command, name) {
        if (typeof command !== 'object') {
            throw new TypeError(`Expect object from command '${name}'`);
        } else if (typeof command.run !== 'function') {
            throw new TypeError(`Expected function from run method on command '${name}'`);
        } else if (typeof command.info !== 'object') {
            throw new TypeError(`Expected object from info property on command '${name}'`);
        } else if (typeof command.info.name !== 'string') {
            throw new TypeError(`Expected property 'name' on info object for command '${name}'`);
        }
        return true;
    }

    loadCommands() {
        return getAllSourceFiles(this.baseFolder)
            // Import them via require
            .map(file => {
                let relativeName = path.relative(this.baseFolder, file);

                try {
                    const raw = require(file);
                    if (!raw || (raw instanceof Array && raw.length < 1)) {
                        console.warn(`Warning: the command file '${relativeName}' has no exports. Ignoring...`);
                        return;
                    }

                    const commands = [].concat(raw);

                    return commands.map(command => {
                        this.validateCommand(command, relativeName);
                        return command;
                    });
                } catch (err) {
                    console.error(`Failed to load command '${relativeName}': ${err}`);
                }
            })
            // Remove empty results
            .filter(result => !!result)
            // Flatten nested arrays
            .reduce((output, next) => output.concat(next), []);
    }
}

module.exports = CommandLoader;
