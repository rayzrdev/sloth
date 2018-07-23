const { RichEmbed } = require('discord.js');

const embed = options => new RichEmbed(options)
    .setColor(global.config.color);

module.exports = { embed };
