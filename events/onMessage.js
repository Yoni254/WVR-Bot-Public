const fcheck = require('../functions/check')
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);     //use client link in env file
const wait = require('util').promisify(setTimeout);     //wait x time function

module.exports = {

    /**
     * checks for bump and sends message 120 min after
     * @param {object} message the message detected
     */
    async bump(message) {
        

        try {
            /**the fucntion that sends message when ready to bump */
            async function BumpTime(message) {
                //send a message bump can happen
                message.channel.createWebhook('effie trinket', {avatar: 'https://i.imgur.com/NBD4Lff.jpg'}).then(Webhook => {
                    Webhook.send('Let the games..... BEGIN!')
                    function time() {
                        Webhook.send('YOU CAN <@&635874075776122890> GO GO GO!').then(msg => {
                            Webhook.delete()
                        })
                    }
                    function ten() {
                        Webhook.send('10!')
                    }
                    function thirty() {
                        Webhook.send('30!')
                    }
                    setTimeout(time, 59000)
                    setTimeout(thirty, 29000)
                    setTimeout(ten, 49000) 
                    
                })

                let bumper = message.guild.roles.find(r => r.name === 'Bumper')
                let LastBumpers = bumper.members.map(m => m.user)
                
                LastBumpers.forEach(user => {
                    try {
                        let mem = message.guild.members.get(user.id)
                        mem.roles.remove(bumper);
                        console.log('Removed Role from: ' + mem);
                    }
                    catch (err) {
                        console.log('Error Removing Role: ' + err);
                        
                    }
                    
                });
                  
            }

            //for evry embed of the message's embed 
            for (let embed of message.embeds) {
    
                //function for the command
                async function bumpEmbed(){
    
                    //checks:
                    //check if a text channel
                    if (!await fcheck.isText(message.channel)) return;
                    //checks if a specific server by id - WVR server
                    if (!await fcheck.isServerId(message, '437056044796215298')) return;
                    //checks if specific channel - WVR bump channel;
                    if (!await fcheck.isChannelId(message.channel, '578723637612511232')) return;
                    //checks if specific user - disboard bot
                    if (!await fcheck.isAuthorId(message.author, '302050872383242240')) return;
    
                    //log the title of the embed
                    console.log(`description: ${embed.description}`)
                    
                    
                    //if the description has 'done' the bump was made
                    try {
                        if (embed.description.includes('done')) {
 
                            setTimeout(BumpTime, 119 * 60 * 1000, message);
    
                            embedArgs = embed.description.split(',')
                            console.log(embedArgs[0].slice(2, -1));
                            let memberBumped = await message.guild.members.fetch(embedArgs[0].slice(2, -1))
                            console.log(memberBumped);
                            /** @param {Object} bumper the bumper role*/
                            let bumper = await message.guild.roles.find(r => r.id == '658031453631676446')
    
                            memberBumped.roles.add(bumper);
    
                            message.channel.createWebhook('effie trinket', {avatar: 'https://i.imgur.com/NBD4Lff.jpg'}).then(Webhook => {
                                Webhook.send(`And Our Winner this time is ${memberBumped}! S/he was given the Bumper Role!`).then(msg => {
                                    Webhook.delete()
                                })
                            })
                            
                            
                        }
                        //if the description has 'wait' the bump wasn't done yet
                        if (embed.description.includes('wait')) {
                            //say not yet
                            message.channel.send('Sike!')
                        }
                    }
                    catch (err) {
                        console.log("Catched Error in onMessage");
                        
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
            if (!fcheck.isText(message.channel)) return;
            //checks if a specific server by id - WVR RP server
            if (!fcheck.isServerId(message, '537718961152851983')) return;

            //get a random number between 0 to 50
            let event = Math.floor(Math.random() * (+51 - +0)) + +0;

            //return if not 50
            if(event !== 50) return;

            //get the RP channel list for this server from redis
            RedisClient.get(message.channel.id+'WVRRPList', function(err, result ) {
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
                    Webhook.send(messageArgs[1]).then(msg => {
                        //delete the webhook
                        Webhook.delete();
                    })                  
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
    },


    /**
     * Check for mass pings
     * @param message the message sent
     */
    async massPing(message) {
        try {
            if (message.content.includes('<@493099158526361600>') && message.content.includes('<@&493178960847306780>') && message.content.includes('<@&493178919512571914>')
                || message.content.includes('<@509814674242666496>') && message.content.includes('<@&509814509922418698>') && message.content.includes('<@&532342285250068493>') && message.content.includes('<@&509814569573548042>')) {
                isLeader = false
                LeaderRoles.forEach(leaderRole => {
                    if (message.member.roles.has(leaderRole)) {
                        isLeader = true
                    }
                })
                console.log(isLeader);


                if (!isLeader) {

                    message.channel.send("You're not allowed to mass ping! \nThree Strikes and you're out!")

                    times = 0

                    function thirdTime() {
                        message.channel.send("Woops! looks like you've done this to many times ¯\_(ツ)_/¯")
                        roles = ""
                        message.member.roles.forEach(role => {
                            if(role.name == '@everyone') return
                            message.member.roles.remove(role)
                            roles += role.name + ", "
                        })
                        muted = message.guild.roles.find(r => r.id == '558433513590751232')
                        message.member.roles.add(muted)
                        timeOut = message.guild.channels.find(c => c.name == "time-out")
                        timeOut.send(`User <@${message.member.id}> has been muted for mass ping. \nRoles: ${roles}`)
                    }


                    function sendBack() {
                        console.log("Current times: " + times)
                        client.set("Mass Ping Times: " + message.author.id, times + 1, redis.print)

                        if (times + 1 >= 3) {
                            thirdTime()
                        }
                    }


                    RedisClient.get("Mass Ping Times: " + message.author.id, function (err, result) {
                        //Throw errors
                        if (err)
                            throw err;
                        console.log("Result: " + result);
                        if (!result || result == null) {
                            console.log("First Time");
                        }
                        else {
                            times = parseInt(result);
                        }
                        sendBack()
                    })
    
                }
                
                
            }
        }
        catch (err) {
            console.log(err);
        }
    },


}