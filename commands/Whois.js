const Discord = require('discord.js')
const fcheck = require('../functions/check')
module.exports = {
    name: 'Whois',
    description: "Gives information about User",
    /**
     * Gives information about user
     * @param {Object} message The message sent
     * @param {Array} args Array of all the message parts
     */
    execute(message, args) {
     
        // Look for mentioned User if non use Author 
        member = message.mentions.members.first()
        if (!member) {
            member = message.member
        }

        let d = member.joinedAt
        joinDate = d.toDateString()
        let creationDate = member.user.createdAt
        creationDate = creationDate.toDateString()

        JoinPosition = 1
        async function findJoinPosition() {
            message.guild.members.forEach(GuildMember => {
                // Look for bots
                if (GuildMember.user.bot) {
                    return
                }
                let memberDate = GuildMember.joinedAt
                if (memberDate.getFullYear() < d.getFullYear()) {
                    JoinPosition += 1
                } else if (memberDate.getFullYear() == d.getFullYear() && memberDate.getMonth()+1 < d.getMonth()+1) {
                    JoinPosition += 1
                } else if (memberDate.getFullYear() == d.getFullYear() && memberDate.getMonth()+1 == d.getMonth()+1 && memberDate.getDate() < d.getDate()) {
                    JoinPosition += 1
                }

            });
        }
        findJoinPosition()

        let RolesCount = 0
        let RolesList = []
        for (role of member.roles) {
            if (role[1].name != '@everyone') {
                RolesList.push(role[1])
                RolesCount += 1
            }
        }

        let ifAdmin = ""
        if (member.permissions.has('ADMINISTRATOR')) {
            ifAdmin = " - Admin"
        }

        // Discord Embed 
        const embed = new Discord.MessageEmbed()
        embed.setTitle(member.user.tag)
        embed.setThumbnail(member.user.avatarURL())
        embed.setColor('2785da')
        embed.addField('Join Date', joinDate, true)
        embed.addField('Join Position   ', JoinPosition, true)
        embed.addField('Creation Date', creationDate, true)
        embed.addField(`Roles - ${RolesCount}`,  RolesList.join(', ') + "." )
        embed.addField('Permissions', member.permissions.toArray().join(', ').toLowerCase())
        embed.addField('Highest Role', `${member.roles.highest} ${ifAdmin}`)
        embed.setFooter(`Id : ${member.id}`)
        message.channel.send(embed)


    }
}