const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const {get} = require('request-promise-native')
var voucher_codes = require('voucher-code-generator');
const starters = [
  "squirtle",
  "bulbasaur",
  "charmander",
  "totodile",
  "chikorita",
  "cyndaquil",
  "mudkip",
  "treecko",
  "torchic",
  "piplup",
  "turtwig",
  "chimchar",
  "oshawott",
  "snivy",
  "tepig",
  "froakie",
  "chespin",
  "fennekin",
  "popplio",
  "rowlet",
  "litten"
];

module.exports = {
  name: "pick",
  description: "Pick your starter pokemon.",
  usage: "<starter>",
  run: async (bot, message, args) => {
    
    let pokemon = db.fetch(`yourpokemons_` + message.author.id)
    
    if(pokemon != null) return message.channel.send("You already have a starter pokemon!")
    
    let prefix = db.fetch(`prefix_` + message.guild.id);
    
    if(prefix === null) prefix = "p!";
    
    String.prototype.capitalize = function() {
      
      return this.charAt(0).toUpperCase() + this.slice(1);
      
    };
    
    if (!args[0]) return message.channel.send(`Incorrect Usage!`)
        
    if (!starters.includes(args[0].toLowerCase())) return message.channel.send(`**${args[0].toUpperCase()}** is not a starter!`);

    message.channel.send(
      new MessageEmbed()
        .setAuthor(`Congratulations! ${args[0].capitalize()} is now your starter!`, "https://cdn.discordapp.com/emojis/712335600950444153.gif?v=1")
        .setDescription("**Helpful Links:**\n・[Support Server](https://discord.gg/RzYPaWV)\n・[Website](https://pikacord.xyz)\n**Support Us:**\n・[Vote Pikacord!](https://top.gg/bot/712109633862631473)")
        .setColor("#fba05b")
        .setFooter("Pikacord - All right reserved")
        .setTimestamp()
    );
    
    const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`,
      json: true
    }
    
    get(options).then(async body => {
      
      let hpBase = body.stats[0].base_stat;
      let atkBase = body.stats[1].base_stat;
      let defBase = body.stats[2].base_stat;
      let spatkBase = body.stats[3].base_stat;
      let spdefBase = body.stats[4].base_stat;
      let speedBase = body.stats[5].base_stat;
      
      let level = Math.floor((Math.random() * 50) + 0);
      let xp = 0.5 * level * (1 + level)
      
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
      
      db.push(`yourpokemons_` + message.author.id, data)
      db.set(`info_` + message.author.id, 0) //  yes, this is the pick command, lol
      
    })
    
  }
};
