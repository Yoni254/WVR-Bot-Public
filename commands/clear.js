const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'Clear',
    description: "Clears messages",
    execute(message, args) {

        if (!args[1]) return message.reply('Error no number of messages')       //Check for args[1]

        var channeltype = message.channel.type      //Check for channek type
        if (channeltype === 'text') {
            if (!message.member.hasPermission("ADMINISTRATOR", explicit = true)) return message.channel.send("Error, user is not and admin").then(msg => msg.delete(5000));       //Check for admin

            if (isNaN(args[1])) {             //Check if number
                message.channel.send('Not a number');
            }

            async function purge() {            //The purge function
                const fetched = await message.channel.fetchMessages({ limit: args[1] });
                message.channel.bulkDelete(fetched)
                    .catch(error => message.channel.send('Error'));
            }

            purge();        //start purge function
            
            }
            
    }
}