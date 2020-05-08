const Discord = require('discord.js');      //Discord


const fs = require('fs');       //fs
const readline = require('readline');   //Google
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/documents']
const TOKEN_PATH = 'token.json'

module.exports = {
    /*
    Yeah no good luck reading this
    */

    async authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
        
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
            
        })
    },

    async getNewToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log(`Authorize this app by visiting this URL: ${authUrl}`);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return console.error(`Error retrieving access token`, err);
                oAuth2Client.setCredentials(token);
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) console.error(err);
                    console.log(`Token stored to `, TOKEN_PATH);       
                });
                callback(oAuth2Client);     
            });
        }); 
    },

    async printDocTitle(auth) {
        const docs = google.docs({version: 'v1', auth});
        docs.documents.get({
            documentId: '1K5LNkKrElD5nOsVqCzXVg0suexbYgal4kXLKQsPYAe4',
        }, (err, res) => {
            if (err) return console.log(`The API returned an error: ` + err);
            console.log(`The title of the document is: ${res.data.title}`);
        })
    },


    async getDocContent(auth) { 
        const docs = google.docs({version: 'v1', auth});
        docs.documents.get({
            documentId: '1K5LNkKrElD5nOsVqCzXVg0suexbYgal4kXLKQsPYAe4',
        }, (err, res) => {
            if (err) return console.log(`Error: ` + err);
            fileContent = res.data.body.content;
            for (i = 0; i < fileContent.length; ++i) {
                try {
                    for (i2 = 0; i2 < res.data.body.content[i].paragraph.elements.length; ++i2) {
                        if (!res.data.body.content[i].paragraph.elements[i2].textRun.content.startsWith("\n")){
                            console.log(res.data.body.content[i].paragraph.elements[i2].textRun.content);
                        }      
                    }    
                }
                catch (err) {
                    try {
                        console.log("================================================");
                        for (i2 = 0; i2 < fileContent[i].table.tableRows.length; i2++) {
                            for (i3 = 0; i3 < fileContent[i].table.tableRows[i2].tableCells.length; i3++) {
                                for (i4 = 0; i4 < res.data.body.content[i].table.tableRows[i2].tableCells[i3].content.length; i4++) {
                                    for (i5 = 0; i5 < res.data.body.content[i].table.tableRows[i2].tableCells[i3].content[i4].paragraph.elements.length; i5++)
                                    textElement = res.data.body.content[i].table.tableRows[i2].tableCells[i3].content[i4].paragraph.elements[i5].textRun.content;
                                    if (textElement != "\n") {
                                        console.log(textElement);
                                    }
                                }
                            }
                        }
                        console.log("================================================");    
                    }
                    catch (error) {
                        console.log(error); 
                    }
                }    
            }
        }) 
    },

    async settlementAuthorize(credentials, callback, message, args) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
        
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err)
                return getNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client, message, args);
        })
    },

    /**
     * Gets settlement members by settlement name
     * @param {Object} auth The Google auth
     * @param {object} message The message sent
     * @param {array} args message arguments
     */
    async getSettlement(auth, message, args) { 
        
        const docs = google.docs({version: 'v1', auth});
        docs.documents.get({
            documentId: '1K5LNkKrElD5nOsVqCzXVg0suexbYgal4kXLKQsPYAe4',
        }, (err, res) => {
            if (err) return console.log(`Error: ` + err);
            fileContent = res.data.body.content;
            inSettlement = false;
            var msg = "";
            for (i = 0; i < fileContent.length; ++i) {
                try {
                    for (i2 = 0; i2 < res.data.body.content[i].paragraph.elements.length; ++i2) {
                        if (!res.data.body.content[i].paragraph.elements[i2].textRun.content.startsWith("\n")){
                            cnt = res.data.body.content[i].paragraph.elements[i2].textRun.content
                            if (cnt.startsWith('Settlement of')) {
                                console.log("Found a settlement!: " + cnt);
                                let settlement = message.content.slice(args[0].length +  args[1].length + 3);
                                if (cnt.includes(settlement)) {
                                    console.log('Right settlement!');
                                    inSettlement = true;
                                } else {
                                    inSettlement = false;
                                }
                            }
                        }      
                    }    
                }
                catch (err) {
                    try {
                        for (i2 = 0; i2 < fileContent[i].table.tableRows.length; i2++) {
                            for (i3 = 0; i3 < fileContent[i].table.tableRows[i2].tableCells.length; i3++) {
                                for (i4 = 0; i4 < res.data.body.content[i].table.tableRows[i2].tableCells[i3].content.length; i4++) {
                                    for (i5 = 0; i5 < res.data.body.content[i].table.tableRows[i2].tableCells[i3].content[i4].paragraph.elements.length; i5++)
                                    textElement = res.data.body.content[i].table.tableRows[i2].tableCells[i3].content[i4].paragraph.elements[i5].textRun.content;
                                    if (textElement != "\n") {
                                        if (inSettlement) {
                                            console.log("Adding: " + textElement);
                                            msg = msg + textElement;
                                        }
                                    }
                                }
                            }
                        } 
                    }
                    catch (error) {
                        console.log(error);
                        
                    }
                }    
            }
            if (!msg) return message.channel.send('Whoops something went wrong');
            message.channel.send(msg);
        }) 
    },

    async getSettlementList(auth, message, args) {
        
        const docs = google.docs({version: 'v1', auth});
        docs.documents.get({
            documentId: '1K5LNkKrElD5nOsVqCzXVg0suexbYgal4kXLKQsPYAe4',
        }, (err, res) => {
            if (err) return console.log(`Error: ` + err);
            fileContent = res.data.body.content;
            var list = "";
            for (i = 0; i < fileContent.length; ++i) {
                try {
                    for (i2 = 0; i2 < res.data.body.content[i].paragraph.elements.length; ++i2) {
                        if (!res.data.body.content[i].paragraph.elements[i2].textRun.content.startsWith("\n")){
                            cnt = res.data.body.content[i].paragraph.elements[i2].textRun.content
                            if (cnt.startsWith('Settlement of')) {
                                console.log("Found a settlement!: " + cnt);
                                list = list + cnt + "\n";
                            }
                        }      
                    }    
                }
                catch (err) {
                    console.log('Looking');
                    
                }
            }
            if (!list) return message.channel.send('Woops! something went wrong');
            message.channel.send(list);
        })
    },


    async AuthorizeRemovel(credentials, callback, user) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
        
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err)
                return getNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client, user);
        })
    },


    async removeMember(auth, dis) {
        const docs = google.docs({version: 'v1', auth});
        var start = 0;
        var user = ".";
        docs.documents.get({
            documentId: '1K5LNkKrElD5nOsVqCzXVg0suexbYgal4kXLKQsPYAe4',
        }, (err, res) => {
            if (err) return console.log(`Error: ` + err);
            fileContent = res.data.body.content;
            var memberDisrim = dis;
            console.log(memberDisrim)
            for (i = 0; i < fileContent.length; ++i) {
                try {
                    for (i2 = 0; i2 < res.data.body.content[i].paragraph.elements.length; ++i2) {
                        if (!res.data.body.content[i].paragraph.elements[i2].textRun.content.startsWith("\n")){
                            cnt = res.data.body.content[i].paragraph.elements[i2].textRun.content
                            if (cnt.startsWith('Settlement of')) {
                                list = list + cnt + "\n";
                            }
                        }      
                    }    
                }
                catch (err) {
                    try {
                        for (i2 = 0; i2 < fileContent[i].table.tableRows.length; i2++) {
                            for (i3 = 0; i3 < fileContent[i].table.tableRows[i2].tableCells.length; i3++) {
                                for (i4 = 0; i4 < res.data.body.content[i].table.tableRows[i2].tableCells[i3].content.length; i4++) {
                                    for (i5 = 0; i5 < res.data.body.content[i].table.tableRows[i2].tableCells[i3].content[i4].paragraph.elements.length; i5++) {
                                        textElement = res.data.body.content[i].table.tableRows[i2].tableCells[i3].content[i4].paragraph.elements[i5].textRun.content;
                                        if (textElement.includes(memberDisrim)) { 
                                            start = res.data.body.content[i].table.tableRows[i2].tableCells[i3].content[i4].paragraph.elements[i5].startIndex;
                                            user = res.data.body.content[i].table.tableRows[i2].tableCells[i3].content[i4].paragraph.elements[i5].textRun.content;
                                        } 
                                    }
                                }
                            }
                        } 
                    }
                    catch (error) {
                        //console.log('Error: ' + error);   
                    }
                }
            }
            const docs = google.docs({version: 'v1', auth});
            docs.documents.batchUpdate({
                'documentId': '1K5LNkKrElD5nOsVqCzXVg0suexbYgal4kXLKQsPYAe4',
                "resource": {
                    "requests": [
                      {
                        "replaceAllText": {
                          "containsText": {
                            "matchCase": false,
                            "text": user
                          },
                          "replaceText": ""
                        }
                      }
                    ]
                  }
            }).then(function(response) {
                // Handle the results here (response.result has the parsed body).
              },
              function(err) { console.error("Execute error", err); });
        })   
    },

    async AuthotizeCheckChanges(credentials, callback, message, args) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
        
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err)
                return getNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client, message, args);
        })
    },

    async getChanges(auth, message, args) {
        const docs = google.docs({version: 'v1', auth});
        var members = message.mentions.roles.first().members.map(m => m.user);
        var settlement = message.mentions.roles.first().name;
        inSettlement = false
        foundMembers = [];

        docs.documents.get({
            documentId: '1K5LNkKrElD5nOsVqCzXVg0suexbYgal4kXLKQsPYAe4',
        }, (err, res) => {
            if (err) return console.log(`Error: ` + err);
            fileContent = res.data.body.content;
            var list = [];
            members.forEach(member => {
                list = []
                console.log('Member: ' + member);
                memberDisrim = member.discriminator;
                console.log('Discrim: ' + memberDisrim);
                
                for (i = 0; i < fileContent.length; ++i) {
                    try {
                        for (i2 = 0; i2 < res.data.body.content[i].paragraph.elements.length; ++i2) {
                            if (!res.data.body.content[i].paragraph.elements[i2].textRun.content.startsWith("\n")){
                                cnt = res.data.body.content[i].paragraph.elements[i2].textRun.content
                                if (cnt.startsWith('Settlement of')) {
                                    console.log("Found a settlement!: " + cnt);
                                    if (cnt.includes(settlement)) {
                                        inSettlement = true
                                        console.log('Right settlement')
                                    } else {
                                        inSettlement = false
                                    }
                                }
                            }      
                        }    
                    }
                    catch (err) {
                        try {
                            for (i2 = 0; i2 < fileContent[i].table.tableRows.length; i2++) {
                                for (i3 = 0; i3 < fileContent[i].table.tableRows[i2].tableCells.length; i3++) {
                                    for (i4 = 0; i4 < res.data.body.content[i].table.tableRows[i2].tableCells[i3].content.length; i4++) {
                                        for (i5 = 0; i5 < res.data.body.content[i].table.tableRows[i2].tableCells[i3].content[i4].paragraph.elements.length; i5++) {
                                            textElement = res.data.body.content[i].table.tableRows[i2].tableCells[i3].content[i4].paragraph.elements[i5].textRun.content;
                                            if (inSettlement) {
                                                if (textElement != '\n') {
                                                    console.log('Adding to list! ' + textElement)
                                                    list.push(textElement)
                                                    if (textElement.includes(memberDisrim)) {
                                                        console.log('Found Member! ' + textElement);    
                                                        foundMembers.push(memberDisrim)
                                                    } 
                                                }  
                                            }
                                        }
                                    }
                                }
                            } 
                        }
                        catch (error) {
                            console.log('Error: ' + error);   
                        }
                    }   
                }          
            });
            console.log(foundMembers);
            console.log(members)
            console.log(list)
            count = 0;
            members.forEach(member => {
                console.log('Member: ' + member);
                memberDisrim = member.discriminator;
                console.log('Discrim: ' + memberDisrim);
                there = false
                foundMembers.forEach(foundMember => {
                    if (memberDisrim == foundMember) {
                        there = true
                    }
                })
                if (!there) {
                    message.channel.send(`The Member ${member} Is missing from the records!`)
                    count++;
                }
            })
            list.forEach(listedMember => {
                console.log('Listed Member: ' + listedMember);
                if (!listedMember.startsWith('\n') || listedMember) {
                    there = true 
                    members.forEach(member => { 
                        if (listedMember.includes(member.discriminator)) {
                            console.log('Member found!')
                            there = false
                        }
                    })
                    if (there) {
                        message.channel.send(`**The Member:** ${listedMember} Should be removed from the records.`)
                        count++
                    }
                }
                
            })
            if (count < 1) {
                message.channel.send('All good!')
            }
        })
    }
        
}