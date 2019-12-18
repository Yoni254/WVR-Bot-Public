const Discord = require('discord.js');      //Discord 
const fs = require("fs");       //fs
const redis = require('redis');       //Redis
const util = require("util");
require('dotenv/config');

//port : 6379

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL'] });
client.commands = new Discord.Collection()     //discord command handler

//functions
const fBackup = require('./functions/backup');
const fLoad = require('./functions/load');
const fcheck = require('./functions/check');
//events
const eMessage = require('./events/onMessage');
const eMemberUpdate = require('./events/onMemberUpdate');
const eGuildMember = require('./events/guildMember');
const eReaction = require('./events/reaction')

const commandfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));        //commandfiles look for commands folder
for (const file of commandfiles) {          //for number of files on commandfiles folder
    const command = require(`./commands/${file}`);      //const command is in commands under ${file name}
    client.commands.set(command.name, command);        //look for commands by name
}

const token = process.env.TOKEN;    //new const token taken from env file

const http = require('http');       //new const http
const port = process.env.PORT;      //new const to port to heroku
http.createServer().listen(port);       //creates a heroku server


const PREFIX = '+';     //prefix

const redisClient = redis.createClient(process.env.REDIS_URL);     //use client link in env file

const version = '1.6.1.4';      //client version

const invites = {};     //invite const

const wait = require('util').promisify(setTimeout);     //wait x time function


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

client.on('ready', () => {     //when starting client
    client.user.setActivity("You", { type: "WATCHING" })       //watching you activity
    console.log('bot is on');       //log client is on

    lookForInvites();       //start invite function

    setTimeout(hookEvent, 60000, client, redisClient);      //start webhook events function in 6 sec

})

client.on('guildCreate', () => {       //when joining a new server
    lookForInvites();       //look for invites
})

redisClient.on('ready', () => {      //when redis is ready
    console.log('Redis ready')      //log redis is ready
})

client.on('guildMemberAdd', (member, guild) => {         //Member joining

    member.guild.fetchInvites().then(guildInvites => {      //fetch invites in the guild
       eGuildMember.memberJoin(member, guild, redisClient, invites, guildInvites, client);
    })
})

client.on('guildMemberRemove', async member => {          //Member leaving
    eGuildMember.memberLeave(member, client);
})

client.on('guildBanAdd', async (guild, user) => {         //Member ban
    eGuildMember.memberBanned(guild, user);        //go to banned.js
})

client.on('guildMemberUpdate', async (oldMember, newMember) => {     //when member is updated
    //nickname ban 
    eMemberUpdate.bannedNickname(oldMember, newMember);
})

