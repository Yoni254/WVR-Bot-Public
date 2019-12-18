const Discord = require('discord.js');      //discord bots
const wait = require('util').promisify(setTimeout);     //wait x time function

module.exports = {
    name: 'HookEvent',
    description: "Webhook NPC events",
    execute(bot, client) {

        client.get('HookEventList', function(err, result) {
            if(err) throw err;
            console.log(result);
            var nameArgs = result.split(",")
            for(var i=0; i < nameArgs.length; ++i) {
                console.log(i)
                console.log(nameArgs[i])
                client.get(nameArgs[i]+'Hookevent', function(err, resultN) {
                    if(err) throw err;
                    console.log(resultN);
                    if(resultN == null) return;
                    Hookargs = resultN.split(",");
                    let channelH = Hookargs[0];
                    let time = Hookargs[2];
                    let name = Hookargs[1];
                    let avatarURL = Hookargs[3].slice(1);
                    let options = Hookargs[4];
                    console.log(channelH)
                    console.log(time)
                    console.log(name)
                    console.log(avatarURL)
                    console.log(options)
    
                    setInterval(HookEventMessage, time * 60000, channelH, name, avatarURL, options)
                })
            }
        })
        function HookEventMessage(channelH, name, avatarURL, options) {
            bot.channels.get(channelH).createWebhook(name, {avatar: avatarURL}).then(Webhook => {
                var HookEventArgs = options.split(/"(.+?)"/g)
                var min1 = 0;
                var max1 = HookEventArgs.length/2-1;
                var rand1 =
                    Math.floor(Math.random() * (+max1 - +min1)) + +min1;
                    console.log(rand1)
                if (rand1 === 0) {
                    if(!HookEventArgs[1]) return console.log('Error')
                    Webhook.send(HookEventArgs[1])
                } if (rand1 === 1) {
                    if(!HookEventArgs[3]) return console.log('Error')
                    Webhook.send(HookEventArgs[3])
                } if (rand1 === 2) {
                    if(!HookEventArgs[5]) return console.log('Error')
                    Webhook.send(HookEventArgs[5])
                } if (rand1 === 3) {
                    if(!HookEventArgs[7]) return console.log('Error')
                    Webhook.send(HookEventArgs[7])
                } if (rand1 === 4) {
                    if(!HookEventArgs[9]) return console.log('Error')
                    Webhook.send(HookEventArgs[9])
                } if (rand1 === 5) {
                    if(!HookEventArgs[11]) return console.log('Error')
                    Webhook.send(HookEventArgs[11])
                } if (rand1 === 6) {
                    if(!HookEventArgs[13]) return console.log('Error')
                    Webhook.send(HookEventArgs[13])
                } if (rand1 === 7) {
                    if(!HookEventArgs[15]) return console.log('Error')
                    Webhook.send(HookEventArgs[15])
                } if (rand1 === 8) {
                    if(!HookEventArgs[17]) return console.log('Error')
                    Webhook.send(HookEventArgs[17])
                } if (rand1 === 9) {
                    if(!HookEventArgs[19]) return console.log('Error')
                    Webhook.send(HookEventArgs[19])
                } if (rand1 === 10) {
                    if(!HookEventArgs[21]) return console.log('Error')
                    Webhook.send(HookEventArgs[21])
                } if (rand1 === 11) {
                    if(!HookEventArgs[23]) return console.log('Error')
                    Webhook.send(HookEventArgs[23])
                } if (rand1 === 12) {
                    if(!HookEventArgs[25]) return console.log('Error')
                    Webhook.send(HookEventArgs[25])
                } if (rand1 === 13) {
                    if(!HookEventArgs[27]) return console.log('Error')
                    Webhook.send(HookEventArgs[27])
                } if (rand1 === 14) {
                    if(!HookEventArgs[29]) return console.log('Error')
                    Webhook.send(HookEventArgs[29])
                } if (rand1 === 15) {
                    if(!HookEventArgs[31]) return console.log('Error')
                    Webhook.send(HookEventArgs[31])
                } if (rand1 === 16) {
                    if(!HookEventArgs[33]) return console.log('Error')
                    Webhook.send(HookEventArgs[33])
                } if (rand1 === 17) {
                    if(!HookEventArgs[35]) return console.log('Error')
                    Webhook.send(HookEventArgs[35])
                } if (rand1 === 18) {
                    if(!HookEventArgs[37]) return console.log('Error')
                    Webhook.send(HookEventArgs[37])
                } if (rand1 === 19) {
                    if(!HookEventArgs[39]) return console.log('Error')
                    Webhook.send(HookEventArgs[39])
                } if (rand1 === 20) {
                    if(!HookEventArgs[41]) return console.log('Error')
                    Webhook.send(HookEventArgs[41])
                } if (rand1 === 21) {
                    if(!HookEventArgs[43]) return console.log('Error')
                    Webhook.send(HookEventArgs[43])
                } if (rand1 === 22) {
                    if(!HookEventArgs[45]) return console.log('Error')
                    Webhook.send(HookEventArgs[45])
                } if (rand1 === 23) {
                    if(!HookEventArgs[47]) return console.log('Error')
                    Webhook.send(HookEventArgs[47])
                } if (rand1 === 24) {
                    if(!HookEventArgs[49]) return console.log('Error')
                    Webhook.send(HookEventArgs[49])
                } if (rand1 === 25) {
                    if(!HookEventArgs[51]) return console.log('Error')
                    Webhook.send(HookEventArgs[51])
                }
                wait(5000);
                Webhook.delete();
                
            })
        }

    }
}