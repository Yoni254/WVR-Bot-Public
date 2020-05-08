const Discord = require('discord.js');      //discord bots
module.exports = {      //discord command handler
    name: 'RPMessageEvent',
    descriptiom: "Random messages when message sent",
    execute(message, client, bot, redis) {

        let event = Math.floor(Math.random() * (+101 - +0)) + +0;
        if(event !== 100) return;
        client.get(message.channel.id+'WVRRPList', function(err, result ) {
            if(err) throw err;
            if(!result) return;
            if(result == null) return;
            console.log(`Options for ${message.channel.id} are ${result}`);
            let options = result.split(",");
            let num = options.length;
            let whatMessage = Math.floor(Math.random() * (+num - +0)) + +0;
            let messageArgs = options[whatMessage].split('@')
            message.channel.createWebhook(messageArgs[0]).then(Webhook => {
                Webhook.send(messageArgs[1]);
                Webhook.delete();
            })
            console.log(`random event in ${message.channel}: ${options[whatMessage]}`)
        })

    }
}