const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'Channel',
    description: "Channel info commands",
    execute(message, args) {

        /** 
         * Sends Embed with info about a channel
         * @param {object} message the message that executed the command
         * @array args | the message arguments
         */
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
            var channelname = message.channel.name;
            var channeldate = message.channel.createdAt;
            var channeltype = message.channel.type;
            var cid = message.channel.id;

            //If user is in a Server
            if (channeltype === 'text') {
                //new Embed
                const channelinfo = new Discord.MessageEmbed()
                    .setColor('10F321')
                    .setTitle('Showing Channel information for: ' + channelname)
                    .addField('Date created', channeldate)
                    .addField('Channel Type', channeltype)
                    .addField('Channel ID', cid)
                    .setThumbnail(message.guild.iconURL);

                //Send embed
                message.channel.sendEmbed(channelinfo);
            }

            //If user is in a DM
            else {
                //New Embed
                const channelinfo = new Discord.MessageEmbed()
                    .setColor('10F321')
                    .setTitle('Showing Channel information for: ' + channelname)
                    .addField('Date created', channeldate)
                    .addField('Channel Type', channeltype)
                    .addField('Channel ID', cid);

                //Send embed
                message.channel.sendEmbed(channelinfo);
            }
        }

    }
}