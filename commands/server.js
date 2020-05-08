const Discord = require('discord.js');      //discord bots
const fcheck = require('../functions/check.js')
require('../functions/check.js')
module.exports = {
    name: 'Server',
    description: "Server info commands",
    execute(message, args) {

        async function run() {
            if(args[1]==='id'){
                message.channel.send(message.guild.id);
            }
            if(args[1]==='info'){
    
                var d = message.guild.createdAt,
                d = [d.getMonth()+1, d.getDate(), d.getFullYear(),].join('/')+' '+[d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
    
    
                const embed = new Discord.MessageEmbed()
                embed.setAuthor('Server Information: '+message.guild.name, 'https://i.imgur.com/yBIqOej.png')
                embed.setThumbnail(message.guild.iconURL())
                embed.setColor('F3E210')
                embed.addField('Created At', d)
                embed.addField('Server Owner', message.guild.owner, true)
                embed.addField('Member Count', 'Bots: '+message.guild.members.filter(member => member.user.bot).size+'         Members: '+message.guild.members.filter(member => !member.user.bot).size+'         Total: '+message.guild.memberCount, true)
                embed.addField('Server id', message.guild.id, true)
                embed.addField('Large?', message.guild.large, true)
                embed.addField('Channels', 'Text Channels:'+message.guild.channels.filter(channel => channel.type === 'text').size+'         Voice Channels:'+message.guild.channels.filter(channel => channel.type === 'voice').size, true)
                
                var NitroS = message.guild.features;            //Nitro Boost 
                if(message.guild.features.toString() === 'ANIMATED_ICON,INVITE_SPLASH'){
                    NitroS = 'Level one';
                }else{
                if(message.guild.features.toString() === 'Unknown'){
                        NitroS = 'Level two';
                    }else{
                        if(message.guild.features.toString() === 'UNKNOWN'){
                            NitroS = 'Level Three';
                        }else{
                            NitroS = 'No Boost';
                        }
                    }
                }
                embed.addField('Nitro Boost', NitroS, true)
                embed.addField('Roles', message.guild.roles.size, true)
                embed.addField('Number of Administrators', message.guild.members.filter(member => member.hasPermission("ADMINISTRATOR")).size, true)
                message.channel.send(embed)
            }
        }

        async function checkGuild() {
            if (!await fcheck.isGuild(message)) {
                message.channel.send("Not a server!")
                return
            } else {
                run()
            }
        }
        
        checkGuild()

        
            
    }
}