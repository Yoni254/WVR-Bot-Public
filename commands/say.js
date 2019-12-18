const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'Say',
    description: "Makes the bot say something",
    execute(message, args) {

            var channeltype = message.channel.type      //Check for channel type
            if (channeltype !== 'text') return message.channel.send('Error you cant use this here');

            if(message.author.bot) return;
            if (!message.member.hasPermission("MANAGE_MESSAGES", explicit = true)) return message.channel.send("Error, you can't use this").then(msg => msg.delete(5000));       //Check for perms
            message.channel.bulkDelete(1);
            msg = message.content.slice(args[0].length+2);
            message.channel.send(msg);
            var Worked = 'True';
        
    }
}