/*
=====================================================
Importing Files Section

=====================================================
*/

const Discord = require('discord.js');      //Discord
const fs = require('fs');       //fs
const readline = require('readline');   //Google
const {google} = require('googleapis');
const redis = require('redis');       //Redis
const util = require('util');
const http = require('http');
require('dotenv/config');
//Fucntions
const fcheck = require('./functions/check');
const fGoogle = require('./functions/google');
const fCache = require('./functions/cache')
//events
const eMessage = require('./events/onMessage');
const eMemberUpdate = require('./events/onMemberUpdate');
const eGuildMember = require('./events/guildMember');
const eReaction = require('./events/reaction')


fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log(`Error loading Google API client files: ${err}`);
    fGoogle.authorize(JSON.parse(content), fGoogle.printDocTitle);
    
})

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL'] });
const redisClient = redis.createClient(process.env.REDIS_URL);     //use client link in env file


/*
=====================================================
Varuables to use in other files

=====================================================
*/


module.exports = {
    /**
     * @param LeaderRoles WVR Leadership roles
     */
    const : LeaderRoles = [
        
        '530096928508084224', /* President of the WVR */
        '536052149650587648', /* General of the WVR*/
        '591709645824065570', /* Right Hand */
        '591709878805069841', /* Left Hand*/ 
        '494531115768610816', /* PS KCM */
        '493463288223629312', /* Xbox KCM*/
        '493800875618336779', /* PC KCM*/
        '562020358065225728', /* KCME */
        '615041600992837662', /* Platform Director*/
        '518977167665922060', /* Director Of Civilian Affairs */
        '518977004067094528', /* Director Of Military Affairs */
        '581106776959614976', /* Director Of Treasury */
        '488440179871449138', /* Major PS4*/
        '488440251824734218', /* Governors- PS4 */
        '493801268779810817', /* Major- Xbox */
        '493801161569075201', /* Governors- Xbox */
        '493801400661180448', /* Major- PC */
        '493801323792302097', /* Governors- PC */

    ],

    const : Version = '1.8.0.1',      //client version
    const : PREFIX = "+",
    /**
     * @param Client The bot
     */
    const : Client = client,
    /**
     * @param RedisClient the redis database client
     */
    const : RedisClient = redisClient,
    const : Redis = redis
}


/*
=====================================================
Local Varubles

=====================================================
*/

const token = process.env.TOKEN;    //new const token taken from env file

const port = process.env.PORT;      //new const to port to heroku
http.createServer().listen(port);       //creates a heroku server

//port : 6379


client.commands = new Discord.Collection()     //discord command handler

const commandfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));        //commandfiles look for commands folder
for (const file of commandfiles) {          //for number of files on commandfiles folder
    const command = require(`./commands/${file}`);      //const command is in commands under ${file name}
    client.commands.set(command.name, command);        //look for commands by name
}

const invites = {};     //invite const

const wait = require('util').promisify(setTimeout);     //wait x time function


/*
=====================================================
Website

=====================================================
*/



/*
=====================================================
Local Functions

=====================================================
*/


function hookEvent(client, redisClient) {       //random Webhook event fucntion
    client.commands.get('HookEvent').execute(client, redisClient);     //sends to hookevent.js
}

function lookForInvites() {
    wait(1000);     //wait 1 sec
    client.guilds.forEach(g => {       //for each guild 
        g.fetchInvites().then(guildInvites => {     //fetch invites
            invites[g.id] = guildInvites;
            console.log('Invites Found')        //log when finished
        })
    })
}

/*
=====================================================
Simple Starter Actions

i.e Bot is Up message, Joining a new server, RedisClient ready

=====================================================
*/


client.on('ready', () => {     //when starting client
    client.user.setActivity("You", { type: "WATCHING" })       //watching you activity
    console.log('bot is on');       //log client is on
    console.log("2" - - "2");

    lookForInvites();       //start invite function

    // Cache report here.

    setTimeout(hookEvent, 60000, client, redisClient);      //start webhook events function in 6 sec

})

client.on('guildCreate', () => {       //when joining a new server
    lookForInvites();       //look for invites
})

redisClient.on('ready', () => {      //when redis is ready
    console.log('Redis ready')      //log redis is ready
})



/*
=====================================================
Guild Member Updates

I.e Member Join/Leave/Ban, Member Updates
Handled by './events/guildMember.js' and './events/onMemberUpdate.js'

=====================================================
*/


