const Discord = require('discord.js');      //discord bots
require('../index')
module.exports = {
    name: 'Settlement',
    description: "Settlement info commands",
    execute(message, args) {
        
        try {

            //new embed
            const embed = new Discord.MessageEmbed()

            //get settlement
            if (!message.mentions.roles.first()) return message.channel.send('No Settlement found')
            let settlementmembers = message.mentions.roles.first().members.map(m => m.user);
            let settlement = message.mentions.roles.first()
            
            //Get Gov
            var Gov;
            let GovRoles = ['488440251824734218', '493801161569075201', '493801323792302097']
            for (m of settlementmembers) {
                let member = message.guild.members.get(m.id)
                GovRoles.forEach(role => {
                    if (member.roles.has(role)) {
                        Gov = member
                    }
                })
            }

            //Get Maj
            var Maj;
            let MajRoles = ['488440179871449138', '493801268779810817', '493801400661180448']
            for (m of settlementmembers) {
                let member = message.guild.members.get(m.id)
                MajRoles.forEach(role => {
                    if (member.roles.has(role)) {
                        Maj = member
                    }
                })
            }

            //Get Other leaders
            var Leadership = [];
            for (m of settlementmembers) {
                let member = message.guild.members.get(m.id)
                LeaderRoles.forEach(role => {
                    if (member.roles.has(role)) {
                        Leadership.push(member)
                    }
                })
            }

            //get Soldiers
            var Soldiers = [];
            let Soldier = ['509814674242666496']
            for (m of settlementmembers) {
                let member = message.guild.members.get(m.id)
                Soldier.forEach(role => {
                    if (member.roles.has(role)) {
                        Soldiers.push(member)
                    }
                })
            }

            //get Medics
            var Medics = [];
            let Medic = ['509814509922418698']
            for (m of settlementmembers) {
                let member = message.guild.members.get(m.id)
                Medic.forEach(role => {
                    if (member.roles.has(role)) {
                        Medics.push(member)
                    }
                })
            }

            //Get Scavengers
            var Scavengers = [];
            let Scavenger = ['509814569573548042']
            for (m of settlementmembers) {
                let member = message.guild.members.get(m.id)
                Scavenger.forEach(role => {
                    if (member.roles.has(role)) {
                        Scavengers.push(member)
                    }
                })
            }

            //Get Engineers
            var Engineers = [];
            let Engineer = ['532342285250068493']
            for (m of settlementmembers) {
                let member = message.guild.members.get(m.id)
                Engineer.forEach(role => {
                    if (member.roles.has(role)) {
                        Engineers.push(member)
                    }
                })
            }


            embed.setColor('6dc9ed')
            embed.setTitle(`Showing info for settlement of ${settlement.name}`)
            embed.setDescription(`Settlement Size: ${settlementmembers.length}`)
            embed.addField('Governor', `${Gov}.`, true)
            embed.addField('Major', `${Maj}.`, true)
            embed.addField('Directors / Knights / Admins', `${Leadership.join(' ')}.`)
            embed.addField(`Soldiers: ${Soldiers.length}`, `${Soldiers.join('   ')}.`)
            embed.addField(`Scavengers: ${Scavengers.length}`, `${Scavengers.join('   ')}.`)
            embed.addField(`Engineers: ${Engineers.length}`, `${Engineers.join('   ')}.`)
            embed.addField(`Medics: ${Medics.length}`, `${Medics.join('   ')}.`)
            embed.addBlankField()
            embed.addField('Members', `${settlementmembers.join("   ")}.`);
            embed.setThumbnail(message.guild.iconURL())
            embed.setTimestamp()
            embed.setFooter(`Settlement ID: ${settlement.id}`)

            message.channel.send(embed)
        }
        //errors
        catch (err) {
            //log
            console.log('Error: ' + err)
        }
    }
}