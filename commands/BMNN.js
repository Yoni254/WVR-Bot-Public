const Discord = require('discord.js');      //discord bots
const fcheck = require('../functions/check');

module.exports = {      //discord command handler
    name: 'BMNN',
    description: "BMNN commands",
    execute(message, args, redis, client, bot)  {

        /**
         * BMNN Commands: announce, register, unregister, channelannounce, removechannelannounce
         * @param {object} message the command message
         * @param {array} args the message args, split by " "
         * @param {object} redis the redis client commands
         * @param {object} client the redis client
         * @param {object} bot the discord bot
         */

        async function BMNN(){

            //check if a bot
            if (await fcheck.isBot(message.author) == 'true') return console.log('bots can\'t use this command');
            //check if server
            if (await fcheck.isGuild(message) == 'false') return console.log('You need to be in a server to use this');

            //try to check if register command
            try {
                /**to register a radio station 
                 * args[1] = register
                 * args[2] = user ID
                 * args[3] = radio station name
                */
                if (args[1] === 'register' || args[1] == 'Register') {

                    //checks if a specific server by id [643628930787573760] - BMNN
                    if (await fcheck.isServerId(message, '643628930787573760') == 'false') return console.log('command is not for this server');

                    //check if user is admin if not send error message and delete
                    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('this commands are for admin only').then(msg => {
                        msg.delete(5000)
                    }).catch(err => {       //catch errors
                        console.log(`Unexpected error in deleting BMNN register not admin- ${err}`);
                    });

                    //local vars
                    let userid = args[2];
                    let stationName = args[3];

                    //store the vars
                    client.set(userid + 'RadioAnnounce', stationName, redis.print);

                    //send when finished
                    message.channel.send('Got it!');
                }
            }
            //catch errors
            catch (err) {
                //log errors
                console.log(`Error with BMNN register: ${err}`);
            }
            


            //try to chec if unregister command
            try {
                /**to unregister a radio station 
                 * args[1] = unregister
                 * args[2] = user ID
                */
                if (args[1] === 'unregister' || args[1] === 'Unregister') {     //unregister station command

                    //checks if a specific server by id [643628930787573760] - BMNN
                    if (await fcheck.isServerId(message, '643628930787573760') == 'false') return console.log('command is not for this server');

                    //check if user is admin if not send error message and delete
                    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('this commands are for admin only').then(msg => {
                        msg.delete(5000)
                    }).catch(err => {       //catch errors
                        console.log(`Unexpected error in deleting BMNN register not admin- ${err}`)
                    });
                    
                    //local vars
                    let userid = args[2];   //userid = args[2]

                    //get cashed data
                    client.get(userid+'RadioAnnounce', function (err, result) { 
                        //if error log it
                        if (err) return console.log(err);

                        //log the action
                        console.log(userid+" "+result+" was unregistered");

                        //recash with removed tag
                        client.set(userid+'RadioAnnounce', 'Removed', redis.print);        

                        //send when done
                        message.channel.send(`The station ${result} owned by ${userid} is now removed`); 
                    })
                }
            }
            //catch errors
            catch (err) {
                //log the error
                console.log(`Error with BMNN unregister ${err}`)
            }



            //check if announce command
            try {
                /**
                 * to announce a new story
                 * args[1] = announce
                 * args[2]+ = message (optional)
                 */
                if (args[1] === 'Announce' || args[1] == 'announce') {      //announce command
                    
                    //checks if a specific server by id [643628930787573760] - BMNN
                    if (await fcheck.isServerId(message, '643628930787573760') == 'false') return console.log('command is not for this server');

                    //get the cashed data
                    client.get(message.member.id + 'RadioAnnounce', function (err, StationName) {
                        //log error
                        if (err) return console.log(`Error getting data in BMNN Announce ${err}`);

                        //if no station or station has removed tag
                        if (!StationName || StationName == null) return message.channel.send('Error, please talk to an admin to Register');
                        if (StationName === 'Removed') return message.channel.send('It looks like your station was unregistered');

                        //get channel list ([server.name]@[channel.id],[server.name]@[channel.id],etc)
                        client.get('BMNNChannelList', function (err, channels) {  
                            //log errors      
                            if (err) return console.log(`Error getting BMNN channel list ${err}`);
                            //if no channels found
                            if (!channels) return message.channel.send('Error');

                            //split by ',' to an array
                            var channelList = channels.split(",");

                            //for every channel stored
                            for (var i = 1; i < channelList.length; ++i) {
                                //if channel not removed
                                if (channelList[i] !== 'Removed') {

                                    //log the channel
                                    console.log(channelList[i])

                                    //split by "@" to an array
                                    let ServerChannel = channelList[i].split("@")

                                    //get the channel
                                    bot.channels.get(ServerChannel[1]).createWebhook('BMNN Radio Notifications', {avatar: 'https://i.imgur.com/FmoTWto.png'}).then(Webhook => {       //get the channel and ceate a webhook
                                        if (ServerChannel[0] == 'Black Mountain News Network') {        
                                            //if it's bmnn server
                                            Webhook.send(`Hello <@&644256404806303744>! \n${StationName} has posted a new Story Make sure you go and check it out! \n\n ${message.content.slice(15)}`).then(msg => {
                                                Webhook.delete()
                                            }).catch(err => {
                                                //log errors
                                                console.log(`Error with Sending a webhook: ${err}`)
                                            })
                                        } else {
                                            Webhook.send(`Hello Everyone! \n${StationName} has posted a new Story Make sure you go and check it out! \n\n${message.content.slice(15)}`).then(msg => {
                                                Webhook.delete()
                                            }).catch(err => {
                                                //log errors
                                                console.log(`Error with Sending a webhook: ${err}`)
                                            })
                                        }
                                    }).catch(err => {
                                        //log errors
                                        console.log(`Error with Creating a webhook: ${err}`)
                                    })
                                }
                            }
                        })
                    })
                }
            }
            //catch errors
            catch (err) {
                //log the error
                console.log(`Error with BMNN Announce: ${err}`);
            }



            //try to check AnnounceChannel commands
            try {
                /**
                 * adds a channel to announce BMNN updates in
                 * args[1] = announcechannel
                 * args[2] = channel id
                 */
                if (args[1] === 'AnnounceChannel' || args[1] === 'announcechannel' || args[1] === 'Announcechannel') {

                    //checks for admin if not sends error message
                    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('this commands are for admin only').then(msg => {
                        msg.delete(5000);
                    }).catch(err => {       //catch errors
                        console.log(`Unexpected error in deleting BMNN Announce channel not admin- ${err}`);
                    });

                    //get cashed channel list
                    client.get('BMNNChannelList', function (err, result) {
                        //log errors
                        if (err) return console.log(`Error with getting channel list ${err}`);

                        //add the new channel to the result
                        let nameList = result + "," + message.guild + "@" + args[2];

                        //resave
                        client.set('BMNNChannelList', nameList, redis.print);

                        //when finished
                        message.channel.send('Got it!');
                    })
                }
            }
            //catch errors
            catch (err) {
                //log error
                console.log(`Error running Announce Channel command- ${err}`)
            }
            


            //try to run remove announce command
            try {
                /**
                 * Removes a channel from the list for announcement
                 * args[1] = removeannounce
                 * args[2] == channel id
                 */
                if (args[1] === 'RemoveAnnounce' || args[1] === 'removeannounce' || args[1] === 'Removeannounce') {

                    //Checks for admin if not sends a message then deletes
                    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('this commands are for admin only').then(msg => {
                        msg.delete(5000);
                    }).catch(err => {       //catch errors
                        console.log(`Unexpected error in deleting BMNN Announce channel not admin- ${err}`);
                    });

                    //gets list from database
                    client.get('BMNNChannelList', function (err, result) {
                        //log errors
                        if (err) console.log(`Error getting database for Channel List: ${err}`);
                        console.log(result);        //log results

                        let channels = result.split(",")        //split the channels 
                        for (var i = 0; i < channels.length; ++i) {     //for number of channels
                            if (channels[i] == null || !channels[i]) console.log('Error')       //if no channel 

                            let channelID = channels[i].split("@")      //split by server name and channel.id
                            if (args[2] == channelID[1]) {      //if id mathes removel id
                                channels[i] = 'Removed'     //replace with removed
                            }
                        }
                        console.log(channels.join())        //log the result
                        client.set('BMNNChannelList', channels.join(), redis.print)     //cash the new list
                    })
                }
            }
            //catch errors
            catch (err) {
                //log error
                console.log(`Error with Remove Announce: ${err}`);
            }
        }
            

        //run
        BMNN();

    }
}