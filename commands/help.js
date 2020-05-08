const Discord = require('discord.js');      //discord bots
const fcheck = require('../functions/check');
require('../index')

module.exports = {
    name: 'Help',
    description: "List of commands",
    /**
     * the help command, shows list of commands
     * @param {object} message the message that was sent
     * @param {array} args the message arguments
     */
    execute(message, args) {


        //try to run the command
        try {
            /**the command fucntion */
            async function help() {

                //if help admin command - +help 'admin'
                if (args[1] === 'admin') {    
                    try {
                    //check if not an admin 
                        if (!message.member.hasPermission("ADMINISTRATOR")) {
                            //send a message if not admin and then deletes
                            message.channel.send("Error, you need to be an admin to use this command").then(msg => msg.delete(5000))
                    
                        //else
                        } else {
                            /** @param {object} embed a discord rich embed */
                            const embed = new Discord.MessageEmbed()
                                .setColor('F3E210')
                                .setThumbnail('https://i.imgur.com/yBIqOej.png')
                                .setTitle('List of Admin commands')
                                .addField('Place', 'WVR Placement command \n+place @user <role> <platform> <time zone>')
                                .addField('Set', 'Write to data base- placedm/reset \n+set placedm/reset/HookEvent/HookEventAdd')
                                .addField('Reset', 'Fully purges a preset channel \n+reset <name> (must go through set first)')
                                .addField('Say', 'Sends message as the bot \n+say <content>')
                                .addField('PLaceCheck', 'Pings all recruits in their platform chat for placement \n+AnnouncePlacement <platform>')
                                .addField('Get Changes', ' Sends needed changes in settlement files \n+get changes @settlement')
                                .addField('Get settlement', 'sends list of settlement members by records \n+get settlement <name>')
                                .addField('Remove Member', 'Remove member from records \n+remove member @member')
                                .setTimestamp()
                                .setFooter('Version- ' + Version)

                            //send the help embed
                            message.channel.send(embed);
                        }
                    }
                    catch (err) {
                        message.channel.send("You need to be in a server to use this")
                    }

                //if normal help
                } else {
                    /** @param {object} embed a discord rich embed */
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
                        .addField('Joined', 'When user joined \n +joined (@user)/(month/year)')
                        .addField('Poll', 'Posts a poll, \n +poll "question" "args[1]" "args[2]" (etc up to 10 options)')
                        .addField('SayAs', 'Sends message as you from a bot \n +sayas <@member> <something>')
                        .addField('ActivityCheck', 'Activity check logs for WVR \n+activitycheck <message id> <@settlement> <#settlement>')
                        .addField('Settlement', 'Sends embed with information about settlement members and leaders \n+settlement <@settlement>')
                        .addField('Get SettlementList', 'Sends list of all recorded settlements \n+get settlementlist')
                        .addField('HangMan', 'Play a hangman game! \n+Hangman')
                        .addField('ConnectFour', 'Play a connect four game! \n+connectfour')
                        .addField('WhoIs', 'Show info about user \n+whois @member')
                        .addField('Ticket', 'For WVR members. Send a message to the mental health channel without your name \n+ticket message here')
                        .addField('Leadership', 'Lists all WVR leadership roles \n+leadership')
                        .addField('Id', 'Sends the message id of the message above you \n+id')
                        .setTimestamp()
                        .setFooter('Version- ' + Version)

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