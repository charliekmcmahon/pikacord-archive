const {MessageEmbed} = require('discord.js');
const fs = require("fs");
let db = require('quick.db')
const Canvas = require('canvas');
const {get} = require('request-promise-native')
const { MessageAttachment } = require('discord.js') // im skipping mewtwo and charizard btw (for now)
let mega = [
  "venusaur",
  "blastoise",
  "alakazam",
  "gengar",
  "kangaskhan",
  "pinsir",
  "gyarados",
  "aerodactyl",
  "ampharos",
  "scizor",
  "heracross",
  "houndoom",
  "tyranitar",
  "blaziken",
  "gardevoir",
  "mawile",
  "aggron",
  "medicham",
  "manectric",
  "banette",
  "absol",
  "garchomp",
  "lucario",
  "abomasnow",
  "rayquaza",
  "ampharos",
  "kyogre",
  "groudon",
  "sceptile",
  "blaziken",
  "swampert",
  "salamence",
  "metagross",
  "kyurem",
  "latias",
  "latios"
] //  lmk if I missed some pokemons
module.exports={
  name: "mega",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {
    
    //return;
    
    let pokemon = db.fetch(`yourpokemons_` + message.author.id)
    let currentpokemon = pokemon[args[0] - 1]
    let balance = db.fetch(`money_` + message.author.id)
    let megas = db.fetch(`mega_` + message.author.id)
    
    if(!args[0]) return message.channel.send("You need to specify the pokemon id!")
    if(!mega.includes(currentpokemon.name)) return message.channel.send("Your pokemon doesn't have a mega evolution!")
    // brb
    //message.channel.send(currentpokemon.id)

    //if(currentpokemon.name === "charizard" || currentpokemon.name === "mewtwo") mega = db.fetch(`megax`)

    if(megas < 1) return message.channel.send("You don't have any mega stone!")

   const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${currentpokemon.name}-mega`,
      json: true
    }

    if(currentpokemon.name === "kyogre" || currentpokemon.name === "groudon") options.url = `https://pokeapi.co/api/v2/pokemon/${currentpokemon.name}-primal`;

    if(currentpokemon.name === "kyurem") options.url = `https://pokeapi.co/api/v2/pokemon/${currentpokemon.name}-white`;
   
   get(options).then(async body => {
     
      let hpBase = body.stats[0].base_stat;
      let atkBase = body.stats[1].base_stat;
      let defBase = body.stats[2].base_stat;
      let spatkBase = body.stats[3].base_stat;
      let spdefBase = body.stats[4].base_stat;
      let speedBase = body.stats[5].base_stat;
      //console.log(body.stats[1].base_stat)
      
     let level = currentpokemon.level
     
      let stat1 = currentpokemon.hpiv
      let stat2 = currentpokemon.atkiv
      let stat3 = currentpokemon.defiv
      let stat4 = currentpokemon.spdefiv
      let stat5 = currentpokemon.spatkiv
      let stat6 = currentpokemon.speediv
     
     console.log((((2 * atkBase + stat2 + 0) * level) / 100) + 5 * 1)

     let fhp = Math.round((((2 * hpBase + stat1 + 0) * level) / 100) + level + 10);
     let fatk = Math.round((((2 * atkBase + stat2 + 0) * level) / 100) + 5 * 1);
     let fdef = Math.round((((2 * defBase + stat3 + 0) * level) / 100) + 5 * 1);
     let fspatk = Math.round((((2 * spatkBase + stat4 + 0) * level) / 100) + 5 * 1);
     let fspdef = Math.round((((2 * spdefBase + stat5 + 0) * level) / 100) + 5 * 1);
     let fspeed = Math.round((((2 * speedBase + stat6 + 0) * level) / 100) + 5 * 1);
     
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
        "totaliv": currentpokemon.totaliv,
        "level": level,
        "name": currentpokemon.name,
        "mega": true,
        "id": currentpokemon.id,
        "shiny": currentpokemon.shiny,
        "moves": [currentpokemon.moves[0], currentpokemon.moves[1], currentpokemon.moves[2], currentpokemon.moves[3]]
        
      }
     
     db.set(`info_` + message.author.id, data) // I'll push that later, I'll test first
       
       pokemon.splice(args[0] - 1, 1)
       db.set(`yourpokemons_` + message.author.id, pokemon)
     
     await db.push(`yourpokemons_` + message.author.id, data)
     db.subtract(`mega_` + message.author.id, 1)

    let Embed = new MessageEmbed()
    .setAuthor(`Mega ${currentpokemon.name.capitalize()}`, "https://i.pinimg.com/originals/42/b0/d4/42b0d482b56c460c14d1e2c947969677.png")
    .setDescription(`${currentpokemon.name.capitalize()}! Beyond evolution, mega evolve!`)
    .setImage(`https://play.pokemonshowdown.com/sprites/ani/${currentpokemon.name}-mega.gif`)
    .setColor("#fba05b")
    .setFooter(`Your ${currentpokemon.name.capitalize()} has mega evolved`)
    .setTimestamp()

    if(currentpokemon.name === "groudon" || currentpokemon.name === "kyogre") {

      Embed.setAuthor(`Primal ${currentpokemon.name.capitalize()}`, "https://i.pinimg.com/originals/42/b0/d4/42b0d482b56c460c14d1e2c947969677.png")
      Embed.setDescription(`${currentpokemon.name.capitalize()}, Primal Reversion!`)
      Embed.setImage(`https://play.pokemonshowdown.com/sprites/ani/${currentpokemon.name}-primal.gif`)
      Embed.setFooter(`${currentpokemon.name.capitalize()} transformed into its original form`)

    }

    message.channel.send(Embed);
     
   })
  
  }
}