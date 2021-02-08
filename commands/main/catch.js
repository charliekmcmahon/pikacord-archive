const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
var voucher_codes = require('voucher-code-generator');
let legendaries = [
          "articuno",
          "zapdos",
          "moltres",
          "mewtwo",
          "mew",
          "entei",
          "raikou",
          "suicune",
          "ho-oh",
          "lugia",
          "latias",
          "latios",
          "groudon",
          "kyogre",
          "rayquaza",
          "azelf",
          "uxie",
          "mesprit",
          "regirock",
          "regice",
          "registeel",
          "regigigas",
          "dialga",
          "palkia",
          "giratina",
          "creseelia",
          "cobalion",
          "terrakion",
          "virizion",
          "keldeo",
          "tornadus",
          "thundurus",
          "landorus",
          "reshiram",
          "zekrom",
          "kyurem",
          "xerneas",
          "yveltal",
          "zygarde",
          "tapu koko",
          "tapu lele",
          "tapu bulu",
          "tapu fini",
          "nihilego",
          "buzzwole",
          "pheromosa",
          "xurkitree",
          "celesteela",
          "kartana",
          "guzzlord",
          "poipole",
          "naganadel",
          "staktaka",
          "blacephalon",
          "cosmog",
          "cosmoem",
          "solgaleo",
          "lunala",
          "necrozma",
          "heatran",
          "jirachi",
          "deoxys",
          "phione",
          "manaphy",
          "darkrai",
          "shaymin",
          "arceus",
          "victini",
          "meoletta",
          "genesect",
          "diancie",
          "hoopa",
          "volcanion",
          "magearna",
          "marshadow",
          "zeraora"
        ];
module.exports={
  name: "catch",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args,chance) => {
    
    let shine = db.fetch(`shiny_` + message.channel.id)
    let catchmon = db.fetch(`catch_` + message.channel.id)
    let pokemon = db.fetch(`yourpokemons_` + message.author.id)
    
    let prefix = db.fetch(`prefix_` + message.guild.id)
    if(prefix === null) prefix = "p!"
    if(!pokemon) return message.channel.send(`Type **${prefix}start** to begin your journey!`)
    
    String.prototype.capitalize = function() {
      
      return this.charAt(0).toUpperCase() + this.slice(1);
      
    };
    
    if(catchmon === null) return message.channel.send("Theres nothing to catch right now!")
    
    if(!args[0]) return message.channel.send("You need to specify the pokemon name!")
    
    const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`,
      json: true
    }
    
    if(catchmon === args[0].toLowerCase()) {

      get(options).then(async body => {
      
      //if(catchmon === args[0].toLowerCase()) {
      
      //if(pokemon.includes(catchmon)) return
      
      let hpBase = body.stats[0].base_stat;
      let atkBase = body.stats[1].base_stat;
      let defBase = body.stats[2].base_stat;
      let spatkBase = body.stats[3].base_stat;
      let spdefBase = body.stats[4].base_stat;
      let speedBase = body.stats[5].base_stat;
      
      let level = Math.floor((Math.random() * 50) + 1);
      let xp = 0.5 * level * (1 + level);

      let stat1 = Math.floor(Math.random() * 31);
      let stat2 = Math.floor(Math.random() * 31);
      let stat3 = Math.floor(Math.random() * 31);
      let stat4 = Math.floor(Math.random() * 31);
      let stat5 = Math.floor(Math.random() * 31);
      let stat6 = Math.floor(Math.random() * 31);
      
      let fhp = Math.round((((2 * hpBase + stat1 + 0) * level) / 100) + level + 10);
     let fatk = Math.round((((2 * atkBase + stat2 + 0) * level) / 100) + 5 * 1);
     let fdef = Math.round((((2 * defBase + stat3 + 0) * level) / 100) + 5 * 1);
     let fspatk = Math.round((((2 * spatkBase + stat4 + 0) * level) / 100) + 5 * 1);
     let fspdef = Math.round((((2 * spdefBase + stat5 + 0) * level) / 100) + 5 * 1);
     let fspeed = Math.round((((2 * speedBase + stat6 + 0) * level) / 100) + 5 * 1);
      
      let totaliv = ((stat1 + stat2 + stat3 + stat4 + stat5 + stat6) / 186) * 100;  
      let totalivs = Math.floor(Math.round(totaliv))
      let finaliv = (totaliv.toFixed(2))
      let uniqueid = voucher_codes.generate({length: 12});

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
        "xp": xp,
        "moves": ["tackle", "tackle", "tackle", "tackle"]
        
      }

      let alolan = Math.floor((Math.random() * 500) + 1);
      //chance = 4096;

      if(shine === true) {

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
      
      db.push(`yourpokemons_` + message.author.id, data)
      //db.set(`info_` + message.author.id, data)
      db.set(`catch_` + message.channel.id, null)

			  let msg = `<:pokeball:730736334481784852> Congratulations <@${message.author.id}>, You just caught a level ${level} ${body.name.capitalize()}!`

      if(shine === true) msg = `<:pokeball:730736334481784852> Congratulations <@${message.author.id}>, You just caught a level ${level} Shiny ${body.name.capitalize()}!`

      message.channel.send(msg)
      await db.set(`catch_` + message.channel.id, null)
      db.add(`money_` + message.author.id, 10)

      db.set(`latest_` + message.author.id, data)
      await db.delete(`shiny_` + message.channel.id)

      if(legendaries.includes(catchmon)) {
        
        let Embed = new MessageEmbed()
        .setAuthor(`${message.author.username} just caught a ${catchmon.capitalize()}`, "https://cdn.discordapp.com/emojis/652489611515527169.png?v=1")
        .setColor("#1cff03")
        .setThumbnail(`https://play.pokemonshowdown.com/sprites/ani/${catchmon}.gif`)
        .setDescription(`**Congratulations for catching a ${catchmon.capitalize()}**\nCatch more pokemon to get more rare pokemon!\n**Support Pikacord Development by [clicking me!](https://top.gg/bot/712109633862631473/vote)**`)
        //bot.channels.cache.get("726735310599487509").send(Embed)
        
      }
      
    })

    }else{

      return message.channel.send(`Thats the wrong pokémon!`)

    }

  }
}