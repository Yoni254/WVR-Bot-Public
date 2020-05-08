require('../index')

/** @module fcheck different chacks for Discord bot */
module.exports = {

    /** 
     * check if message author is a bot
     * @param {object} author the message author
     * @returns 'true' if author is bot
     * @returns 'false' if user is not a bot
     */
    async isBot(author) {

        //check if a bot
        //if (await fcheck.isBot(message.author) == 'true') return console.log('bots can\'t use this command');

        
        //defult result
        result = false

        try {
            //check if a bot
            if (author.bot) {
                //return true if yes
                result = true;
            }
            //other wise
            else {
                //return false 
                result = false;
            }
        }
        //in case of an error
        catch (err) {
            //console log the error
            console.log('Error in isBot(): ' + err);
            result = false

            //try send error message in channel
            try {
                message.channel.send('Error: ' + err)
            }
            //catch error sending message
            catch (err) {
                //log the error
                console.log('Error sending err message in isBot(): ' + err)
            }
        }
        finally {
            //send the result
            return result;
        }
    },


    /**check the channel type
    * @param {object} channel the message was sent in
    * @returns 'false' if not text channel
    * @returns 'true' if in text channel
    */
    async isText(channel) {

        //check if a text channel
        //if (await fcheck.isText(message.channel) == 'false') return console.log('Not in a text channel');


        //defult for result
        result = false

        try {

            //check for channel type
            if (channel.type == 'text') {
                //return true if yes
                result = true;
            }
            else {
                //return false if not
                result = false;

            }

        }
        //catch errors
        catch (err) {
            //console log the error
            console.log('Error in isText(): ' + err);
            return false;
        }
        finally {
            //return the result
            return result;
        }

    },

    /** checks if member is a bot dev
     * @param {object} member the member that send the message
     * @returns 'true' if user is a Dev
     * @returns 'false' if iser is not a dev
     */
    async isDev(member) {

        //check if a dev
        //if (await fcheck.isDev(message.author, bot) == 'false') return console.log('This command is for dev onle');


        //defult for result
        result = false

        try {
            //dev role - [539780500110311425] - @admin
            let devRole = '539780500110311425';

            //dev guild = [539779661425803265] - bot test server
            let devGuild = Client.guilds.get("539779661425803265");

            //look for the member in the guild
            //if member is not in the server goes to catch (err) (line 111)
            let serMember = devGuild.members.get(member.id);

            //checks if the member has the role
            if (serMember.roles.has(devRole)) {
                result = true;
            }

        }
        //catch any errors
        catch (err) {
            //if got an error return false
            result = false
            //log the error
            console.log('DevCheck Error: ' + err)

            //try sending an error message
            try {
                //send error message
                message.channel.send('Error: ' + err)
            }
            //catch any errors sending error message
            catch (err) {
                //log the error
                console.log('Error sending error message isDev: ' + err)
            }
        }
        finally {
            //return the result
            return result;

        }
    },


    /** checks if the message was sent in a guild
     * @param {object} message the message that is checked
     * @returns 'false' if message is not in a server/guild
     * @returns 'true' if message is in a server/guild
     */
    async isGuild(message) {

        //check if server
        //if (await fcheck.isGuild(message) == 'false') return console.log('You need to be in a server to use this')      

        //defult result 
        result = false;

        try {
            //if guild 
            if (message.guild) {
                //set to true
                result = true;
            }
            //else?
            else {
                result = false;
            }
        }
        //catch erros
        catch (err) {
            console.log('Error in isGuild: ' + err);
            result = false;

            //try to send an error message in chat
            try {
                //send an error message
                message.channel.send('Error: ' + err);
            }
            //catch any errors with sending error message
            catch (err) {
                //log the error
                console.log('Error sending message isGuild(): ' + err);
            }
        }
        finally {
            //return the result
            return result;
        }
    },


    /** Checks if a specific server by server id
     * @param {object} message the message that was sent
     * @param {String} serverID the server needed
     * @returns 'false' if not in specific server
     * @returns 'true' if in specific server
     */
    async isServerId(message, serverID) {

        //checks if a specific server by id
        //if (await fcheck.isServerId(message, 'id') == 'false') return console.log('command is not for this server');
       

        /** @param {String} result what the function returns */
        result = false;

        //try running
        try {
            //check if the id matches
            if (message.guild.id == serverID) {
                //returns true if mathces
                result = true;
            }
            //if they don't match
            else {
                //returns false 
                result = false;
            }
        }
        //in case of an error
        catch (err) {
            //return false
            result = false;

            //try to send an error message
            try {
 
            }
            //catch error sending error info
            catch (err) {
                console.log('Error with sending error message isServerId(): ' + err);
            }
        }
        finally {
            //return the result
            return result;
        }
    },


    /** Checks if message author is specific user by id
     * @param {object} author the message author
     * @param {String} authorID the user id allowed to use the command
     * @returns 'false' if no specific author
     * @returns 'true' if specific author
     */
    async isAuthorId(author, authorID) {

        //checks if specific user
        //if (!await fcheck.isAuthorId(message.author, 'id')) return console.log('User not allowed to use this');
   

        //Defult result 
        result = false;

        //try to check
        try {
            //Check the id
            if (author.id === authorID) {
                //result is true if id match
                result = true;
            }
            //if they don't match
            else {
                //result is false
                result = false;
            }
        }
        //catch any errors
        catch (err) {
            //log the Error
            console.log('Error in isAuthorId: ' + err);
            //return false
            result = false;
        }
        finally {
            //return the result
            return result;
        }
    },


    /** Checks if message author is specific user by id
     * @param {object} channel the message author
     * @param {String} channelId the user id allowed to use the command
     * @returns 'true' if specific channel
     * @returns 'false' if no specific channel
     */
    async isChannelId(channel, channelId) {

        //checks if specific channel
        //if (await fcheck.isChannelId(message.channel, 'id') == 'false') return console.log('command is not for this channel');

        
        //Defult result 
        result = false;

        //try to check
        try {
            //Check the id
            if (channel.id === channelId) {
                //result is true if id match
                result = true;
            }
            //if they don't match
            else {
                //result is false
                result = false;
            }
        }
        //catch any errors
        catch (err) {
            //log the Error
            console.log('Error in isChannelId: ' + err);
            //return false
            result = false;
        }
        finally {
            //return the result
            return result;
        }
    },


    /**
     * Checks if message author is WVR leadership
     * @param {Object} message 
     */
    async isWVRLeadership(message) {
        isLeader = false
        // Try to run
        try {
            console.log(LeaderRoles);
            LeaderRoles.forEach(role => {
                if (message.member.roles.has(role)) {
                    isLeader = true
                }
            });
            
        }
        // Log errors
        catch (err) {
            console.log(err);
        }
        finally {
            return isLeader
        }
    }
}