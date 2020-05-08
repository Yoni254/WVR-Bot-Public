const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'Joined',
    description: "When user joined",
    /**
     * sends when user joined
     * @param {Object} message the message that executed the command
     * @param {Array} args the message arguments
     */
    execute(message, args) {


        async function checkUserJoinDate(member) {
            var d = member.joinedAt
            d = [d.getMonth()+1, d.getDate(), d.getFullYear(),].join('/')+' '+[d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
            return d
        }

        async function sendJoinedMessage() {
            //send join date
            message.channel.send(`${member} Joined at: ${await checkUserJoinDate(member)}`);
        }



        /** @param {object} member the member that is mentioned */
        let member = message.mentions.members.first();


        //If no member mentioned
        if(!member && !args[1]) {
            //set member to user that executed the command
            member = message.member;
            sendJoinedMessage()
        } else if (!member && args[1]) {
            // Look for specific Month
            list = ""
            message.guild.members.forEach(guildMember => {
                date = guildMember.joinedAt
                date = [date.getMonth()+1, date.getFullYear(),].join('/')
                if (date == args[1]) {
                    list = list + guildMember.displayName + "\n"
                }
            });

            if (list == "") {
                message.channel.send("No members joined in this date")
            } else {
                message.channel.send(`Members Joined on ${args[1]}: \n${list}`)
            } 
        } else {
            sendJoinedMessage()
        }

        
    
    }
}