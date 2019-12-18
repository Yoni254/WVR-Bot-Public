const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'Joined',
    description: "When user joined",
    execute(message, args) {

        let member = message.mentions.members.first();
        if(!member) {
            member = message.member;
        } 

        var d = member.joinedAt
        d = [d.getMonth()+1, d.getDate(), d.getFullYear(),].join('/')+' '+[d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
        message.channel.send(`${member} Joined at: ${d}`);
    
    }
}