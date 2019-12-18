const fcheck = require('../functions/check')
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);     //use client link in env file

module.exports = {

    async bump(message) {

        /**
         * checks for bump and sends message 120 min after
         * @param {object} message the message detected
         */

        try {
            //the fucntion that sends message when ready to bump
            function BumpTime(message) {        //waiting 120 until next bump
                //send a message bump can happen
                message.channel.send('Hey guys you can <@&635874075776122890> again!');     
            }

            //for evry embed of the message's embed
            for (let embed of message.embeds) {
    
                //function for the command
                async function bumpEmbed(){
    
                    //checks:
                    //check if a text channel
                    if (await fcheck.isText(message.channel) == 'false') return;
                    //checks if a specific server by id - WVR server
                    if (await fcheck.isServerId(message, '437056044796215298') == 'false') return;
                    //checks if specific channel - WVR bump channel;
                    if (await fcheck.isChannelId(message.channel, '578723637612511232') == 'false') return;
                    //checks if specific user - disboard bot
                    if (await fcheck.isAuthorId(message.author, '302050872383242240') == 'false') return;
    
                    //log the title of the embed
                    console.log(`description: ${embed.description}`)
                    
                    //if the description has 'done' the bump was made
                    if (embed.description.includes('done')) {
                        //say thanks
                        message.channel.send('Thanks!')
                        //run timeout to announce another bump
                        setTimeout(BumpTime, 120 * 60 * 1000, message)
                    }
                    //if the description has 'wait' the bump wasn't done yet
                    if (embed.description.includes('wait')) {
                        //say not yet
                        message.channel.send('Not yet!')
                    }
                }
                //run the function
                bumpEmbed();
            }
        }
        //catch error
        catch (err) {
            //log the error
            console.log('Error with bump: ' + err)
        }
    },

    async rpRandom(message) {

        /**
         * checks if WVR RP server and if RP channels then sends a random message once in 100 times
         * @param {object} message
         * @param {const} client the redis client
         */

        //try to run
        try {
            //check if a text channel
            if (await fcheck.isText(message.channel) == 'false') return;
            //checks if a specific server by id - WVR RP server
            if (await fcheck.isServerId(message, '537718961152851983') == 'false') return;

            //get a random number between 0 to 100
            let event = Math.floor(Math.random() * (+101 - +0)) + +0;

            //return if not 100
            if(event !== 100) return;

            //get the RP channel list for this server from redis
            client.get(message.channel.id+'WVRRPList', function(err, result ) {
                //throw error
                if(err) throw err;
                //return if no result
                if(!result) return;
                //return if result is null
                if(result == null) return;

                //log the result
                console.log(`Options for ${message.channel.id} are ${result}`);

                //split the options
                let options = result.split(",");
                //num = the number of options
                let num = options.length;
                //return a random number for the message
                let whatMessage = Math.floor(Math.random() * (+num - +0)) + 1;
                //split the options by name and message
                let messageArgs = options[whatMessage].split('@');

                //create a webhook in the channel with the name
                message.channel.createWebhook(messageArgs[0]).then(Webhook => {
                    //send the random message
                    Webhook.send(messageArgs[1]);

                    //delete the webhook
                    Webhook.delete();
                })

                //log the random event
                console.log(`random event in ${message.channel}: ${options[whatMessage]}`);
            })

        }
        //in case of an error
        catch (err) {
            //log the error
            console.log('Error with random rp events: ' + err);
        }
    }
}