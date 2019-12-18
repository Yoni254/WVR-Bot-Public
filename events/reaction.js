const Discord = require('discord.js');      //Discord 

module.exports = {

    async activityCheck(messageReaction, user, client, bot) {

        try {
            client.get(messageReaction.message.channel.id + 'ActivityCheck', function(err, result) {
                if (err) throw err;
                if (!result) return;
                if (result == null) return;
                
                //split to args
                let args = result.split(',');
                let activityCheckId = args[0];
                let logMessage = args[1]
                let logsChannel = bot.channels.get('650725555561562113');

                if (activityCheckId != messageReaction.message.id) return;
                logsChannel.messages.fetch(logMessage).then(logMSG => {
                    let messageArgs = logMSG.content.split('\n');
                    for (let i = 0; i < messageArgs.length; ++i) {
                        if (messageArgs[i] === `<@${user.id}>`) {
                            console.log('Found you!')
                            messageArgs[i] = `${ messageArgs[i]} 👌`
                        }
                    }
                    logMSG.edit(messageArgs.join('\n'))
                    
                })

            })
        }
        //catch errors
        catch (err) {
            //log
            console.log('Error with activity check reaction: ' + err)
        }
        

    },

    async PlaceCheck(messageReaction, user, client, bot) {

        try {
            client.get(messageReaction.message.channel.id + 'PlaceCheck', function(err, result) {
                if (err) throw err;
                if (!result) return;
                if (result == null) return;
                
                //split to args
                let logMessage = result
                let logsChannel = messageReaction.message.channel;

                if (logMessage != messageReaction.message.id) return;
                console.log('Got it!')
                logsChannel.messages.fetch(logMessage).then(logMSG => {
                    let messageArgs = logMSG.content.split('\n');
                    for (let i = 0; i < messageArgs.length; ++i) {
                        if (messageArgs[i] === `<@${user.id}>`) {
                            console.log('Found you!')
                            messageArgs[i] = `${messageArgs[i]} 👌`
                        }
                    }
                    logMSG.edit(messageArgs.join('\n'))
                    
                })

            })
        }
        //catch errors
        catch (err) {
            //log
            console.log('Error with activity check reaction: ' + err)
        }
    }

}
