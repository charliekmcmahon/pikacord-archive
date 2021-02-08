const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
module.exports={
  name: "redeemspawn",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {
    
    //if(!adminid.includes(message.author.id)) return message.channel.send(new MessageEmbed().setAuthor("Insufficient Permission", "https://cdn.discordapp.com/emojis/696936608313901116.gif?v=1").setColor("#fba05b"))
    
    let shard = db.fetch(`shards_` + message.author.id)
    if(shard < 1) return message.channel.send("You don't have any redeem!")
    
    const options = {
      
      url: `https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`,
      json: true
      
    };
    
    function getlength(number) {
      
      return number.toString().length;
      
    }
    
    get(options).then(async body => {
        
      db.subtract(`shards_` + message.author.id, 1)
        function getlength(number) {
          return number.toString().length;
        }
        
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
      
      let legendaries = [144,145,150,151,243,244,245,249,250,251,377,378,379,380,381,382,383,384,385,386,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,638,639,640,641,642,643,644,645,646,647,648,649]
      let pseudo = [149, 248, 373, 376, 445, 635, 706, 786]
      let semipseudo = [230, 289, 306, 330, 612, 448, 571, 637, 715, 768]
      
      let leggie = ["zygarde", "yveltal", "xerneas", "diancie", "hoopa", "volcanion", "cosmog", "cosmoem", "solgaleo", "lunala", "necrozma", "tapu-koko", "tapu-lele", "tapu-bulu", "tapu-fini", "zeraora"]
    
      if(leggie.includes(body.name)) rarity = "Legendary"
      
      if(legendaries.includes(body.id)) rarity = "Legendary"
      
      if(pseudo.includes(body.id)) rarity = "Pseudo Legendary"
      
      if(semipseudo.includes(body.id)) rarity = "Semi Pseudo Legendary"
      
      if(starters.includes(body.name)) rarity = "Starter"
      
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
      
        let Embed = new MessageEmbed()
        .setTitle("You encountered a wild pokémon!")
        .setDescription("**Rarity:** " + rarity + `\n**Hint:** ${newstring}`)
        .setFooter(`Catch the pokémon by typing ${prefix}catch <pokémon>`)
        .setColor("#fba05b")
        
        if (getlength(body.id) === 1) {
          Embed.attachFiles(
            [{name: "PikacordSpawn.png", attachment: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${body.id}.png`}]
          );
        }
        
        if (getlength(body.id) === 2) {
          Embed.attachFiles(
            [{name: "PikacordSpawn.png", attachment: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${body.id}.png`}]
          );
          
        }
        if (getlength(body.id) === 3) {
          Embed.attachFiles(
            [{name: "PikacordSpawn.png", attachment: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${body.id}.png`}]
          );
        }
        
        Embed.setImage("attachment://" + "PikacordSpawn.png")
        message.channel.send(Embed)
      
      await db.set(`catch_` + message.channel.id, body.name)
        
      })
    
  }
}