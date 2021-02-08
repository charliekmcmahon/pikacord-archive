const {MessageEmbed, bot} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
const adminid = require('./dev.json')
module.exports={
  name: "give",  
  description: "Check your balance",
  run: async(bot,message,args) => {
    
    let user = message.mentions.users.first()
    
    if(!adminid.includes(message.author.id)) return message.channel.send(new MessageEmbed().setAuthor("Insufficient Permission", "https://cdn.discordapp.com/emojis/696936608313901116.gif?v=1").setColor("#fba05b"))
    
    if(!args[0]) return message.channel.send("**Correct Usage:** p!give <user> <pokemon> <hp iv> <atk iv> <def iv> <spatk iv> <spdef iv> <speed iv> <level>")
    
    const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${args[1].toLowerCase()}`,
      json: true
    }
    
    get(options).then(async body => {
      
      let hpBase = body.stats[0].base_stat;
      let atkBase = body.stats[1].base_stat;
      let defBase = body.stats[2].base_stat;
      let spatkBase = body.stats[3].base_stat;
      let spdefBase = body.stats[4].base_stat;
      let speedBase = body.stats[5].base_stat;
      
      let level = parseInt(args[8]);
      let xp = 0.5 * level * (1 + level);
      
      let stat1 = parseInt(args[2])
      let stat2 = parseInt(args[3])
      let stat3 = parseInt(args[4])
      let stat4 = parseInt(args[5])
      let stat5 = parseInt(args[6])
      let stat6 = parseInt(args[7])
      
      let fhp = Math.round((((2 * hpBase + stat1 + 0) * level) / 100) + level + 10);
     let fatk = Math.round((((2 * atkBase + stat2 + 0) * level) / 100) + 5 * 1);
     let fdef = Math.round((((2 * defBase + stat3 + 0) * level) / 100) + 5 * 1);
     let fspatk = Math.round((((2 * spatkBase + stat4 + 0) * level) / 100) + 5 * 1);
     let fspdef = Math.round((((2 * spdefBase + stat5 + 0) * level) / 100) + 5 * 1);
     let fspeed = Math.round((((2 * speedBase + stat6 + 0) * level) / 100) + 5 * 1);
      
      let totaliv = ((stat1 + stat2 + stat3 + stat4 + stat5 + stat6) / 186) * 100;  
      let totalivs = Math.floor(Math.round(totaliv))
      let finaliv = (totaliv.toFixed(2))
      
      let data = {
        
        "hpiv": stat1,
        "atkiv": stat2,
        "defiv": stat3,
        "spatkiv": stat4,
        "spdefiv": stat5,
        "speediv": stat6,
        "hpstat": fhp,
        "atkstat": fatk,
        "defstat": fdef,
        "spatkstat": fspatk,
        "spdefstat": fspdef,
        "speedstat": fspeed,
        "totaliv": finaliv,
        "level": level,
        "name": body.name,
        "mega": false,
        "id": body.id,
        "shiny": false,
        "xp": xp
        
      }
      
      if(args[9] && args[9].toLowerCase() === "--shiny") {

        data = {
        
        "hpiv": stat1,
        "atkiv": stat2,
        "defiv": stat3,
        "spatkiv": stat4,
        "spdefiv": stat5,
        "speediv": stat6,
        "hpstat": fhp,
        "atkstat": fatk,
        "defstat": fdef,
        "spatkstat": fspatk,
        "spdefstat": fspdef,
        "speedstat": fspeed,
        "totaliv": finaliv,
        "level": level,
        "name": body.name,
        "mega": false,
        "id": body.id,
        "shiny": true,
        "xp": xp
        
      }

      }

      
      //message.channel.send(body.id)
      db.push(`yourpokemons_` + user.id, data)
      db.set(`info_` + user.id, data)
      
      message.channel.send(`A **${args[1]}** has been added to ${user}'s Pokemon List!`)
      
    })
    
  }
}