client.on('guildMemberAdd', (member, guild) => {         //Member joining

    member.guild.fetchInvites().then(guildInvites => {      //fetch invites in the guild
       eGuildMember.memberJoin(member, guild, redisClient, invites, guildInvites, client);
    })
})

client.on('guildMemberRemove', async member => {          //Member leaving
    eGuildMember.memberLeave(member, client);
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log(`Error loading Google API client files: ${err}`);
        fGoogle.AuthorizeRemovel(JSON.parse(content), fGoogle.removeMember, member.user.discriminator);
    })
})

client.on('guildBanAdd', async (guild, user) => {         //Member ban
    eGuildMember.memberBanned(guild, user);        //go to banned.js
})

client.on('guildMemberUpdate', async (oldMember, newMember) => {     //when member is updated
    //nickname ban 
    eMemberUpdate.bannedNickname(oldMember, newMember);
})


/*
=====================================================
Reactions Added

Handled by './events/reaction.js'

=====================================================
*/

client.on('messageReactionAdd', async (messageReaction, user) => {
    if (messageReaction.message.partial){
        try {
            await messageReaction.message.fetch();
        }
        catch (err) {
            console.log('Error: ' + err)
        }
    } 
    eReaction.activityCheck(messageReaction, user, redisClient, client)
    eReaction.PlaceCheck(messageReaction, user, redisClient, client)
})

/*
Channel movment test
*/
client.on('channelUpdate', async (oldChannel, newChannel) => {
    if (oldChannel.rawPosition != newChannel.rawPosition) {
        let LogChannel = newChannel.guild.channels.find(channel => channel.name === "bot-commands");
        LogChannel.send("Channel position for "+newChannel.name+" was changed!");
    }
})


/*
=====================================================
On Message sent events

Includes Checks from './events/onMessage.js'
And Files uses Files from './commands'

=====================================================
*/


