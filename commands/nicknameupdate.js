const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'NicknameUpdate',
    description: "Checks if user updated nickname without a role",
    execute(oldMember, newMember) {
        
        if(newMember.guild.id !== '437056044796215298') return;

        if(oldMember.nickname == newMember.nickname) return;
        if(!newMember.nickname) return console.log('Emtpy nickname')        //check for no nickname
        if((newMember.nickname.includes('gov') || newMember.nickname.includes('Gov') || newMember.nickname.includes('Governor') || newMember.nickname.includes('governor') || newMember.nickname.includes('GOV')) && !(newMember.roles.has("493801161569075201") || newMember.roles.has("488440251824734218") || newMember.roles.has("493801323792302097"))) {
            newMember.setNickname(oldMember.displayName);       //gov
            newMember.send('Hey, looks like you tried to change your nickname to \'Governor\' without having the role! this is not allowed on the server your nickname has been changed back.');
        }
        if((newMember.nickname.includes('maj') || newMember.nickname.includes('Maj') || newMember.nickname.includes('Major') || newMember.nickname.includes('major') || newMember.nickname.includes('MAJ') || newMember.nickname.includes('mjr') || newMember.nickname.includes('MJR') || newMember.nickname.includes('Mjr')) && !(newMember.roles.has("488440179871449138") || newMember.roles.has("493801268779810817") || newMember.roles.has("493801400661180448"))) {
            newMember.setNickname(oldMember.displayName);       //maj
            newMember.send('Hey, looks like you tried to change your nickname to \'Major\' without having the role! this is not allowed on the server your nickname has been changed back.');
        }

        if((newMember.nickname.includes('Director') || newMember.nickname.includes('director') || newMember.nickname.includes('DOCA') || newMember.nickname.includes('doca') || newMember.nickname.includes('DOMA') || newMember.nickname.includes('doma')) && !(newMember.roles.has("615041600992837662") || newMember.roles.has("518977167665922060") || newMember.roles.has("518977004067094528") || newMember.roles.has('581106776959614976'))) {
            newMember.setNickname(oldMember.displayName);       //Director
            newMember.send('Hey, looks like you tried to change your nickname to \'Major\' without having the role! this is not allowed on the server your nickname has been changed back.');
        }
    }
}