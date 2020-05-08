const Discord = require('discord.js')
const fcheck = require('../functions/check');
const fCache = require('../functions/cache')

module.exports = {

    /** 
     * When member leaves a server
     * @param {object} member the member that left
     * @param {object} bot the discord bot
     */ 
    async memberLeave(member, bot) {

        //try to run
        try {

            // Remove Cache
            await fCache.RemoveCache(member)

            //get the time member joined the server
            var d = member.joinedAt
            d = [d.getMonth()+1, d.getDate(), d.getFullYear(),].join('/')+' '+[d.getHours(),d.getMinutes(),d.getSeconds()].join(':');

            //get bot commands channel
            const channel = member.guild.channels.find(channel => channel.name === "bot-commands");
            //return if no channel
            if(!channel) return;

            var pin = false;

            async function removePin(){
                //check if WVR server
                pin = false;
                if (await fcheck.isServerId(member, '437056044796215298')) {
                    //new array
                    var channelA = ["493436428911378442", "493444814717845504", "533532176159997952"]

                    //run 3 times
                    for (let i = 0; i < channelA.length; ++i) {
                        //get the channels
                        await bot.channels.get(channelA[i]).messages.fetchPinned().then(pinned => {
                            //for every pinned message
                            for (const pinnedMessage of pinned) {

                                //check if the message starts with New
                                if (pinnedMessage[1].content.startsWith('New')){
                                    //split to message args by space
                                    let messageArgs = pinnedMessage[1].content.split(" ")

                                    //get args 2 - @member
                                    if (messageArgs[2] == `<@${member.id}>`) {
                                        console.log('A pinned member has left, removing pin: ' + pinnedMessage)
                                        pinnedMessage[1].unpin();
                                        pin = true;
                                    }

                                }                    
                            }
                        })
                    }
                } else {
                    console.log("not wvr");
                    
                }
                console.log("Need to unpin? "+pin)
            }
            
            await removePin()

            //new const discord rich embed
            const embed = new Discord.MessageEmbed()
            embed.setColor('ed0920')
            embed.setAuthor('Member Left', member.user.avatarURL())
            embed.setDescription(`${member} ${member.user.tag}`)
            embed.setThumbnail(member.user.avatarURL())
            embed.addField('Joined at:', d)
            if (pin) {
                embed.addField('Removed pin', 'Member was pinned for placement and left, removed pin.')
            }
            embed.setTimestamp()
            embed.setFooter(member.id, 'https://i.imgur.com/yBIqOej.png')

            //send embed
            channel.send(embed)

        }
        //catch errors
        catch (err) {
            console.log('Error with member leaving: ' + err)
        }
        
    },


    /** 
     * Sends a message when user joins 
     * @param {object} member the member that joined
     * @param {object} guild the guild the member joined
     * @param {object} client the data clinet - Redis 
     * @param {object} invites all the invites fetched before user joined
     * @param {object} guildInvites the invites fetched from the guild after user joined
     * @param {object} bot the WVR bot
    */
    async memberJoin(member, guild, client, invites, guildInvites, bot) {
        

        try {
            try {
                //ei is the old invites for the guild
                const ei = invites[member.guild.id];
                //switch old invites to the new invites
                invites[member.guild.id] = guildInvites;
                //get the invite that got up by one
                var invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
                //get the invite creator
                var inviter = bot.users.get(invite.inviter.id);
                //set new invite to false
                var newInvite = 'false'
            }
            //in case of an error (new invite)
            catch (err) {
                //log the error
                console.log('Error finding invite: ' + err);
                //new invite is true
                var newInvite = 'true';
            }
            
            
            //get the join role of the server
            client.get(member.guild+'JoinRole', function(err, result) {
                //throw errors
                if(err) throw err;
                //return if no result
                if(!result) return;
                //give the role
                let role = member.guild.roles.find(role => role.id === result);
                member.roles.add(role);
            })

            //get the channel bot commands
            const channel = member.guild.channels.find(channel => channel.name === "bot-commands");
            //return if no channel
            if(!channel) return;


            //get the time user was created at
            var d = member.user.createdAt,
            d = [d.getMonth()+1, d.getDate(), d.getFullYear(),].join('/')+' '+[d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
        
            //a new embed
            const embed = new Discord.MessageEmbed()
            embed.setColor('09ed4a')
            embed.setAuthor('Member Joined', member.user.avatarURL())
            embed.setDescription(`${member} ${member.user.tag}`)
            embed.setThumbnail(member.user.avatarURL())
            embed.addField('Created at', d)
            //chack if new invite is true or false
            if (newInvite === 'true') {
                embed.addField('Invite used', 'A new Invite was used.')
            }
            else {
                embed.addField('Invite used', `Invite code: ${invite.code} Created by ${inviter.tag}. Invite was used ${invite.uses} times.`)
            }
            embed.setTimestamp()
            embed.setFooter(member.id, 'https://i.imgur.com/yBIqOej.png')

            //send the embed
            channel.send(embed)
        }
        //catch errors
        catch (err) {
            //log the error
            console.log('Error in join event: ' + err)
        }
    },


    /**
     * When member is banned from a server
     * @param {object} guild the discord guild user was banned from
     * @param {object} user the banned user
     */
    async memberBanned(guild, user) {
        
        

        //get bot commands channel
        const channel = guild.channels.find(channel => channel.name === "bot-commands");
        //return if no channel
        if(!channel) return;

        //create a new embed
        const embed = new Discord.MessageEmbed()
        .setColor('ed0920')
        .setAuthor('Member Banned', user.avatarURL())
        .setDescription(user.tag)
        .setThumbnail(user.avatarURL())
        .setTimestamp()
        .setFooter(user.id, 'https://i.imgur.com/yBIqOej.png')

        //send the embed
        channel.send(embed)
    }

}