require('../index')
const fcheck = require('../functions/check')

/**
 * @module cache Stores Every member's last message information
 */
module.exports = {

    /**
     * Stores the message in cache
     * @param message the message sent
     */
    async storeMessage(message) {
        //Check if Bot
        if (await fcheck.isBot(message.author)) return
        date = [message.createdAt.getDate(), message.createdAt.getMonth(), message.createdAt.getFullYear()].join('/')
        RedisClient.set("Last Message "+message.member.id, message.content + "," + date)
    },

    /**
     * Deletes cache when user Leaves Server
     * @param member the user that left
     */
    async RemoveCache(member) {
        RedisClient.del("Last Message "+member.id, Redis.print)
    }


}