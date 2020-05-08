const fcheck = require('../functions/check');
require('../index')

module.exports = {
    name: 'Activity Check',
    description: "WVR Activity check logs",
    /** 
     * WVR Settlement activity check log
     * @param {object} message the message
     * @param {array} args the message args
     * @param {object} redis the redis commands
     */
    execute(message, args, redis) {

        
        //Try to run
        try {
            /** Runs the activity check command */
            async function activity() {

                //checks if a specific server by id
                if (await fcheck.isServerId(message, '437056044796215298') == 'false') return console.log('command is not for this server');

                //check for roles
                if(! await fcheck.isWVRLeadership(message)) return message.channel.send('Leadership only!')

                //check for missing args
                if (!args[1] || args[1] == ' ') return message.channel.send('Missing message id')
                if (!message.mentions.roles.first()) return message.channel.send('Missing @settlement')
                if (!message.mentions.channels.first()) return message.channel.send('Missing a #channel')


                //get the settlement
                /**  @param {Map} settlement Array of Users with mentioned role */
                let settlement = message.mentions.roles.first().members.map(m => m.user);

                /** @param {object} settlementChannel the mentioned channel */
                let settlementChannel = message.mentions.channels.first();
                
                /** @param {object} logChannel the log channel where a log message will be sent */
                let logChannel = Client.channels.get('650725555561562113')

                //fetch the activitycheck message
                settlementChannel.messages.fetch(args[1]).then(/** @param {object} activityCheck The Activity check message */ activityCheck => {
                    //if non found
                    if (!activityCheck) return message.channel.send('Couldn\'t Fetch the message. Wrong ID or Wrong Channel.')

                    //add reaction
                    activityCheck.react('👌').then(messageReaction => {
    
                        //send the log
                        logChannel.send(`Settlement activity check for ${message.mentions.roles.first()} - ${settlementChannel}. \nUser with :ok_hand: next to their name has reacted, getting live time updates:smiley: \n\nSettlement Size: ${settlement.length} \n\n${settlement.join('\n')}`).then(/** @param {object} logMessage The log message of the activity check */logMessage => {
                        
                            //log the messages ID
                            console.log(activityCheck.id)
                            console.log(logMessage.id)
                            //store in data base the message ids
                            RedisClient.set(settlementChannel.id + 'ActivityCheck', args[1] + ',' + logMessage.id, redis.print);

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