client.on('messageReactionAdd', async (messageReaction, user) => {
    if (messageReaction.message.partial){
        console.log('Partial')
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

client.on('message', async message => {      //when a message is sent

    let msg = message.content.toUpperCase();        //msg ignores cases
    let args = message.content.slice(PREFIX.length).split(" ");     //split args by " "

    //check for bump
    eMessage.bump(message);
    //check for random RP event
    eMessage.rpRandom(message)


    if (msg.startsWith(PREFIX + 'HELP')) {       //help command 
        client.commands.get('Help').execute(message, args, version);       //go to help.js
    }

    if (msg.startsWith(PREFIX + 'CLEAR')) {       //clear command
        if (message.author.bot) return;
        if (message.member.id !== '430423068423225347') return;     //command locked for me
        client.commands.get('Clear').execute(message, args);       //go to clear.js
    }

    if (msg.startsWith(PREFIX + 'SAY ')) {         //say command
        if (message.author.bot) return;
        client.commands.get('Say').execute(message, args);     //go to say.js
    }

    if (msg.startsWith(PREFIX + 'CHANNEL')) {         //channel commands
        if (message.author.bot) return;
        client.commands.get('Channel').execute(message, args);     //go to channel.js
    }

    if (msg.startsWith(PREFIX + 'WVR ')) {       //wvr links commands
        if (message.author.bot) return;
        client.commands.get('WVR').execute(message, args);     //go to wvr.js
    }

    if (msg.startsWith(PREFIX + 'VERSION')) {       //Version command
        if (message.author.bot) return;
        message.channel.send(version);      //send version const
    }

    if (msg.startsWith(PREFIX + 'SERVER')) {            //server info command
        if (message.author.bot) return;
        client.commands.get('Server').execute(message, args);      //go to server.js
    }

    if (msg.startsWith(PREFIX + 'PLACE ') || msg.startsWith(PREFIX + 'P ')) {       //place command
        //run the command
        try {
            //the fucntion for the command
            async function place() {
                //check if a text channel
                if (await fcheck.isText(message.channel) == 'false') return console.log('Not in a text channel');
                //check if a bot
                if (await fcheck.isBot(message.author) == 'true') return message.channel.send('bots can\'t use this command');
                //checks if a specific server by id
                if (await fcheck.isServerId(message, '437056044796215298') == 'false') return message.channel.send('command is not for this server');


                client.commands.get('Place').execute(message, args, redisClient, client);      //go to place.js
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

    if (msg.startsWith('NEW')) {        //pins message when bot sends new @member 
        //try to use the command
        try {
            //the command function
            async function placePin(){
                //checks if specific user
                if (await fcheck.isAuthorId(message.author, '627222236499017738') == 'false') return;

                /** checks if specific channel 
                 * [533532176159997952] - ps general
                 * [493444814717845504] - xbox general
                 * [493436428911378442] - pc general
                */
                if (await fcheck.isChannelId(message.channel, '493444814717845504') == 'true' || await fcheck.isChannelId(message.channel, '533532176159997952') == 'true' || await fcheck.isChannelId(message.channel, '493436428911378442') == 'true') {
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

    if (msg.startsWith(PREFIX + 'SET')) {       //set commands
        if (message.author.bot) return;
        client.commands.get('Set').execute(message, args, redisClient, redis);      //go to set.js
    }

    if (msg.startsWith(PREFIX + 'RESET')) {     //reset commands
        if (message.author.bot) return;
        client.commands.get('Reset').execute(message, args, redisClient);       //go to reset.js       
    }

    if (msg.startsWith(PREFIX + 'JOINED')) {        //joined command (date)
        if (message.author.bot) return;
        client.commands.get('Joined').execute(message, args);      //go to joined.js
    }

    if (msg.startsWith(PREFIX + 'POLL')) {      //poll command
        if (message.author.bot) return;
        client.commands.get('Poll').execute(message, args);        //go to poll.js
    }

    if (msg.startsWith(PREFIX + "HOOKEVENTRUN")) {       //run hookevent function
        var channeltype = message.channel.type      //Check for channek type
        if (channeltype !== 'text') return message.channel.send('Error you cant use this here');        //when in dm
        if (message.author.bot) return;
        if (!message.member.hasPermissions("ADMINISTRATOR", explicit = true)) return message.channel.send("Error, you can't use this").then(msg => msg.delete(5000));       //Check for perms
        hookEvent(client, redisClient);     //run hookevents
    }

    if (msg.startsWith(PREFIX + 'BMNN')) {       //bmnn commands
        if (message.author.bot) return;
        client.commands.get('BMNN').execute(message, args, redis, redisClient, client);     //go to BMNN.js

    }

    if (msg.startsWith(PREFIX + 'WVRRP')) {
        if (message.author.bot) return;
        if (message.guild.id !== '537718961152851983') return;      //check if wvr rp server
        client.commands.get('WVR RP').execute(message, args, redisClient, client, redis, PREFIX);
    }

    if (msg.startsWith(PREFIX + 'SAYAS')) {             //say as command
        if (message.author.bot) return;
        client.commands.get('Say As').execute(message, args, client)
    }

    if (msg.startsWith(PREFIX + 'CHECKTEST')) {      //Save server preset
        async function test() {
            //check if a text channel
            if (await fcheck.isText(message.channel) == 'false') return console.log('Not in a text channel');
            //check if a bot
            if (await fcheck.isBot(message.author) == 'true') return console.log('bots can\'t use this command');
            //check if a dev
            if (await fcheck.isDev(message.author, client) == 'false') return console.log('This command is for dev onle');
            //check if server
            if (await fcheck.isGuild(message) == 'false') return console.log('You need to be in a server to use this');
            //checks if a specific server by id
            if (await fcheck.isServerId(message, '437056044796215298') == 'false') return console.log('command is not for this server');
            //checks if specific user
            if (await fcheck.isAuthorId(message.author, '430423068423225347') == 'false') return console.log('User not allowed to use this');
            //checks if specific channel
            if (await fcheck.isChannelId(message.channel, '502915492894474240') == 'false') return console.log('command is not for this channel');


            console.log('Yes')
        }
        //run the command
        test();
    }

    if (msg.startsWith(PREFIX + 'PLACECHECK')) {     //placement check
        client.commands.get('Place Check').execute(message, args, client, redis, redisClient);
    }

    if (msg.startsWith(PREFIX + 'ACTIVITYCHECK')) {
        console.log('Running')
        client.commands.get('Activity Check').execute(message, args, client, redis, redisClient);
    }
 
    if (msg.startsWith(PREFIX + 'SETTLEMENT')) {
        client.commands.get('Settlement').execute(message, args)
    }

    if (msg.startsWith(PREFIX + 'ID')) {
        message.channel.messages.fetch({limit: 2}).then(m => {
            m.forEach(ms => {
                if (ms.id == message.id) return;
                message.channel.send(ms.id)
            })
        })
    }

    if (msg.startsWith(PREFIX + 'TEST')) {
        const embed = new Discord.MessageEmbed()
        embed.setTitle('Slave Labor')
        message.channel.send(embed)
        console.log(embed)
    }
})

client.on('error', err => {        //look for errors when logging in
    console.log(err);
})

client.login(token);       //login with token