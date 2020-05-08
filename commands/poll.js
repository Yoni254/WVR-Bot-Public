const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'Poll',
    description: "Poll",
    execute(message, args) {

        let pollargs = message.content.slice(6).split(/"(.+?)"/g);
        if (!pollargs[5]) return message.channel.send('Woops you need more args');
        const embed = new Discord.MessageEmbed();          //poll embed
        embed.setColor('e39c19#');
        embed.setAuthor('Poll', 'https://i.imgur.com/yBIqOej.png');
        if (!pollargs[6]) {
            embed.setDescription(`**${pollargs[1]}**\n
:regional_indicator_a:${pollargs[3]}          
:regional_indicator_b:${pollargs[5]}\n`)      //2 args
        } else if (!pollargs[8]) {
            embed.setDescription(`**${pollargs[1]}**\n
:regional_indicator_a:${pollargs[3]}
:regional_indicator_b:${pollargs[5]}
:regional_indicator_c:${pollargs[7]}\n`)      //3 args
        } else if (!pollargs[10]) {
            embed.setDescription(`**${pollargs[1]}**\n
:regional_indicator_a:${pollargs[3]}
:regional_indicator_b:${pollargs[5]}
:regional_indicator_c:${pollargs[7]}
:regional_indicator_d:${pollargs[9]}\n`)      //4 args
        } else if (!pollargs[12]) {
            embed.setDescription(`**${pollargs[1]}**\n
:regional_indicator_a:${pollargs[3]}
:regional_indicator_b:${pollargs[5]}
:regional_indicator_c:${pollargs[7]}
:regional_indicator_d:${pollargs[9]}
:regional_indicator_e:${pollargs[11]}\n`)     //5 args
        } else if (!pollargs[14]) {
            embed.setDescription(`**${pollargs[1]}**\n
:regional_indicator_a:${pollargs[3]}
:regional_indicator_b:${pollargs[5]}
:regional_indicator_c:${pollargs[7]}
:regional_indicator_d:${pollargs[9]}
:regional_indicator_e:${pollargs[11]}
:regional_indicator_f:${pollargs[13]}\n`)     //6 args
        } else if (!pollargs[16]) {
            embed.setDescription(`**${pollargs[1]}**\n
:regional_indicator_a:${pollargs[3]}
:regional_indicator_b:${pollargs[5]}
:regional_indicator_c:${pollargs[7]}
:regional_indicator_d:${pollargs[9]}
:regional_indicator_e:${pollargs[11]}
:regional_indicator_f:${pollargs[13]}
:regional_indicator_g:${pollargs[15]}\n`)     //7 args
        } else if (!pollargs[18]) {
            embed.setDescription(`**${pollargs[1]}**\n
:regional_indicator_a:${pollargs[3]}
:regional_indicator_b:${pollargs[5]}
:regional_indicator_c:${pollargs[7]}
:regional_indicator_d:${pollargs[9]}
:regional_indicator_e:${pollargs[11]}
:regional_indicator_f:${pollargs[13]}
:regional_indicator_g:${pollargs[15]}
:regional_indicator_h:${pollargs[17]}\n`)       //8 args
        } else if (!pollargs[20]) {
            embed.setDescription(`**${pollargs[1]}**\n
:regional_indicator_a:${pollargs[3]}
:regional_indicator_b:${pollargs[5]}
:regional_indicator_c:${pollargs[7]}
:regional_indicator_d:${pollargs[9]}
:regional_indicator_e:${pollargs[11]}
:regional_indicator_f:${pollargs[13]}
:regional_indicator_g:${pollargs[15]}
:regional_indicator_h:${pollargs[17]}
:regional_indicator_i:${pollargs[19]}\n`)       //9 args
        } else if (!pollargs[22]) {
            embed.setDescription(`**${pollargs[1]}**\n
:regional_indicator_a:${pollargs[3]}
:regional_indicator_b:${pollargs[5]}
:regional_indicator_c:${pollargs[7]}
:regional_indicator_d:${pollargs[9]}
:regional_indicator_e:${pollargs[11]}
:regional_indicator_f:${pollargs[13]}
:regional_indicator_g:${pollargs[15]}
:regional_indicator_h:${pollargs[17]}
:regional_indicator_i:${pollargs[19]}
:regional_indicator_j:${pollargs[21]}\n`)       //10 args
        } else {
            message.channel.send('too many args');
            return;
        }
        message.channel.send(embed).then(sentEmbed => {     //send message + reactions
            if (!pollargs[6]) {
                sentEmbed.react("🇦");      //A
                sentEmbed.react("🇧");      //B
            } else if (!pollargs[8]) {
                sentEmbed.react("🇦");      //A
                sentEmbed.react("🇧");      //B
                sentEmbed.react("🇨");      //C
            } else if (!pollargs[10]) {
                sentEmbed.react("🇦");      //A
                sentEmbed.react("🇧");      //B
                sentEmbed.react("🇨");      //C
                sentEmbed.react("🇩");      //D
            } else if (!pollargs[12]) {
                sentEmbed.react("🇦");      //A
                sentEmbed.react("🇧");      //B
                sentEmbed.react("🇨");      //C
                sentEmbed.react("🇩");      //D
                sentEmbed.react("🇪");      //E
            } else if (!pollargs[14]) {
                sentEmbed.react("🇦");      //A
                sentEmbed.react("🇧");      //B
                sentEmbed.react("🇨");      //C
                sentEmbed.react("🇩");      //D
                sentEmbed.react("🇪");      //E
                sentEmbed.react("🇫");      //F
            } else if (!pollargs[16]) {
                sentEmbed.react("🇦");      //A
                sentEmbed.react("🇧");      //B
                sentEmbed.react("🇨");      //C
                sentEmbed.react("🇩");      //D
                sentEmbed.react("🇪");      //E
                sentEmbed.react("🇫");      //F
                sentEmbed.react("🇬");      //G
            } else if (!pollargs[18]) {
                sentEmbed.react("🇦");      //A
                sentEmbed.react("🇧");      //B
                sentEmbed.react("🇨");      //C
                sentEmbed.react("🇩");      //D
                sentEmbed.react("🇪");      //E
                sentEmbed.react("🇫");      //F
                sentEmbed.react("🇬");      //G
                sentEmbed.react("🇭");      //H
            } else if (!pollargs[20]) {
                sentEmbed.react("🇦");      //A
                sentEmbed.react("🇧");      //B
                sentEmbed.react("🇨");      //C
                sentEmbed.react("🇩");      //D
                sentEmbed.react("🇪");      //E
                sentEmbed.react("🇫");      //F
                sentEmbed.react("🇬");      //G
                sentEmbed.react("🇭");      //H
                sentEmbed.react("🇮");      //I
            } else if (!pollargs[22]) {
                sentEmbed.react("🇦");      //A
                sentEmbed.react("🇧");      //B
                sentEmbed.react("🇨");      //C
                sentEmbed.react("🇩");      //D
                sentEmbed.react("🇪");      //E
                sentEmbed.react("🇫");      //F
                sentEmbed.react("🇬");      //G
                sentEmbed.react("🇭");      //H
                sentEmbed.react("🇮");      //I
                sentEmbed.react("🇯");      //J
            }
        })
    }
}       