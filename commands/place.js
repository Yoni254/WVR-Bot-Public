require('../index')
module.exports = {
    name: 'Place',
    description: "WVR Placing command",
    /** WVR Placement command
     * @param {object} message the message that was sent
     * @param {array} args the arguments of the command

     */
    execute(message, args) {


        //try to run the command
        try {
            //if user has manage roles permission or KCMe role [562020358065225728]- Knight Circle Member Elect
            if(message.member.hasPermission('MANAGE_ROLES') || message.member.roles.find(role => role.id === '562020358065225728')){

                //Recruit is the mentioned user
                /** @param {object} Recruit the User that is being placed */
                var Recruit = message.mentions.members.first();
                //return if no recruit
                if(!Recruit) return message.channel.send('Error no user');


                /**Remove the Roles */
                /** @param {object} role the role being added / removed */
                var role; 

                //Remove Recruit Role
                var role = message.guild.roles.find(r => r.name === 'Recruit');
                Recruit.roles.remove(role);

                //Remove Messages Role
                var role = message.guild.roles.find(r => r.name === 'Messaged');
                Recruit.roles.remove(role);

                //Remove Kicked Role
                var role = message.guild.roles.find(r => r.name === 'LOA');
                Recruit.roles.remove(role);

                //Remove LOA Role
                var role = message.guild.roles.find(r => r.name === 'Kicked');
                Recruit.roles.remove(role);


                /** Give the 'Basic' Role */
        
                /** @param {String} roleName the name of the role that was given to the recruit */
                var roleName;


                //Check if the role is Visitor Visa
                if(args[2] === 'Visitor' || args[2] === 'visitor'  || args[2] === 'Visit' || args[2] === 'visit' ||  args[2] === 'visa' ||  args[2] === 'Visa' ||  args[2] === 'v' ||  args[2] === 'V') {
                    //add Visa role
                    var role = message.guild.roles.find(r => r.name === 'WVR Visitors Visa');
                    Recruit.roles.add(role);

                    //Say that finished
                    message.channel.send('Done!');
                    
                    //return
                    return;
                }

                //Check if Soldier
                if(args[2] === 'Soldier' || args[2] === 'soldier' || args[2] === 'so' || args[2] === 'So'){
                    //Give Soldier
                    var role = message.guild.roles.find(r => r.name === 'Soldier');
                    Recruit.roles.add(role)
                    //given role is Soldier
                    var roleName = 'Soldier';

                //Check if Scavenger
                }else if(args[2] === 'Scavenger' || args[2] === 'scavenger' || args[2] === 'sc' || args[2] === 'Sc' || args[2] === 'Scav' || args[2] === 'scav'){
                    //Give Scavenger
                    var role = message.guild.roles.find(r => r.name === 'Scavenger');
                    Recruit.roles.add(role)
                    //Given role is Scavenger
                    var roleName = 'Scavenger';

                //Check if Medic
                }else if(args[2] === 'Medic' || args[2] === 'medic' || args[2] === 'm' || args[2] === 'M'){
                    //Give Medic
                    var role = message.guild.roles.find(r => r.name === 'Medic');
                    Recruit.roles.add(role)
                    //Given Role is Medic
                    var roleName = 'Medic';

                //check if Engineer
                }else if(args[2] === 'Engineer' || args[2] === 'engineer' || args[2] === 'E' || args[2] === 'e'){
                    //Give Engineer
                    var role = message.guild.roles.find(r => r.name === 'Engineer');
                    Recruit.roles.add(role)
                    //Given role is Engineer
                    var roleName = 'Engineer'

                //if No known role is in args[2]
                }else{
                    //return error message
                    return message.channel.send('Error, No Basic Role');
                }


                /** Give Platform Role and send message in chat */


                //Check if Xbox
                if(args[3] === 'Xbox' || args[3] === 'xbox' || args[3] === 'X' || args[3] === 'x' || args[3] === 'Xbox1' || args[3] === 'Xb1' || args[3] === 'xb1' || args[3] === 'xbox1'){
                    //Get Xbox Role
                    var role = message.guild.roles.find(r => r.name === 'Xbox');
                    //Go to Xbox chat and send message
                    Client.channels.get(`493444814717845504`).send('New '+roleName+' '+`${Recruit}`);
                    //Give Xbox Role
                    Recruit.roles.add(role);

                //Check if PS
                }else if(args[3] === 'PS' || args[3] === 'ps' || args[3] === 'Ps' || args[3] === 'PS4' || args[3] === 'Ps4' || args[3] === 'ps4'){
                    //Get PS Role
                    var role = message.guild.roles.find(r => r.name === 'PS4');
                    //Go to PS chat and send message
                    Client.channels.get(`533532176159997952`).send('New '+roleName+' '+`${Recruit}`);
                    //Give PS Role
                    Recruit.roles.add(role);

                //Check if PC
                }else if(args[3] === 'PC' || args[3] === 'pc' || args[3] === 'Pc'){
                    //Get PC Role
                    var role = message.guild.roles.find(r => r.name === 'PC');
                    //Go to PC chat and send message
                    Client.channels.get(`493436428911378442`).send('New '+roleName+' '+`${Recruit}`);
                    //Give PC Role
                    Recruit.roles.add(role);

                //if No platform in args[3]
                }else{
                    //return error message
                    return message.channel.send('Error, no Platform Role')
                }
                   
                
                /** Giving the Time Zone Roles */

                //Check if +11 Time
                if(args[4] === '+11'){
                    //Give +11 Time
                    var role = message.guild.roles.find(r => r.name === '+11 Time');
                    Recruit.roles.add(role);

                //Check if +10 Time
                }else if(args[4] === '+10'){
                    //Give +10 Time
                    var role = message.guild.roles.find(r => r.name === '+10 Time');
                    Recruit.roles.add(role);

                //Check if +4 Time
                }else if(args[4] === '+7'){
                    //Give +7 Time
                    var role = message.guild.roles.find(r => r.name === '+7 Time');
                    Recruit.roles.add(role);

                //Check if +4 Time
                }else if(args[4] === '+4'){
                    //Give +4 Time
                    var role = message.guild.roles.find(r => r.name === '+4 Time');
                    Recruit.roles.add(role);

                //Check if +3 Time
                }else if(args[4] === '+3'){
                    //Give +3 Time
                    var role = message.guild.roles.find(r => r.name === '+3 Time');
                    Recruit.roles.add(role);

                //Check if +2 Time
                }else if(args[4] === '+2'){
                    //Give +2 Time
                    var role = message.guild.roles.find(r => r.name === '+2 Time');
                    Recruit.roles.add(role);

                //Check if +1 Time
                }else if(args[4] === '+1'){
                    //Give +1 Time
                    var role = message.guild.roles.find(r => r.name === '+1 Time');
                    Recruit.roles.add(role);

                //Check if 0 Time
                }else if(args[4] === '0' || args[4] === '~0'){
                    //Give ~0 Time
                    var role = message.guild.roles.find(r => r.name === '~0 Time');
                    Recruit.roles.add(role);

                //Check if -3 Time
                }else if(args[4] === '-3'){
                    //Give -3 Time
                    var role = message.guild.roles.find(r => r.name === '-3 Time');
                    Recruit.roles.add(role);

                //Check if -4 Time
                }else if(args[4] === '-4'){
                    //Give -4 Time
                    var role = message.guild.roles.find(r => r.name === '-4 Time');
                    Recruit.roles.add(role);

                //Check if -5 Time
                }else if(args[4] === '-5'){
                    //Give -5 Time
                    var role = message.guild.roles.find(r => r.name === '-5 Time');
                    Recruit.roles.add(role);

                //Check if -6 Time
                }else if(args[4] === '-6'){
                    //Give -6 Time
                    var role = message.guild.roles.find(r => r.name === '-6 Time');
                    Recruit.roles.add(role);

                //Check if -7 Time
                }else if(args[4] === '-7'){
                    //Give -7 Time
                    var role = message.guild.roles.find(r => r.name === '-7 Time');
                    Recruit.roles.add(role);

                //Check if -8 Time
                }else if(args[4] === '-8'){
                    //Give -8 Time
                    var role = message.guild.roles.find(r => r.name === '-8 Time');
                    Recruit.roles.add(role);

                //If no Registered Time Zones
                }else{
                    //return if no Time zone
                    return message.channel.send('I couldn\'t Find the Time zone you were asking for')
                }
                        
                //Get the Placement cash Message
                RedisClient.get(message.guild+'placedm', function(err, result) {
                    //Throw errors
                    if(err) throw err;

                    //DM the message
                    Recruit.send(result);
                })
    
                //Send when finished
                message.channel.send('Done!')
    
            //If User is missing permission
            } else {
                //Send Error message
                message.channel.send('Woops looks like you cant use this command');
            }
        }
        //catch any errors
        catch (err) {
            //log the Error
            console.log(err)
            //try sending the Error message
            try {
                //Send an Error Message
                message.channel.send('Error: ' + err);
            }
            //catch error sending error message
            catch (err) {
                //log the Error
                console.log('Error sending Error message for Place command: ' + err);
            }
        }       
    }
}