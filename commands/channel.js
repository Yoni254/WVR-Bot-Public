const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'Channel',
    description: "Channel info commands",
        /** 
         * Sends Embed with info about a channel
         * @param {object} message the message that executed the command
         * @param {array} args the message arguments
         */
    execute(message, args) {

        //Check if channel id
        if (args[1] === 'id') {
            //Get channel id
            var cid = message.channel.id;
            //Send
            message.channel.send(cid)
        }

        //Check if channel info
        if (args[1] === 'info') {
            //get name date and type
            
            /** @param {string} channelname the name of the channel */
            var channelname = message.channel.name;

            /** @param {string} channeldate the date the channel was created at */
            var channeldate = message.channel.createdAt;

            /** @param {string} channeltype the type of the channel */
            var channeltype = message.channel.type;

            /** @param {number} cid the channel id */
            var cid = message.channel.id;

            //If user is in a Server
            if (channeltype === 'text') {

                /** @param channelinfo New Discord Embed */
                const channelinfo = new Discord.MessageEmbed()
                    .setColor('10F321')
                    .setTitle('Showing Channel information for: ' + channelname)
                    .addField('Date created', channeldate)
                    .addField('Channel Type', channeltype)
                    .addField('Channel ID', cid)
                    .setThumbnail(message.guild.iconURL);

                //Send embed
                message.channel.send(channelinfo);
            }

            //If user is in a DM
            else {
                /** @param channelinfo New Discord Embed */
                const channelinfo = new Discord.MessageEmbed()
                    .setColor('10F321')
                    .setTitle('Showing Channel information for: ' + channelname)
                    .addField('Date created', channeldate)
                    .addField('Channel Type', channeltype)
                    .addField('Channel ID', cid);

                //Send embed
                message.channel.send(channelinfo);
            }
        }

    }
}