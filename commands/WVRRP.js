require('../index')
module.exports = {      //discord command handler
    name: 'WVR RP',
    description: "WVR RP commands",
    execute(message, args, redis) {

        if(message.author.bot) return;
        if (args[1] === 'SetRPChannel'){
        if (!message.member.hasPermissions('ADMINISTRATOR')) return message.channel.send('this commands are for admin only').then(msg => msg.delete(5000));     //
            let channelId = args[2]
            let options = message.content.slice(21+args[2].length) 
            RedisClient.set(channelId+'WVRRPList', options, redis.print);       //save
            message.channel.send('Got it!');        //say when done
        
        }

        if (args[1] === 'RemoveRPChannel') {
            if (!message.member.hasPermissions('ADMINISTRATOR')) return message.channel.send('this commands are for admin only').then(msg => msg.delete(5000));     //check for admin
            RedisClient.get(args[2]+'WVRRPList', function (err, result) {      //get list of channels
                if (err) throw err;     //throw errors
                console.log(result);        //log results
                console.log(channels.join())        //log the result
                RedisClient.set(args[2]+'WVRRPList', 'Removed', redis.print)     //cash the new list
                message.channel.send(`Removed random event for ${args[2]}`)
            })
            
        }


    }
}