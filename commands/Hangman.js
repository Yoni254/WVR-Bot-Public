const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'Hangman',
    description: "Hangman Game",
    /**
     * A game of hangman
     * @param {Object} message The message sent
     * @param {Array} args array of the message arguments
     */
    execute(message, args) {
        
        /*
        ==============================
        Game Subjects

        ==============================
        */

        const COUNTRY_NAMES = ['CHINA', 'INDIA', 'UNITED STATES', 'INDONESIA', 'PAKISTAN', 'BRAZIL', 'NIGERIA',
                             'BANGLADESH', 'RUSSIA', 'MEXICO', 'JAPAN', 'ETHIOPIA', 'PHILIPPINES', 'EGYPT', 'VIETNAM',
                             'GERMANY', 'TURKEY', 'IRAN', 'THAILAND', 'UNITED KINGDOM', 'FRANCE', 'ITALY', 'SOUTH AFRICA',
                             'SOUTH KOREA', 'SPAIN', 'ARGENTINA', 'UGANDA', 'UKRAINE', 'SUDAN', 'IRAQ', 'POLAND', 'CANADA',
                             'MOROCCO', 'NORTH KOREA', 'AUSTRALIA', 'SYRIA', 'SWEDEN', 'HUNGARY', 'SWITZERLAND',
                             'ISRAEL', 'DENMARK', 'FINLAND', 'NORWAY', 'IRELAND', 'CROATIA', 'ICELAND', 'GREENLAND']
        const VIDEO_GAMES_NAMES = ['MINECRAFT', 'GRAND THEFT AUTO V', 'WII SPORTS', 'PLAYERUNKNOWNS BATTLEGROUNDS',
                             'SUPER MARIO BROS', 'POKEMON', 'TETRIS', 'MARIO KART', 'TERRARIA', 'SKYRIM', 'RED DEAD REDEMPTION',
                             'THE WITCHER', 'FIFA', 'BORDERLANDS', 'CALL OF DUTY', 'THE LAST OF US', 'FALLOUT', 'PACMAN',
                             'THE LEGEND OF ZELDA', 'THE SIMS', 'MORTAL KOMBAT', 'DOOM', 'FINAL FANTASY', 'QUAKE', 'RESIDENT EVIL',
                             'TOMB RAIDER', 'HALF LIFE', 'KINGDOM HEARTS', 'WORLD OF WARCRAFT', 'GOD OF WAR', 'GUITAR HERO',
                             'OBLIVION', 'HALO', 'PORTAL', 'ASSASSINS CREED', 'DARK SOULS', 'BATMAN ARKHAM CITY', 'DISHONORED', 'BLOODBORNE', 'OVERWATCH']
        const FALLOUT = ['LITTLE LAMPLIGHT', 'MEGATON', 'RIVET CITY', 'OASIS', 'CAPITAL WASTELAND', 'BROTHERHOOD OF STEEL',
                         'ENCLAVE', 'CEASARS LEGION', 'GREAT KHANS', 'FOLLOWERS OF THE APOCALYPSE', 'NEW CALIFORNIA REPUBLIC',
                         'THE COMMONWEALTH', 'CONCORD', 'LEXINGTON', 'THE GLOWING SEA', 'DIAMOND CITY', 'GOODNEIGHBOOR', 'ASH HEAP',
                         'CRANBERRY BOG', 'THE FOREST', 'THE MIRE', 'SAVAGE DIVIDE', 'TOXIC VALLEY', 'WATOGA', 'POINT PLEASANT',
                         'MORGANTOWN', 'SUMMERSVILLE', 'FLATWOODS', 'HARPERS FERRY', 'THE WHITESPRING RESORT', 'GRAFTON',
                         'FLATWOODS', 'GHOUL', 'SUPER MUTANT', 'RADSCORPION', 'BRAHMIN', 'MOLE RAT', 'DEATHCLAW', 'YAO GUAI',
                         'FOG CRAWLER', 'MEGA SLOTH', 'SCORCHBEAST', 'HERMIT CRAB', 'HONEY BEAST', 'FLATWOODS MONSTER',
                         'GRAFTTON MONSTER', 'MOTHMAN', 'WENDIGO', 'SNALLYGASTER', 'SHEEPSQUATCH', 'INTERLOPER', 'THE INSTITUTE', 
                         'ATOM CATS', 'GUNNERS', 'RESPONDERS', 'FREE STATES', 'ORDER OF MYSTERIES', 'CULT OF THE MOTHMAN', 'DOGMEAT', 
                         'I DONT WANT TO SET THE WORLD ON FIRE', 'BUTCHER PETE', 'ITS ALL OVER BUT THE CRYING', 'URANIUM FEVER', 
                         'BIG IRON', 'ITS A MAN', 'MAYBE', 'CRAWL OUT THROUGH THE FALLOUT', 'THE WANDERER', 'VAULT TEC', 
                         'SIXTY MINUTE MAN', 'LONE WANDERER', 'NICK VALENTINE', 'VAULT DWELER', 'ELDER ARTHUR MAXON', 'PIPER WRIGHT', 
                         'JOSHUA GRAHAM', 'MEDISON LI', 'SOLE SURVIVOR', 'CONRAD KELLOGG', 'MAMA MURPHY', 'ELDER LYONS', 'APPALACHIA']
        const ANIMALS = ['COYOTE', 'LYNX', 'OCTOPUS', 'PENGUIN', 'STARFISH', 'ARCTIC WOLF', 'GRIZZLY BEAR', 
                        'JAGUAR', 'KILLER WHALE', 'PUFFER FISH', 'TIGER', 'CAT', 'CHINCHILLA', 'COW', 'DUCK', 'HAMSTER', 
                        'ANTELOPE', 'CHAMELEON', 'CHEETAH', 'GIRAFFE', 'KOALA', 'LION', 'PANTHER', 'PANDA', 'RHINOCEROS',
                        'OCELOT', 'POLAR BEAR', 'MONKEY', 'DOLPHIN', 'SLOTH', 'WOLF', 'DEER', 'SHARK', 'HORSE', 'EAGLE', 
                        'BAT', 'RABBIT', 'ELEPHANT', 'TURTLE', 'FROGS', 'LLAMA', 'HIPPOPOTAMUS', 'SNAKE', 'ORANGURAN', 'GOAT']
        const USA_CITIES = ['NEW YORK', 'LOS ANGELES', 'CHICAGO', 'HOUSTON', 'PHOENIX', 'PHILADELPHIA', 'SAN ANTONIO',
                        'SAN DIEGO', 'DALLAS', 'SAN JOSE', 'AUSTIN', 'JACKSONVILLE', 'FORT WORTH', 'COLUMBUS', 'SAN FRANCISCO', 
                        'CHARLOTTE', 'INDIANAPOLIS', 'SEATTLE', 'DENVER', 'WASHINGTON', 'BOSTON', 'EL PASO', 'DETROIT', 'NASHVILLE', 
                        'PORTLAND', 'MEMPHIS', 'OKLAHOMA CITY', 'LAS VEGAS', 'LOUISVILLE', 'BALTIMORE', 'MILWAUKEE', 'ALBUQUERQUE', 
                        'TUCSON', 'FRESNO', 'MESA', 'SACRAMENTO', 'ATLANTA', 'KANSAS CITY', 'COLORADO SPRINGS', 'MIAMI', 'RALEIGH', 
                        'OMAHA', 'LONG BEACH', 'VIRGINIA BEACH', 'OAKLAND', 'MINNEAPOLIS', 'TULSA' ,'ARLINGTOM', 'TAMPA', 'NEW ORLEANS', 
                        'WICHITA', 'CLEVELAND', 'BAKERSFIELD', 'AURORA', 'ANAHEIM', 'HONOLULU', 'SANTA ANA', 'RIVERSIDE', 'CORPUS CHRISTI', 
                        'LEXINGTON', 'STOCKTON', 'HENDERSON', 'SAINT PAUL', 'ST LOUIS', 'CINCINNATI', 'PITTSBURGH', 'GREENSBORO', 'ANCHORAGE', 'PLANO']
        const FAMOUS_LOCATIONS = ['FORBIDDEN CITY', 'PALACE OF VERSAILLES', 'LINCOLN MEMORIAL', 'COLOSSEUM', 'PARTHENON', 'TAJ MAHAL', 
                                'EIFFEL TOWER', 'PETERHOF PALACE', 'VIETNAM VETERANS MEMORIAL', 'STATUE OF LIBERTY', 'TOWER OF LONDON', 
                                'MOSCOW KREMLIN', 'GREAT WALL OF CHINA', 'TOWER OF PISA', 'GREAT PYRAMID OF GIZA', 'SYDNEY OPERA HOUSE', 
                                'BIG BEN', 'EMPIRE STATE BUILDING', 'GOLDEN GATE BRIDGE', 'NOTRE DAME', 'TOKYO TOWER', 'LONDON EYE', 
                                'ST PETERS BASILICA', 'BERLIN WALL', 'STONEHENGE', 'GREAT SPHINX', 'TOWER BRIDGE', 'MOUNT EVEREST', 
                                'CAPITOL HILL', 'BROOKLYN BRIDGE', 'TREVI FOUNTAIN', 'TIMES SQUARE', 'THE WHITE HOUSE', 'BUCKINGHAM PALACE', 
                                'CHRIST THE REDEEMER STATUE', 'THE GRAND CANYON', 'NIAGRA FALLS', 'BURG KHALIFA', 'CENTRAL PARK', 'MOUNT RUSHMORE', 
                                'MOUNT FUJI', 'PENTAGON', 'WAILING WALL', 'MECCA', 'SPANISH STEPS', 'OXFORD UNIVERSITY']
        const FAMOUS_CITIES = ['NEW YORK', 'PARIS', 'ROME', 'LONDON', 'JERUSALEM', 'BANGKOK', 'PRAGUE', 'BERLIN', 'AMSTERDAM', 
                                'MADRID', 'MUNICH', 'VIENNA', 'WASHINGTON DC', 'BRUSSELS', 'TEL AVIV', 'BARCELONA', 'ISTANBUL,', 
                                'SYDNEY', 'RIO DE JANERIO', 'VENICE', 'BUDAPEST', 'SEVILE', 'GRANADA', 'SAN FRANCISCO', 'CAPE TOWN', 
                                'HONG KONG', 'BUENOS AIRES', 'FLORENCE', 'TOKYO', 'CAIRO', 'TORONTO', 'ATHENS', 'MELBOURNE', 
                                'KATHMANDU', 'MONTREAL', 'EDINBURGH', 'HANOI', 'SINGAPORE', 'DUBLIN', 'MEXICO CITY', 'KRAKOW', 
                                'LAS VEGAS', 'HAVANA', 'SARAJEVO', 'LOS ANGELES', 'STOCKHOLM', 'CHICAGO', 'LISBON', 'NEW ORLEANS', 
                                'HO CHI MINH', 'MARRAKECH', 'KYOTO', 'MOSCOW', 'SHANGHAI', 'SEATTLE', 'BEIJING', 'HELSINKI', 
                                'ST PETERSBURG', 'FES', 'PHNOM PENH', 'CUSCO', 'VARANASI', 'LUANG PRABANG', 'DUBROVNIK', 'NEW DELHI', 
                                'SALVADOR DA BAHIA', 'KOLKATA', 'SANTIAGO', 'AUCKLAND', 'MANILA', 'ZNZIBAR', 'MUMBAI', 'HAMBURG', 
                                'WELLINGTON', 'LJUBLJANA', 'SEOUL', 'TAIPEI', 'TALLINN', 'LHASA', 'BLED', 'SIENA', 'JAIPUR', 'LA PAZ', 
                                'QUEBEC', 'NAPLES', 'HEIDELBERG', 'PANAMA CITY', 'MONACO', 'QUITO', 'BERN', 'CARTAGENA', 'HOBART', 'VALPARAISO']
        const MOVIES = ['BLACK PANTHER', 'AVENGERS END GAME', 'US', 'TOY STORY', 'LADY BIRD', 'THE WIZARD OF OZ', 'MISSION IMPOSSIBLE FALLOUT', 
                        'THE IRISHMAN', 'CITIZEN KANE', 'BLACKKKKLANSMAN', 'GET OUT', 'SPIDER MAN INTO THE SPIDER VERSE', 'MAD MAX FURY ROAD', 
                        'MOONLIGHT', 'MODERN TIMES', 'CASABLANCE', 'BOOKSMART', 'A STAR IS BORN', 'THE FAREWELL', 'WANDER WOMAN', 'IT HAPPENED ONE NIGHT', 
                        'DUNKIRK', 'THE THIRD MAN', 'INSIDE OUT', 'EIGHTH GRADE', 'LE GRANDE ILLUSION', 'ROME', 'COCO', 'SPOTLIGHT', 'THE GODFATHER', 
                        'A QUIET PLACE', 'SNOW WHITE AND THE SEVEN DWARFS', 'STAR WARS THE LAST JEDI', 'SELMA', 'ET THE EXTRA TERRESTRIAL', 'SINGIN IN THE RAIN', 
                        'ALL ABOUT EVE', 'THE SHAPE OF WATER', 'THOR RAGNAROK', 'ARRIVAL', 'KING KONG', 'SPIDER MAN FAR FROM HOME', 'LOGAN', 'THE BRIDE OF FRANKENSTEIN', 
                        'THE BIG SICK', 'INCREDIBLES', 'SHADOW OF A DOUBT', 'CALL ME BY YOUR NAME', 'THE FAVOURITE', 'PADDINGTON', 'STAR WARS THE FORCE AWAKENS', 
                        'THE ADVENTURES OF ROBIN HIID', 'GRAVITY', 'LAURA', 'LEAVE NO TRACE', 'BOYHOOD', 'ALIEN', 'ONCE UPON A TIME IN HOLLYWOOD', 'TOP HAT', 
                        'MANCHESTER BY THE SEA', 'ARGO', 'THE MALTESE FALCON', 'A HARD DAYS NIGHT', 'THE BATTLE OF ALGIERS', 'BABY DRIVER', 'ZOOTOPIA', 
                        'WAR FOR THE PLANET OF THE APES', 'LA LA LAND', 'THE PHILADELPHIA STORY', 'THE FLORIDA PROJECT', 'METROPOLIS', 'SPIDER MAN HOMECOMING', 
                        'WIDOWS', 'SHAZAM', 'IP', 'CAPTAIN AMERICA CIVIL WAR', 'THE DARK KNIGHT', 'STAR WARS A NEW HOPE', 'STAR WARS THE EMPIRE STRIKES BACK', 
                        'JAWS', 'BLADE RUNNER', 'THE SHINING', 'THE LORD OF THE RINGS THE RETURN OF THE KING', 'ALIEN', 'FORREST GUMP', 'INCEPTION']
        
        const STAGE = [
"x-------x", 
`x-------x
|
|
|
|
|`, 
`x-------x
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0|
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa00
|
|
|`, 
        `x-------x
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0|
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa00
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0|
|
|`, 
`x-------x
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0|
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa00
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0/|\\ 
|
|`, 
`x-------x
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0|
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa00
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0/|\\ 
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0/
|`, 
`x-------x
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0|
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa00
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0/|\\ 
|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0/ \\
|`]



        async function start(subject, msg, subjectName) {

            async function mainGameLoop() {
                lastTry = answerArray.join("")
                if (userInput.length > 0) {
                    for(var i = 0; i < word.length; ++i){
                        if(userInput[userInput.length-1] == word[i]) {
                            answerArray[i] = userInput[userInput.length-1]
                        }
                            
                    }
                }
                text = answerArray.join("")
                // Check if got wrong
                if (text == lastTry && userInput.length > 0) {
                    console.log("Player guessed wrong - " + userInput[userInput.length-1]);
                    
                    playerStage++
                }
                let mainGame = new Discord.MessageEmbed()
                mainGame.setAuthor(text + " | Subject - " + subjectName)
                if (playerStage < 5) {
                    mainGame.setColor("00B903")
                } else {
                    mainGame.setColor("BA0A0F")
                }
                if (text == word) {
                    mainGame.setColor("e5be18")
                } else if (playerStage == 6) {
                    mainGame.setColor("000000")
                }
                mainGame.addField('Already Tried', userInput.join(", ") + ".")
                mainGame.setDescription(STAGE[playerStage] + "\n\nSend the letter you wish to try in chat!")
                await msg.edit(mainGame)
                if (text == word) {
                    message.channel.send("You Won!")
                } else if (playerStage >= 6) {
                    message.channel.send("You Lost :( \nAnswer - " + word)
                } else {
                    waitForResponse()
                }
                
            }

            async function waitForResponse() {
                sent = false
                const collector = message.channel.createMessageCollector(filter, {time: 60000})
                collector.on('collect', m => {
                    //Count times in array
                    var count = 0;
                    for(var i = 0; i < userInput.length; ++i){
                        if(userInput[i] == m.content[0].toUpperCase())
                            count++;
                    }
                    // if never tried goo
                    if (!m.content.match(/[A-Za-z]/)) {
                        message.channel.send("Invalid input")
                    } else if (count == 0) {
                        sent = true
                        userInput.push(m.content[0].toUpperCase())
                        m.delete()
                        collector.stop()
                        mainGameLoop()
                    } else {
                        message.channel.send("you already tried this letter.")
                    }
                    
                });
                collector.on('end', collected => {
                    if (!sent) {
                        message.channel.send("User not here. game over")
                    }

                });
            }


            await msg.reactions.removeAll()

            // Pick a word from theme
            index = Math.floor(Math.random() * subject.length)
            var word = subject[index]
            
            console.log(`Playing hangman - ${word}`);
            var playerStage = 0
            let answerArray = []

            for (var i = 0; i < word.length; i++) {
                if (word[i] == " ") {
                    answerArray.push(" ")
                } else {
                    answerArray.push("_ ")
                }
            }

            // Create message collector
            const filter = m => m.author.id == message.author.id

            var userInput = []
            



            await mainGameLoop()
            
        }

        
        async function startHangmanGame(msg) {
            let startGame = new Discord.MessageEmbed()
            startGame.setTitle("Please select a subject!")
            startGame.setColor("00B903")
            startGame.addField("React to choose", "1. Country Names \n2. Video Games Names \n3. Fallout \n4. Animals \n5. USA Cities \n6. World Landmarks \n7. Famous Cities \n8. Movies")
            msg.edit(startGame).then(subjectPickingMessage => {
                subjectPickingMessage.react('1⃣')
                subjectPickingMessage.react('2⃣')
                subjectPickingMessage.react('3⃣')
                subjectPickingMessage.react('4⃣')
                subjectPickingMessage.react('5⃣')
                subjectPickingMessage.react('6⃣')
                subjectPickingMessage.react('7⃣')
                subjectPickingMessage.react('8⃣')

                // Reaction Collector
                const filter = (reaction, user) => {
                    return true && user.id == message.author.id
                }
                const collector = subjectPickingMessage.createReactionCollector(filter, {time : 30000})
                reacted = false
                collector.on('collect', (reaction, reactionCollector) => {
                    reacted = true
                    console.log(`Collected ${reaction.emoji.name}`);
                    if (reaction.emoji.name == '1⃣') {
                        start(COUNTRY_NAMES, subjectPickingMessage, "Country Names")
                        collector.stop()
                    } else if (reaction.emoji.name == '2⃣') {
                        start(VIDEO_GAMES_NAMES, subjectPickingMessage, "Video Games Names")
                        collector.stop()
                    } else if (reaction.emoji.name == '3⃣') {
                        start(FALLOUT, subjectPickingMessage, "Fallout")
                        collector.stop()
                    } else if (reaction.emoji.name == '4⃣') {
                        start(ANIMALS, subjectPickingMessage, "Animals")
                        collector.stop()
                    } else if (reaction.emoji.name == '5⃣') {
                        start(USA_CITIES, subjectPickingMessage, "USA Cities")
                        collector.stop()
                    } else if (reaction.emoji.name == '6⃣') {
                        start(FAMOUS_LOCATIONS, subjectPickingMessage, "World Landmarks")
                        collector.stop()
                    } else if (reaction.emoji.name == "7⃣") {
                        start(FAMOUS_CITIES, subjectPickingMessage, "Famous Cities") 
                    } else if (reaction.emoji.name == "8⃣") {
                        start(MOVIES, subjectPickingMessage, "Movies")
                    } else {
                        reacted = false
                    }
                })

                collector.on('end', collected => {
                    if (!reacted) {
                        message.channel.send("Game stopped user left.")
                    }
                    
                })

            })
        }
        


        // Code start (lol)
        let embed = new Discord.MessageEmbed();
        embed.setTitle("Welcome to the Hangman Game")
        embed.setDescription(`With 8 different subjects and ${COUNTRY_NAMES.length + VIDEO_GAMES_NAMES.length + FALLOUT.length + ANIMALS.length + USA_CITIES.length + FAMOUS_LOCATIONS.length + MOVIES.length + FAMOUS_CITIES.length} different words. \n\nFor suggestions or problems DM Yonatan25#4752`)
        embed.setColor("BA0A0F")

        message.channel.send(embed).then(msg => {
            setTimeout(startHangmanGame, 5000, msg)
        })

    }
}