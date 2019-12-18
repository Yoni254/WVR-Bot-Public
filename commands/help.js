const Discord = require('discord.js');      //discord bots
const fcheck = require('../functions/check');
module.exports = {
    name: 'Help',
    description: "List of commands",
    execute(message, args, version) {

        /**
         * the help command, shows list of commands
         * @param {object} message the message that was sent
         * @param {array} args the message arguments
         * @var version the bot version
         */


        //try to run the command
        try {
            //the command fucntion
            async function help() {

                //if help admin command - +help 'admin'
                if (args[1] === 'admin') {   
                    //check if server
                    if (await fcheck.isGuild(message) == 'false') return console.log('You need to be in a server to use this') 

                    //check if not an admin 
                    if (!message.member.hasPermission("ADMINISTRATOR")) {
                        //send a message if not admin and then deletes
                        message.channel.send("Error, you need to be an admin to use this command").then(msg => msg.delete(5000))

                    //else
                    } else {
                        //create a const - discord rich embed
                        const embed = new Discord.MessageEmbed()
                            .setColor('F3E210')
                            .setThumbnail('https://i.imgur.com/yBIqOej.png')
                            .setTitle('List of Admin commands')
                            //.addField('Clear', 'Clears messages in the channel- clear "amount of messages" \n +clear <number>')
                            .addField('Place', 'WVR Placement command \n+place @user <role> <platform> <time zone>')
                            .addField('Set', 'Write to data base- placedm/reset \n+set placedm/reset/HookEvent/HookEventAdd')
                            .addField('Reset', 'Fully purges a preset channel \n+reset <name> (must go through set first)')
                            .addField('Say', 'Sends message as the bot \n+say <content>')
                            .addField('BMNN Register', 'Add a radio station to the archives \n+bmnn <user.id> <station name>')
                            .addField('BMNN AnnounceChannel', 'Register a channel to send announcements in \n+bmnn AnnounceChannel <channel.id>')
                            .addField('BMNN RemoveAnnounce', 'Removed the channel \n+bmnn RemoveAnnounce <channel.id>')
                            .addField('PLaceCheck', 'Pings all recruits in their platform chat for placement \n+AnnouncePlacement <platform>')
                            .setTimestamp()
                            .setFooter('Version- ' + version)

                        //send the help embed
                        message.channel.send(embed);
                    }

                //if normal help
                } else {
                    //create a const - discord rich embed
                    const embed = new Discord.MessageEmbed()     //Embed const
                        .setColor('258FF3')
                        .setTitle('List of Commands')
                        .setDescription('This was brought to you by the West Virginia Republic')
                        .setThumbnail('https://i.imgur.com/yBIqOej.png')
                        .addField('Help', 'This command.')       //Help command
                        .addField('Help Admin', 'Shows list Admin commands')
                        .addField('Channel info', 'Sends Information about the channel \n channel info/id')        //Channel info command
                        .addField('WVR', 'Sends Faction links \n +wvr server/instagram')
                        .addField('Version', 'Shows the current version of the bot \n +version')
                        .addField('Server info', 'Sends Information about the channel \n +server info/id')
                        .addField('Joined', 'When user joined \n +joined (@user)')
                        .addField('Poll', 'Posts a poll, \n +poll "question" "args[1]" "args[2]" (etc up to 10 options)')
                        .addField('BMNN Announce', 'For BMNN station owners to announce posts \n +bmnn Announce (extra things)')
                        .addField('SayAs', 'Sends message as you from a bot \n +sayas <@member> <something>')
                        .setTimestamp()
                        .setFooter('Version- ' + version)

                    //send the embed
                    message.channel.send(embed);

                }
            }

            //run the command
            help();
            
        }
        //catch errors
        catch (err) {
            //log the error
            console.log('Error with Help: ' + err);
        }
        
    }
}