client.on('message', async message => {      //when a message is sent

    let msg = message.content.toUpperCase();        //msg ignores cases
    let args = message.content.slice(PREFIX.length).split(" ");     //split args by " "

    // Check for bump
    eMessage.bump(message);
    // Check for random RP event
    eMessage.rpRandom(message)
    // Check for mass pings
    eMessage.massPing(message)
    // Cache Message
    if (await fcheck.isGuild(message)) {
        fCache.storeMessage(message)
    }
        

    /* Review channel */
    if (message.channel.id == '702262428561571982') {
        var role = message.guild.roles.find(r => r.name === 'Sent Reivew');
        message.member.roles.add(role)
    }

    /*
    =====================================================
    Bot Commands Section
    
    =====================================================
    */



    /*
    =====================================================
    Information Commands
    List:
    ◉ Help (Admin) - Help Menu for list of commands
    ◉ Channel Id/Info - Display info about the channel
    ◉ WVR Server/Instagram - Send Links to WVR Server / Instgram
    ◉ Version - Bot Version
    ◉ Server - Server Info
    ◉ Joined - Display When user Joined a Server
    ◉ Id - Sends ID of the message above
    ◉ Whois - Info about user

    =====================================================
    */


    if (msg.startsWith(PREFIX + 'HELP')) {       //help command 
        client.commands.get('Help').execute(message, args);       //go to help.js
    }

    if (msg.startsWith(PREFIX + 'CHANNEL')) {         //channel commands
        if (await fcheck.isBot(message.author)) return
        client.commands.get('Channel').execute(message, args);     //go to channel.js
    }

    if (msg.startsWith(PREFIX + 'WVR ')) {       //wvr links commands
        if (await fcheck.isBot(message.author)) return
        client.commands.get('WVR').execute(message, args);     //go to wvr.js
    }

    if (msg.startsWith(PREFIX + 'VERSION')) {       //Version command
        if (await fcheck.isBot(message.author)) return
        message.channel.send(Version);      //send version const
    }

    if (msg.startsWith(PREFIX + 'SERVER')) {            //server info command
        if (await fcheck.isBot(message.author)) return
        client.commands.get('Server').execute(message, args);      //go to server.js
    }

    if (msg.startsWith(PREFIX + 'JOINED')) {        //joined command (date)
        if (await fcheck.isBot(message.author)) return
        if (!await fcheck.isGuild(message)) return
        client.commands.get('Joined').execute(message, args);      //go to joined.js
    }

    if (msg.startsWith(PREFIX + 'ID')) {
        if (await fcheck.isBot(message.author)) return
        message.channel.messages.fetch({limit: 2}).then(m => {
            m.forEach(ms => {
                if (ms.id == message.id) return;
                message.channel.send(ms.id)
            })
        })
    }

    if (msg.startsWith(PREFIX + "WHOIS")) {
        if (await fcheck.isBot(message.author)) return
        client.commands.get('Whois').execute(message, args)
    }


    
    /*
    =====================================================
    Fun / Misc Commands 
    List: 
    ◉ Say - Send Message as Bot
    ◉ SayAs - Send a Message from Webhook that looks like Mentioned User

    =====================================================
    */


    if (msg.startsWith(PREFIX + 'SAY ')) {         //say command
        if (await fcheck.isBot(message.author)) return
        client.commands.get('Say').execute(message, args);     //go to say.js
    }

    if (msg.startsWith(PREFIX + 'SAYAS')) {             //say as command
        if (message.author.bot) return;
        client.commands.get('Say As').execute(message, args, client)
    }



    /*
    =====================================================
    WVR Specific Commands
    List:
    ◉ Place / P (KCMs) - Places User in the server
    ◉ PlaceCheck (Admin) - Sends List in Platform Announcement Chats of new Members for Settlement Placement
    ◉ ActivityCheck (Leadership) - Sends message in log channel and track activity check Status for Settlements 
    ◉ Settlement - Sends Information about Role. Includes Governor / Major / Soldiers / Medics / Scavengers / Engineers / Directors and up
    ◉ Get Settlement (Leadership) - Sends List of Members in Settlement from Records
    ◉ Get SettlementList - Sends List of all WVR Settlements From Records
    ◉ Remove Member (KCMs) - Removes Mentioned Member from Records 
    ◉ Get Changes (Admin) - List Of changes needed in records for Mentioned Settlement
    ◉ Leadership - Sends List of all Roles that the Bot counts as WVR Leadership
    ◉ Ticket - Send anonymous support ticket to mental health

    =====================================================
    */


    if (msg.startsWith(PREFIX + 'PLACE ') || msg.startsWith(PREFIX + 'P ')) {       //place command
        //run the command
        try {
            //the fucntion for the command
            async function place() {
                //check if a text channel
                if (!await fcheck.isText(message.channel)) return console.log('Not in a text channel');
                //check if a bot
                if (await fcheck.isBot(message.author)) return message.channel.send('bots can\'t use this command');
                //checks if a specific server by id
                if (!await fcheck.isServerId(message, '437056044796215298')) return message.channel.send('command is not for this server');


                client.commands.get('Place').execute(message, args);      //go to place.js
            }

            //run the function
            place();
        }
        //catch any errors
        catch (err) {
            //log the error
            console.log('Error place command: ' + err);
        }

    }

    if (msg.startsWith(PREFIX + 'PLACECHECK')) {     //placement check
        if (!await fcheck.isServerId(message, '437056044796215298')) return
        client.commands.get('Place Check').execute(message, args, redis);
    }

    if (msg.startsWith(PREFIX + 'ACTIVITYCHECK')) {
        if (!await fcheck.isServerId(message, '437056044796215298')) return
        console.log('Running')
        client.commands.get('Activity Check').execute(message, args, redis);
    }
 
    if (msg.startsWith(PREFIX + 'SETTLEMENT')) {
        if (!await fcheck.isServerId(message, '437056044796215298')) return
        client.commands.get('Settlement').execute(message, args)
    }

    if (msg.startsWith(PREFIX + 'GET SETTLEMENT ')) {
        if (!await fcheck.isServerId(message, '437056044796215298')) return;
        if (!await fcheck.isWVRLeadership(message)) return message.channel.send('Leadership only!');

        fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log(`Error loading Google API client files: ${err}`);
            fGoogle.settlementAuthorize(JSON.parse(content), fGoogle.getSettlement, message, args);
        })
    }

    if (msg.startsWith(PREFIX + 'GET SETTLEMENTLIST')) {
        if (!await fcheck.isServerId(message, '437056044796215298')) return;

        fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log(`Error loading Google API client files: ${err}`);
            fGoogle.settlementAuthorize(JSON.parse(content), fGoogle.getSettlementList, message, args);
        })
    }

    if (msg.startsWith(PREFIX + 'REMOVE MEMBER')) {
        if (!await fcheck.isServerId(message, '437056044796215298')) return;
        if (!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send("No cant do!")
        fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log(`Error loading Google API client files: ${err}`);
            if (!message.mentions.users.first()) return message.channel.send('Missing @user')
            user = message.mentions.users.first().discriminator
            fGoogle.AuthorizeRemovel(JSON.parse(content), fGoogle.removeMember, user);
            message.channel.send('Got it! (I hope)')
        })
    }

    if (msg.startsWith(PREFIX + 'GET CHANGES')) {
        if (!await fcheck.isServerId(message, '437056044796215298')) return
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send("No cant do!")

        fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log(`Error loading Google API client files: ${err}`);
            fGoogle.AuthotizeCheckChanges(JSON.parse(content), fGoogle.getChanges, message, args);
        })
    }

    if(msg.startsWith(PREFIX + 'LEADERSHIP')) {
        if (!await fcheck.isServerId(message, '437056044796215298')) return
        txt = ""
        LeaderRoles.forEach(roleId => {
            let role = message.guild.roles.find(role => role.id === roleId);
            txt = txt + role.name + ", "
        })
        message.channel.send(txt)
        
    }

    if (msg.startsWith(PREFIX + 'TICKET')) {
        let content = message.content.slice(8)
        if (message.mentions.roles.first() || message.mentions.users.first() || message.mentions.everyone || message.content.includes('@everyone') || message.content.includes('@here') || message.content.includes('@')) {
            message.channel.send("You can't send a ticket with @ in it due to security reasons.")
        } else {
            console.log(content);

            let RecruitRole = '550014342632833049'
            let WVRServer = '437056044796215298'

            let GuildMember = Client.guilds.get(WVRServer).members.get(message.author.id)

            if (GuildMember.roles.has(RecruitRole)) {
                message.channel.send("This Command is not for recruits")
            } else {

                RedisClient.get(WVRServer+' Ticket Channel', function(err, result) {
                    if (err) console.log(err);
                    
                    let channel = Client.guilds.get(WVRServer).channels.get(result)
                    channel.createWebhook("Anonymous",).then(Webhook => {
                        Webhook.send(content + "\n <@&685991815165247498> - Support Ticket").then(msg => {
                            Webhook.delete()

                            message.channel.send("Ticket Sent")

                        })
                    })

                })
            }
        }        
    }

    /* WVR RolePlay Commands */
    if (msg.startsWith(PREFIX + 'WVRRP')) {
        if (await fcheck.isBot(message.author)) return
        if (!await fcheck.isServerId(message, '537718961152851983')) return;      //check if wvr rp server
        client.commands.get('WVR RP').execute(message, args, redis);
    }



    /*
    =====================================================
    Functional / Fun Commands 
    List:
    ◉ Poll - Creates a Poll
    ◉ Hangman - Starts a hangman game
    ◉ ConnectFour - A simple game of connect four

    =====================================================
    */


    if (msg.startsWith(PREFIX + 'POLL')) {      //poll command
        if (await fcheck.isBot(message.author)) return
        client.commands.get('Poll').execute(message, args);        //go to poll.js
    }

    if (msg.startsWith(PREFIX + 'HANGMAN')) {
        if (await fcheck.isBot(message.author)) return
        client.commands.get('Hangman').execute(message, args);        //go to poll.js
    }

    if (msg.startsWith(PREFIX + 'CONNECTFOUR')) {
        if (await fcheck.isBot(message.author)) return
        client.commands.get('ConnectFour').execute(message, args);        //go to poll.js
    }



    /*
    =====================================================
    Admin Commands
    List:
    ◉ Set - Sets Some Default Settings
    ◉ Reset Strikes - Reset user Mass Ping Strikes

    =====================================================
    */

    if (msg.startsWith(PREFIX + 'SET')) {       //set commands
        if (await fcheck.isBot(message.author)) return
        if (!await fcheck.isGuild(message)) return
        client.commands.get('Set').execute(message, args, redis);      //go to set.js
    }

    if(msg.startsWith(PREFIX + 'RESET STRIKES')) {
        try {
            if(!message.member.hasPermission("ADMINISTRATOR")) return
            member = message.mentions.members.first();
            redisClient.set("Mass Ping Times: " + member.id, 0, redis.print)
            message.channel.send("Done!")
        }
        catch {

        }
    }



    /*
    =====================================================
    Debug Commands
    List:
    ◉ New - Pins The New Member Messages
    ◉ Get File - Logs into Google Docs File (WVR Records)
    ◉ Bump - Reset Bump Roles
    ◉ CheckTest - Tests the Check Functions
    ◉ BeforeMe - Lists members that joined before
    ◉ Check Cache - Logs every user's last message
    ◉ Report Logs - Logs all the last messages of members
    ◉ Scan - scan for pings


    Games ideas - battleship, tic tac toe, snakes, wordsearch, lottery (talez), emoji memory game, simon

    =====================================================
    */
    

    if (msg.startsWith('NEW')) {        //pins message when bot sends new @member 
        //try to use the command
        try {
            //the command function
            async function placePin(){
                //checks if specific user
                if (!await fcheck.isAuthorId(message.author, '627222236499017738')) return;

                /** checks if specific channel 
                 * [533532176159997952] - ps general
                 * [493444814717845504] - xbox general
                 * [493436428911378442] - pc general
                */
                if (await fcheck.isChannelId(message.channel, '493444814717845504') || await fcheck.isChannelId(message.channel, '533532176159997952') || await fcheck.isChannelId(message.channel, '493436428911378442')) {
                    //pin the message
                    message.pin();
                }
            }
            //run the function
            placePin();  
        }
        //catch any errors
        catch (err) {
            //log the error
            console.log('Error in pin placement: ' + err)
        }
        
    }

    if (msg.startsWith(PREFIX + 'GET FILE')) {
        if (!await fcheck.isDev(message.author, client)) return;

        fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log(`Error loading Google API client files: ${err}`);
            fGoogle.authorize(JSON.parse(content), fGoogle.getDocContent);
        })
    }
    
    if (msg.startsWith(PREFIX + 'BUMP')) {
        if (!await fcheck.isDev(message.author)) return;
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

    if (msg.startsWith(PREFIX + 'CHECKTEST')) {      //Save server preset
        async function test() {
            //check if a text channel
            if (!await fcheck.isText(message.channel)) return console.log('Not in a text channel');
            //check if a bot
            if (await fcheck.isBot(message.author)) return console.log('bots can\'t use this command');
            //check if a dev
            if (!await fcheck.isDev(message.author)) return console.log('This command is for dev onle');
            //check if server
            if (!await fcheck.isGuild(message)) return console.log('You need to be in a server to use this');
            //checks if a specific server by id
            if (!await fcheck.isServerId(message, '437056044796215298')) return console.log('command is not for this server');
            //checks if specific user
            if (!await fcheck.isAuthorId(message.author, '430423068423225347')) return console.log('User not allowed to use this');
            //checks if specific channel
            if (!await fcheck.isChannelId(message.channel, '502915492894474240')) return console.log('command is not for this channel');


            console.log('Yes')
        }
        //run the command
        test();
    }

    if (msg.startsWith(PREFIX + 'BEFOREME')) {
        if (!await fcheck.isDev(message.author)) return;
        let d = message.member.joinedAt
        JoinPosition = 1
        list = ""
        message.guild.members.forEach(GuildMember => {
            let memberDate = GuildMember.joinedAt
            if (memberDate.getFullYear() < d.getFullYear()) {
                JoinPosition += 1
                list = list + GuildMember.displayName + "\n"
            } else if (memberDate.getFullYear() == d.getFullYear() && memberDate.getMonth()+1 < d.getMonth()+1) {
                JoinPosition += 1
                list = list + GuildMember.displayName + "\n"
            } else if (memberDate.getFullYear() == d.getFullYear() && memberDate.getMonth()+1 == d.getMonth()+1 && memberDate.getDate() < d.getDate()) {
                JoinPosition += 1
                list = list + GuildMember.displayName + "\n"
            }

        });
        message.channel.send(list)
    }

    if (msg.startsWith(PREFIX + 'CHECK CACHE')) {
        if (!await fcheck.isDev(message.author)) return
        member = message.mentions.members.first()
        if (!member) {
            member = message.member
        }
        redisClient.get("Last Message "+member.id, function(err, result)  {
            if (err) console.log(err);
            message.channel.send(result)
            
        })
    }

    if (msg.startsWith(PREFIX + 'REPORT LOGS')) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return
        console.log("running report logs");
        
        var today = new Date()
        var list = [""]
        let i = 0
        var count = 0
        async function getList() {
            let index = 0
            var bar = new Promise((resolve, reject) => {
                message.guild.members.filter(member => !member.user.bot && !member.roles.has('512290906586480671') && !member.roles.has('508039597637238814')).forEach((member) => {
                    redisClient.get("Last Message "+member.id, async function(err, result)  {
                        if (err) console.log(err);
                        if (!result) {
                            //console.log("No result for " + member.user.tag + " | " + member.id);
                            if (list[i].length > 1900) {
                                i++
                                list.push("")
                            }
                            list[i] = list[i] + `${member.user.tag}: Inactive No known messages\n`
                            index++
                            count++
                            return
                        }
                        //console.log("Going over member: " + member.user.tag + " | " + member.id);
                        
                        pass = true
                        result = result.split(',')
                        date = result[1].split('/')
                        
                        if (parseInt(date[2]) < today.getFullYear()) {
                            pass = false
                        } else if (parseInt(date[2]) == today.getFullYear() && parseInt(date[1])+1 < today.getMonth()+1 && parseInt(date[0]) - today.getDate() < 17) {
                            pass = false
                        } else if (parseInt(date[2]) == today.getFullYear() && parseInt(date[1])+1 == today.getMonth()+1 &&  today.getDate() - parseInt(date[0]) > 14) {
                            pass = false
                        }
        
                        if (!pass) {
                            if (list[i].length > 1900) {
                                i++
                                list.push("")
                            }
                            console.log(`${member.user.tag}: is inactive. last message sent on ${date[0]+"/"+(parseInt(date[1])+1)+"/"+date[2]}`);
                            
                            list[i] = list[i] + `${member.user.tag}: Inactive. last message - ${date[0]+"/"+(parseInt(date[1])+1)+"/"+date[2]}\n`
                            count++
                        } 
                        index++
                        if (index == message.guild.members.filter(member => !member.user.bot && !member.roles.has('512290906586480671') && !member.roles.has('508039597637238814')).size) {
                            resolve()
                        }
                    })
                })
            })
            bar.then(() => {
                //console.log("Inside function : " + list.join("\n"));
                for (listPart in list) {
                    message.channel.send(list[listPart])
                }
                message.channel.send("Total cont: " + count)
                console.log(count);
                
            });
            
        }

        await getList()

        
        
    }

    if (msg.startsWith(PREFIX + 'SCAN')) {       
        if (message.mentions.roles.first() || message.mentions.users.first() || message.mentions.everyone || message.content.includes('@everyone') || message.content.includes('@here')) {
            console.log("Found Mention"); 
        }
    }



    /*
    =====================================================
    Special / Fun Commands
    (Dev Only)
    List: 
    ◉ April Fools - Fake Leave Message for Mentioned Member
    ◉ Find - Find Users Joined in Specific Date | Note To self - Make Into Information Command (Done)
    ◉ Ah Yes - FitMC Meme
    ◉ MC - Same as '+Say' but with Galactic Alphabet

    =====================================================
    */


    if(msg.startsWith(PREFIX + "APRIL FOOLS")) {
        member = message.mentions.members.first()
        if (!await fcheck.isDev(message.author)) return
        var d = member.joinedAt
        d = [d.getMonth()+1, d.getDate(), d.getFullYear(),].join('/')+' '+[d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
        const embed = new Discord.MessageEmbed()
            embed.setColor('ed0920')
            embed.setAuthor('Member Left', member.user.avatarURL())
            embed.setDescription(`${member} ${member.user.tag}`)
            embed.setThumbnail(member.user.avatarURL())
            embed.addField('Joined at:', d)
            embed.setTimestamp()
            embed.setFooter(member.id, 'https://i.imgur.com/yBIqOej.png')

            //send embed
            message.channel.send(embed)
            message.delete()
    }

    if (msg.startsWith(PREFIX + "FIND")) {
        if (!await fcheck.isDev(message.author)) return
        message.guild.members.forEach(member => {
            var d = member.joinedAt
            d = [d.getMonth()+1, d.getDate() ,d.getFullYear(),].join('/');
            if (d == "4/20/2019" || d == "4/20/2020" || d == "8/14/2019" || d == "8/13/2019" || d == "8/16/2019") {
                console.log(member.displayName);
                
            }
        })
    }

    if (msg.startsWith('AH YES')) {
        async function labor(){
            //check if a dev
            if (!await fcheck.isDev(message.author)) return console.log('This command is for dev onle');
            const embed = new Discord.MessageEmbed()
            embed.setTitle('Slave Labor')
            embed.setURL('https://www.youtube.com/watch?v=Q4o6X9bOeRg')
            message.channel.send(embed)
            console.log(embed)
        }
        labor();
        
    }

    if (msg.startsWith(PREFIX + 'MC')) {
        if (!await fcheck.isDev(message.author)) return;
        client.commands.get('Galactic alphabet').execute(message, args);
    }

    

})


/*
=====================================================
On Errors and Login

=====================================================
*/


client.on('error', err => {        //look for errors when logging in
    console.log(err);
})

client.login(token);       //login with token