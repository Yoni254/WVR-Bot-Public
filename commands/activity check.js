const Discord = require('discord.js');      //discord bots
const fcheck = require('../functions/check');

module.exports = {
    name: 'Activity Check',
    description: "WVR Activity check logs",
    execute(message, args, bot, redis, client) {

        /** 
         * WVR Settlement activity check log
         * @param {object} message the message
         * @param {array} aegs the message args
         * @param {object} bot the discord bot
         * @param {object} client the data base client
         * @param {object} redis the redis commands
        */

        try {

            async function activity() {

                //checks if a specific server by id
                if (await fcheck.isServerId(message, '437056044796215298') == 'false') return console.log('command is not for this server');

                //check for roles
                if (!(message.member.roles.has('539780500110311425') || message.member.roles.has('493801400661180448') || message.member.roles.has('493801323792302097') || message.member.roles.has('493801161569075201') || message.member.roles.has('493801268779810817') || message.member.roles.has('488440251824734218') || message.member.roles.has('488440179871449138') || message.member.roles.has('615041600992837662') || message.member.roles.has('518977167665922060') || message.member.roles.has('518977004067094528'))) return message.channel.send('Leadership only!')

                //check for missing args
                if (!args[1] || args[1] == ' ') return message.channel.send('Missing message id')
                if (!message.mentions.roles.first()) return message.channel.send('Missing @settlement')
                if (!message.mentions.channels.first()) return message.channel.send('Missing a #channel')

                //get the settlement
                let settlement = message.mentions.roles.first().members.map(m => m.user);
                let settlementChannel = message.mentions.channels.first();

                //get the logs channel
                let logChannel = bot.channels.get('650725555561562113')

                //fetch the activitycheck message
                settlementChannel.messages.fetch(args[1]).then(activityCheck => {
                    //if non found
                    if (!activityCheck) return message.channel.send('Couldn\'t Fetch the message. Wrong ID or Wrong Channel.')

                    //add reaction
                    activityCheck.react('👌').then(messageReaction => {
    
                        //send the log
                        logChannel.send(`Settlement activity check for ${message.mentions.roles.first()} - ${settlementChannel}. \nUser with :ok_hand: next to their name has reacted, getting live time updates:smiley: \n\nSettlement Size: ${settlement.length} \n\n${settlement.join('\n')}`).then(logMessage => {
                        
                            //log the messages ID
                            console.log(activityCheck.id)
                            console.log(logMessage.id)
                            //store in data base the message ids
                            client.set(settlementChannel.id + 'ActivityCheck', args[1] + ',' + logMessage.id, redis.print);

                            //when done
                            message.channel.send('Got it!')

                        }).catch(err => {
                            //log errors
                            console.log(`Error Sending activity check log message: ${err}`);
                            message.channel.send('Error Couldnt send log message');
                        })
                                  
                    }).catch(err => {       //reacting
                        //log errors
                        console.log(`Error Reacting to Activitycheck: ${err}`);
                        message.channel.send('Error reacting to message');
                    })
                }).catch(err => {       //fetch activitycheck message
                    //log errors
                    console.log(`Error fetching ActivityCheck message: ${err}`);
                    message.channel.send('Couldn\'t Fetch the message. Wrong ID or Wrong Channel.')

                })
            } 
            
            activity();
            
        }
        //catch errors
        catch (err) {
            //log
            console.log('Error: ' + err)
        }
        
    }
}
