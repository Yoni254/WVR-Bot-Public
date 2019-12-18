const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'Reset',
    description: "Resets a channel",
    execute(message, args, client) {

        var channeltype = message.channel.type;
        if (channeltype !== 'text') return message.channel.send('Error, this is not a server')
        
        if(!message.member.hasPermissions("MANAGE_MESSAGES")) return;
        client.get(message.guild + 'reset', function(err, result) {
            if(err) throw err;
            if(!result) return message.channel.send('Error finding channel in data').then(msg => msg.delete(5000));;

            if(!args[1]) return message.channel.send('Error in finding channel').then(msg => msg.delete(5000));;
            let channelR = message.guild.channels.find("name", args[1])
            let resultR = message.guild.channels.find("name", result);
            if(!channelR) return message.channel.send('Error in finding channel').then(msg => msg.delete(5000));;

            console.log(resultR+" "+channelR);

            if(resultR !== channelR) return message.channel.send('Error this command doesnt work on this channel').then(msg => msg.delete(5000));;
            

            async function purge() {            //The purge function
                let fetched = await channelR.fetchMessages({limit:0});
                channelR.bulkDelete(fetched)
                    .catch(error => message.channel.send('Error '+ error)).then(msg => msg.delete(5000));
                if(fetched.size<1){
                    message.channel.send('Done!')
                } else {
                    purge()
                } 
            }

            purge();        //start purge function  
            

        })
        

    }
}