const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const adminid = require('./dev.json')
const {get} = require('request-promise-native')
module.exports={
  name: "spawn",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args,chance) => {
    
    if(args[1] && args[1].toLowerCase() === "--shiny") chance = 2505;
    if(!adminid.includes(message.author.id)) return message.channel.send(new MessageEmbed().setAuthor("Insufficient Permission", "https://cdn.discordapp.com/emojis/696936608313901116.gif?v=1").setColor("#fba05b"))
    
    const options = {
      
      url: `https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`,
      json: true
      
    };
    
    function getlength(number) {
      
      return number.toString().length;
      
    }
    
    message.delete()

    get(options).then(async body => {
        
        function getlength(number) {
          return number.toString().length;
        }
        
      let dex = body.id

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
      
      let rarity = "Common";
      
      let prefix = db.fetch(`prefix_` + message.guild.id)
      let isPremium = db.fetch(`premium_` + message.guild.id)
  
      if(prefix === null) prefix = "p!"
      
      let legendaries = [144,145,150,151,243,244,245,249,250,251,377,378,379,380,381,382,383,384,385,386,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,638,639,640,641,642,643,644,645,646,647,648,649, 718, 716, 717, 719, 720, 721, 789, 790, 791, 792, 800, 785, 786, 787, 788, 807, 146, 803, 804, 793, 794, 795, 796, 797, 798, 799, 805, 806]
      let pseudo = [149, 248, 373, 376, 445, 635, 706, 786]
      let semipseudo = [230, 289, 306, 330, 612, 448, 571, 637, 715, 768]
      
      let leggie = ["zygarde", "yveltal", "xerneas", "diancie", "hoopa", "volcanion", "cosmog", "cosmoem", "solgaleo", "lunala", "necrozma", "tapu-koko", "tapu-lele", "tapu-bulu", "tapu-fini", "zeraora", "moltres"]
    
      if(leggie.includes(body.name)) rarity = "Legendary"
      
      if(legendaries.includes(body.id)) rarity = "Legendary"
      
      if(pseudo.includes(body.id)) rarity = "Rare"
      
      if(semipseudo.includes(body.id)) rarity = "Rare"
      
      if(starters.includes(body.name)) rarity = "Uncommon"
      
      var a = body.name;
    var splitted = a.split('');
    var count = 0;

    while(count < a.length/2) {
       var index = Math.floor(Math.random()*a.length);
       if(splitted[index] !== '-' && splitted[index] !== ' ') {
            splitted[index] = '-';
            count++;
         } 
      }

    var newstring = splitted.join("")

        if(chance === 2505) rarity = "Shiny";

        let Embed = new MessageEmbed()
        .setTitle("You encountered a wild pokémon!")
        .setDescription("**Rarity:** " + rarity + `\n**Hint:** ${newstring}`)
        .setFooter(`Catch the pokémon by typing ${prefix}catch <pokémon>`)
        .setColor("#fba05b")

          if(chance != 2505) {

          if (getlength(dex) === 1) {
          Embed.attachFiles(
            [{name: "PikacordSpawn.png", attachment: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${dex}.png`}]
          );
        }
        
        if (getlength(dex) === 2) {
          Embed.attachFiles(
            [{name: "PikacordSpawn.png", attachment: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${dex}.png`}]
          );
          
        }
        if (getlength(dex) === 3) {
          Embed.attachFiles(
            [{name: "PikacordSpawn.png", attachment: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${dex}.png`}]
          );
        }


        }

        Embed.setImage("attachment://" + "PikacordSpawn.png")

        if(chance === 2505) {

          Embed.setImage(`https://raw.githubusercontent.com/mungoman775/pikacord-shinies/master/ShinyPics/shiny_${body.name}.png`)

          db.set(`shiny_` + message.channel.id, true)

        }

        message.channel.send(Embed)
      
      await db.set(`catch_` + message.channel.id, body.name)
        
      })
    
  }
}