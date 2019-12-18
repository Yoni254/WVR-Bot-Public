const Discord = require('discord.js');      //discord bots
module.exports = {      //discord command handler
    name: 'Say As',
    description: "Says something as pinged user",
    execute(message, args, bot) {

        if(message.author.bot) return;
        //if (message.member.id !== '430423068423225347') return;     //command locked for me
        let user = message.mentions.members.first();
        if(!user) return message.channel.send('Missing a user');

        if (user.id == message.member.id || message.member.hasPermission("ADMINISTRATOR")){
            message.channel.createWebhook(user.displayName,  {avatar: user.user.avatarURL()}).then(Webhook => {
                Webhook.send(message.content.slice(args[0].length+args[1].length+3)).then(msg => {
                    Webhook.delete();
                })
                
            })
            message.delete();
        }

    }
}