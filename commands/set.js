const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'Set',
    description: "Writes data in database",
    execute(message, args, client, redis) {

        if(message.author.bot) return;
        var channeltype = message.channel.type;
        if (channeltype !== 'text') return message.channel.send('Error, this is not a server')
        
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('this commands are for admin only').then(msg => msg.delete(5000));
        if (args[1] === 'placedm') {
            editmessage = message.content.slice(13);
            client.set(message.guild + 'placedm', editmessage, redis.print)
            message.channel.send('Got it!')
        }

        if (args[1] === 'reset') {
            editmessage = message.content.slice(11);
            let channelR = message.guild.channels.find(channelR => channelR.name === editmessage);
            if(!channelR) return message.channel.send('Woops looks like the channel is invalid');
            client.set(message.guild + 'reset', editmessage, redis.print);
            message.channel.send('Got it!');
            
        }

        if (args[1] == 'HookEvent') {
            let messageedit = message.content.slice(15);
            let Hookargs = messageedit.split(", ");
            let name = Hookargs[1];
            console.log(name)
            client.set(name+'Hookevent', messageedit, redis.print);
            message.channel.send('Got it!');
        }

        if (args[1] == 'HookEventAdd') {
            let name = message.content.slice(18);
            client.get('HookEventList', function(err, result) {
                if(err) throw err;
                console.log(result);

                let nameList = result+","+name;
                client.set('HookEventList', nameList, redis.print)
            })
            message.channel.send('Got it!');
        }

        if (args[1] == 'JoinRole') {
            let role = message.content.slice(14);
            console.log(role);
            client.set(message.guild+'JoinRole', role, redis.print);
            message.channel.send('Got it!');
        }



    }
}