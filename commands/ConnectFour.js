const Discord = require('discord.js');      //discord bots
module.exports = {
    name: 'ConnectFour',
    description: "a simple connect four game. 2 players",
    execute(message, args) {
        
        var GameBoard = [
                    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
                    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
                    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
                    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
                    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
                    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"]]
        
        let playerOne 
        let playerTwo 
        let turn = -1
        
        /*
        =====================================================
        Game Start

        =====================================================
        */

        async function startGame(msg) {
            await msg.reactions.removeAll()

            /*
            =====================================================
            Status Check - Wins / Lose

            =====================================================
            */

            async function checkStatus() {
                let filledPlaces = 0
                let redCount = 0
                let blueCount = 0
                let win 
                // Check Column
                for (let column = 0; column < 7; column++) {
                    for (let row = 0; row < 6; row++) {
                        if (GameBoard[row][column] == "🔴") {
                            redCount++
                            blueCount = 0
                            filledPlaces++
                        } 
                        if (GameBoard[row][column] == "🔵") {
                            blueCount++
                            redCount = 0
                            filledPlaces++
                        } 
                        if (redCount == 4) {
                            win = "Red"
                            console.log("column red");
                        } 
                        if (blueCount == 4) {
                            win = "Blue"
                            console.log("column blue");
                        }
                    }
                    redCount = 0
                    blueCount = 0
                }
                if (filledPlaces == 42) {
                    win = "Lose"
                }
                // Check rows
                for (let row = 0; row < 6; row++) {
                    for (let column = 0; column < 7; column++) {
                        if (GameBoard[row][column] == "🔴") {
                            redCount++
                            blueCount = 0
                        } else if (GameBoard[row][column] == "🔵") {
                            blueCount++
                            redCount = 0
                        }  else {
                            redCount = 0
                            blueCount = 0
                        }
                        if (redCount == 4) {
                            win = "Red"
                            console.log("row red");
                        } 
                        if (blueCount == 4) {
                            win = "Blue"
                            console.log("row blue");
                        }
                    }
                    redCount = 0
                    blueCount = 0
                }
                
                //Check diagonals
                for (let row = 0; row < 3; row++) {
                    //Check the first half
                    //For every part
                    for (let column = 0; column < 7; column++) {

                        if (column >= 3) {
                            for (i = 0; i < 4; i++) {
                                if (GameBoard[row + i][column - i] == "🔴") {
                                    redCount++
                                    blueCount = 0
                                }
                                if (GameBoard[row + i][column - i] == "🔵") {
                                    blueCount++
                                    redCount = 0
                                } 
                            }
                        }
                        if (redCount == 4) {
                            win = "Red"
                            console.log("Diagonal 1 red");
                        } 
                        if (blueCount == 4) {
                            win = "Blue"
                            console.log("Diagonal 1 blue");
                        }
                        redCount = 0
                        blueCount = 0
                        if (column <= 3) {
                            for (let i = 0; i < 4; i++) {
                                if (GameBoard[row + i][column + i] == "🔴") {
                                    redCount++
                                    blueCount = 0
                                }
                                if (GameBoard[row + i][column + i] == "🔵") {
                                    blueCount++
                                    redCount = 0
                                } 
                            }
                        }
                        if (redCount == 4) {
                            win = "Red"
                            console.log("Diagonal 2 red");
                            
                        } 
                        if (blueCount == 4) {
                            win = "Blue"
                            console.log("Diagonal 2 blue");
                        }
                        redCount = 0
                        blueCount = 0

                    }
                    redCount = 0
                    blueCount = 0
                }    

                return win
                
            }


            /*
            =====================================================
            The Main Game Loop

            =====================================================
            */


            async function mainGameLoop(column = 0) {
                column--
                // Get Player
                turn++
                let player
                if (turn % 2 == 0) {
                    player = playerOne
                } else {
                    player = playerTwo
                }
                // Get the piece
                let piece
                if (turn % 2 == 0) {
                    piece = "🔴"
                } else {
                    piece = "🔵"
                }
                
                // Try to place piece
                let placed = false
                if (column >= 0) {
                    for (row = 5; row >= 0; row--) {
                        //Check if empty 
                        if (GameBoard[row][column] == "⚫" && !placed) {
                            GameBoard[row][column] = piece
                            placed = true
                        }
                    }
                }
                

                // Make Board
                var board = ""
                for (row = 0; row < 6; row ++) {
                    for (i = 0; i < 7; i++) {
                        board = board + GameBoard[row][i]
                    }
                    board += "\n"
                }

                status =  await checkStatus()

                let mainGame = new Discord.MessageEmbed()
                if (status) {
                    if (status == 'Red') {
                        mainGame.setColor('FF0000')
                    }
                    if (status == 'Blue') {
                        mainGame.setColor('0000FF')
                    }
                    if (status == "Lose") {
                        mainGame.setColor('000000')
                    }
                } else {
                    mainGame.setColor('FFC300')
                }
                mainGame.setAuthor("Connect Four")
                mainGame.setDescription(board)
                if (status) {
                    if (status == 'Red') {
                        mainGame.addField('Game Over!', `${playerTwo} Won!`)
                    }
                    if (status == 'Blue') {
                        mainGame.addField('Game Over!', `${playerOne} Won!`)
                    }
                    if (status == "Lose") {
                        mainGame.addField('Game Over!', 'No one won..')
                    }
                } else {
                    mainGame.addField(`${player.tag}`,  `It's your turn! \nSend a number from 1 to 7 in chat to place your piece`)

                }
                
                await msg.edit(mainGame)

                filter = m => m.author.id == player.id
         

                if (status) {
                    if (status == 'Red') {
                        message.channel.send("Red Wins! - " + playerTwo.tag)
                    }
                    if (status == 'Blue') {
                        message.channel.send("Blue Wins! - " + playerOne.tag)
                    }
                    if (status == "Lose") {
                        message.channel.send("No one won :(")
                    }
                } else {
                    waitForResponse(filter)
                }        

            }

            async function waitForResponse(filter) {
                sent = false
                const collector = message.channel.createMessageCollector(filter, {time: 60000})
                collector.on('collect', m => {
                    
                    
                    if (!m.content.match(/[1-7]/)) {
                        if (m.content.toUpperCase() == "STOP") {
                            sent = true
                            message.channel.send("Game over")
                            collector.stop()
                        } else {
                            message.channel.send("Invalid input")
                        }
                       
                    } else {
                        let hasSpace = false
                        for (row = 5; row >= 0; row--) {
                            //Check if empty 
                            if (GameBoard[row][m.content[0]-1] == "⚫") {
                                hasSpace = true
                            }
                        }
                        if (!hasSpace) {
                            message.channel.send("Column full").then(em => {em.delete(5000)})
                            m.delete()
                        } else {
                            sent = true
                            m.delete()
                            collector.stop()
                            mainGameLoop(m.content[0])
                        }
                        
                    }
                    
                });
                collector.on('end', collected => {
                    if (!sent) {
                        message.channel.send("User not here. game over")
                    }
    
                });
            }
    

            mainGameLoop()

            

        }

        /*
        =====================================================
        Game Start. Wait for players

        =====================================================
        */



        async function waitForPlayers() {
            let waitForPlayerEmbed = new Discord.MessageEmbed();
            waitForPlayerEmbed.setTitle("Welcome to Connect Four!")
            waitForPlayerEmbed.setColor("BA0A0F")
            waitForPlayerEmbed.setDescription("Waiting for player reaction.")
            waitForPlayerEmbed.addField("Player one - 🔵", "Waiting for player")
            waitForPlayerEmbed.addField("Player two - 🔴", "Waiting for player")

            message.channel.send(waitForPlayerEmbed)
                .then(msg => {
                    msg.react("🔵")
                    msg.react("🔴")

                    async function updatePlayers() {
                        waitForPlayerEmbed.fields.pop()
                        waitForPlayerEmbed.fields.pop()
                        if (!playerOne) {
                            waitForPlayerEmbed.addField("Player one - 🔵", "Waiting for player")
                        } else {
                            waitForPlayerEmbed.addField("Player one - 🔵", playerOne.tag)
                        }
                        if (!playerTwo) {
                            waitForPlayerEmbed.addField("Player two - 🔴", "Waiting for player")
                        } else {
                            waitForPlayerEmbed.addField("Player two - 🔴", playerTwo.tag)
                        }
                        msg.edit(waitForPlayerEmbed)
                    }

                    const filter = (reaction, user) => {
                        return (reaction.emoji.name == "🔵" || reaction.emoji.name == "🔴")  && user.id != '627222236499017738'
                    }
    
                    const collector = msg.createReactionCollector(filter, {time : 15000})
    
                    collector.on('collect', (reaction, user) => {
                        if (reaction.emoji.name == '🔵') {
                            console.log("Player one: " + user.id + " - " + user.tag); 
                            playerOne = user
                            updatePlayers()
                        } else if (reaction.emoji.name == '🔴') {
                            console.log("Player two: " + user.id + " - " + user.tag);
                            playerTwo = user
                            updatePlayers()
                        }

                        if (playerOne && playerTwo) {
                            console.log("Starting Connect Four game");
                            startGame(msg)
                        }
                    })
    
                    collector.on('end', collected => {
                        if (!playerTwo || !playerOne) {
                            message.channel.send("Not enough players. match over")
                        }
                    })

                })

                
        }

        waitForPlayers()

    }
}