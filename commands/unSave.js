const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'UnSave',
    description: "Deletes a saved channel roles preset",
    execute(message, args, redis, client, bot) {
        
        var channeltype = message.channel.type;     //check for channel type
        if (channeltype !== 'text') return console.log('Not in a server');       //if not a server

        
    }
}