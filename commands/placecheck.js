const fcheck = require('../functions/check');
require('../index')

module.exports = {
    name: 'Place Check',
    description: "Sends a message in platfrom channels for settlement placing",
    /**
     * sends a message in the platfrom announcement chats for placement
     * @param {object} message the message that was sent
     * @param {array} args the message args 
     * @param redis the redis client commands
     */
    execute(message, args, redis) {
        

        //try to run
        try {
            //the command function
            async function test() {
                //checks if in a WVR Server
                if (await fcheck.isServerId(message, '437056044796215298') == 'false') return;
                //check if an admin
                if (!message.member.hasPermission("ADMINISTRATOR")) return;
                
                //check if args 1 is xbox
                if (args[1] == 'Xbox' || args[1] == 'xbox' || args[1] == 'xb' || args[1] == 'Xb' || args[1] == 'X' || args[1] == 'x') {
                    //channel is xbox announcements
                    var channel = Client.channels.get(`545040250129612811`);
                    //get xbox general
                    var generalChannel = Client.channels.get('493444814717845504');

                //check if args 1 is pc
                } else if (args[1] == 'PC' || args[1] == 'Pc' || args[1] == 'pc') {
                    //channel is pc announcements
                    var channel = Client.channels.get(`545040391049838602`);
                    //get pc general
                    var generalChannel = Client.channels.get('493436428911378442');

                //check if args 1 is ps
                } else if (args[1] == 'PS' || args[1] == 'Ps' || args[1] == 'ps') {
                    //chanel is announcements
                    var channel = Client.channels.get(`545040074736402432`)
                    //get general
                    var generalChannel = Client.channels.get('533532176159997952')

                //if no valid channel
                } else {
                    //send an error message
                    message.channel.send('No valid platform!')
                }
                
                //fetch pinned messages in channel
                generalChannel.messages.fetchPinned().then(pinned => {
                    //start the message
                    let placeCheck = '\n';
                    //for every pinned message
                    for (const pinnedMessage of pinned) {
                        //check if the message starts with New
                        if (pinnedMessage[1].content.startsWith('New')){
                            //log the message
                            console.log('The pinned message: ' + pinnedMessage[1])
                            //split to message args by space
                            let messageArgs = pinnedMessage[1].content.split(" ")
                            //get args 2 - @member
                            let MemberM = messageArgs[2];
                            //add to the message a new line and the member
                            placeCheck = placeCheck + `\n${MemberM}`
                        }                    
                    }

                    //add at the end of the message
                    placeCheck = placeCheck + `\n\n\nIF YOUR ON THIS LIST REACT FOR SETTLEMENT PLACEMENT!!!! if you don’t understand what that means go to <#580418795537956866> \nJust react to the message and you'll be placed soon! you may see a :ok_hand: added next to your name after doing so. \nif you've already reacted you're good and will be placed soon, if you're already placed please DM a KCM or Admin to get you removed from the list`;
                    //send the message
                    channel.send(placeCheck).then(message => {
                        //then react with okay hand
                        message.react('👌').then(messageReaction => {
                            messageReaction.message.react('👌').then(messageReaction =>{
                                message.awaitReactions
                                RedisClient.set(channel.id + 'PlaceCheck', message.id, redis.print);
                            })
                        })
                    })
                                    
                })
            }
            //run the command
            test();
        }
        //catch errors
        catch (err) {
            //log the error
            console.log('Error with place Check: ' + err);
        }
    }
}