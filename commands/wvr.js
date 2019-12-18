const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'WVR',
    description: "WVR Links",
    execute(message, args) {

        if(args[1]==='server'){
            message.channel.send('Faction Link: https://discord.gg/Hd7Wvux')
            }else{
                if(args[1]==='instagram'){
                    message.channel.send('Instagram: https://instagram.com/westvirginiarepublicfo76?igshid=1efjh4d7stwrn')
                }else{
                message.channel.send('Error. Try "wvr server" "wvr instagram"')
                }
            }  
    }
}