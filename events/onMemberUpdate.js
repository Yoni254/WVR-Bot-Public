const fcheck = require('../functions/check');

module.exports = {

    async bannedNickname(oldMember, newMember) {

        /**
         * Detects user update checks for WVR server and if nickname is 'legal'
         * @param {object} oldMember the user before the change
         * @param {object} newMember the user after the change
         */

        //try to run
        try {
            //check for specific server - WVR
            if (await fcheck.isServerId(newMember, '437056044796215298') == 'false') return;

            //check if nickname was changed
            if(oldMember.nickname == newMember.nickname) return;
            //check for no nickname
            if(!newMember.nickname) return console.log('Emtpy nickname')        

            //check for gov
            if((newMember.nickname.includes('gov') || newMember.nickname.includes('Gov') || newMember.nickname.includes('Governor') || newMember.nickname.includes('governor') || newMember.nickname.includes('GOV')) && !(newMember.roles.has("493801161569075201") || newMember.roles.has("488440251824734218") || newMember.roles.has("493801323792302097") || newMember.roles.has("509790633276473377"))) {
                //return to the old nickname
                newMember.setNickname(oldMember.displayName);       
                //send a DM
                newMember.send('Hey, looks like you tried to change your nickname to \'Governor\' without having the role! this is not allowed on the server your nickname has been changed back.');
            }

            //check for maj
            if((newMember.nickname.includes('maj') || newMember.nickname.includes('Maj') || newMember.nickname.includes('Major') || newMember.nickname.includes('major') || newMember.nickname.includes('MAJ') || newMember.nickname.includes('mjr') || newMember.nickname.includes('MJR') || newMember.nickname.includes('Mjr')) && !(newMember.roles.has("488440179871449138") || newMember.roles.has("493801268779810817") || newMember.roles.has("493801400661180448") || newMember.roles.has("509786065633017866"))) {
                //return to the old nickname
                newMember.setNickname(oldMember.displayName);       //maj
                //send a DM
                newMember.send('Hey, looks like you tried to change your nickname to \'Major\' without having the role! this is not allowed on the server your nickname has been changed back.');
            }

            //check for director
            if((newMember.nickname.includes('Director') || newMember.nickname.includes('director') || newMember.nickname.includes('DOCA') || newMember.nickname.includes('doca') || newMember.nickname.includes('DOMA') || newMember.nickname.includes('doma')) && !(newMember.roles.has("615041600992837662") || newMember.roles.has("518977167665922060") || newMember.roles.has("518977004067094528") || newMember.roles.has('581106776959614976'))) {
                //return to the old nickname
                newMember.setNickname(oldMember.displayName);       //Director
                //send a DM
                newMember.send('Hey, looks like you tried to change your nickname to \'Director\' without having the role! this is not allowed on the server your nickname has been changed back.');
            }
        }
        //catch errors
        catch (err) {
            //log the error
            console.log('Error with nickname ban: ' + err);
        }

    }
}