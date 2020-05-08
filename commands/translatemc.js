const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'Galactic alphabet',
    description: "Translate to Minecraft.",
    /**
     * Translates message to Galactic Alphabet.
     * @param {Object} message The message sent
     * @param {array} args The message arguments
     */
    execute(message, args) {

        /** @param {String} cutMessage the message without the command */
        let cutMessage = message.content.slice(args[0].length + 2);
        
        /** @param {array} splitMessage every letter of the cut message */
        let splitMessage = cutMessage.split("");

        /** @param {String} msg the translated message */
        var msg = "";

        for (const letterL of splitMessage) {
            
            /** @param {String} letter the letter to lower case */
            let letter = letterL.toLowerCase();

            

            switch (letter) {
                case 'a':
                    msg = msg + 'ᔑ'
                break;
                case 'b':
                    msg = msg + 'ʖ'
                break;
                case 'c':
                    msg = msg + 'ᓵ'
                break;
                case 'd':
                    msg = msg + '↸'
                break;  
                case 'e':
                    msg = msg + 'ᒷ'
                break;
                case 'f':
                    msg = msg + '⎓'
                break;  
                case 'g':
                    msg = msg + '⊣'
                break; 
                case 'h':
                    msg = msg + '⍑'
                break;
                case 'i':
                    msg = msg + '╎'
                break;
                case 'j':
                    msg = msg + '⋮'
                break;
                case 'k':
                    msg = msg + 'ꖌ'
                break;
                case 'l':
                    msg = msg + 'ꖎ'
                break;
                case 'm':
                    msg = msg + 'ᒲ'
                break;
                case 'n':
                    msg = msg + 'リ'
                break;
                case 'o':
                    msg = msg + '𝙹'
                break;
                case 'p':
                    msg = msg + '!¡'
                break;
                case 'q':
                    msg = msg + 'ᑑ'
                break;
                case 'r':
                    msg = msg + '∷'
                break;
                case 's':
                    msg = msg + 'ᓭ'
                break;
                case 't':
                    msg = msg + 'ℸ ̣'
                break;
                case 'u':
                    msg = msg + '⚍'
                break;
                case 'v':
                    msg = msg + '⍊'
                break;
                case 'w':
                    msg = msg + '∴'
                break;
                case 'x':
                    msg = msg + '̇/'
                break;
                case 'y':
                    msg = msg + '||'
                break;
                case 'z':
                    msg = msg + '⨅'
                break;

                default:
                    msg = msg + " "
                break;
            }
        }
        message.channel.send(msg);
        message.delete();
        
    }
}