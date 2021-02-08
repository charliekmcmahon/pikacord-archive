const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')

module.exports={
  name: "info",  
  description: "View the list of starter pokemon.",
  run: async(bot,message,args) => {
    
    let mons = db.fetch(`yourpokemons_` + message.author.id)
    let num = db.fetch(`info_` + message.author.id)
    let info = mons[num]
    
    if(args[0] && args[0].toLowerCase() === "latest") info = db.fetch(`latest_` + message.author.id)
    if(args[0] && !isNaN(args[0])) {

      info = mons[args[0]-1];
      num = parseInt(args[0]-1)

    }

    const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${info.name}`,
      json: true
    }

    get(options).then(async body => {
      
      let title = info.mega ? `${message.author.username}'s Mega ${info.name.capitalize()}` : `${message.author.username}'s ${info.name.capitalize()}`;
      let shiny = info.shiny ? `⭐ ` : ``;

      function isVocal(str) {

        let vocal = ["a", "i", "u", "e", "o"];

        if(vocal.includes(str)) return true
        else return false

      }

      function getlength(number) {

        return number.toString().length;

      }

      let t = "Type";
      if(body.types.length > 1) t = "Types";

      let types = body.types.map(t => t.type.name.capitalize())

      let description = `**Level:** ${info.level}・**XP:** ${info.xp}\n**${t}:** ${types.join(" | ")}\n**Nature:** Hasty`;

      let Embed = new MessageEmbed()
      .setTitle(shiny + title)
      .setDescription(description)
      .setFooter(`Displaying Pokémon: ${num + 1}/41`)
      .setColor("#fba05b")
      .addField("Pokémon Stats", `**HP:** ${info.hpstat} - IV: ${info.hpiv}/31\n**Attack:** ${info.atkstat} - IV: ${info.atkiv}/31\n**Defense:** ${info.defstat} - IV: ${info.defiv}/31\n**Sp. Atk:** ${info.spatkstat} - IV: ${info.spatkiv}/31\n**Sp. Def:** ${info.spdefstat} - IV: ${info.spdefiv}/31\n**Speed:** ${info.speedstat} - IV: ${info.speediv}/31\n**Total IV %:** ${info.totaliv}%`)

      if(getlength(info.id) === 1) Embed.setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${info.id}.png`);
      if(getlength(info.id) === 2) Embed.setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${info.id}.png`);
      if(getlength(info.id) === 3) Embed.setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${info.id}.png`);

      if(info.shiny === true) Embed.setImage(`https://raw.githubusercontent.com/mungoman775/pikacord-shinies/master/ShinyPics/shiny_${info.name}.png`)

      if(info.mega === true) {

        if(getlength(info.id) === 1) Embed.setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${info.id}_f2.png`);
        if(getlength(info.id) === 2) Embed.setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${info.id}_f2.png`);
        if(getlength(info.id) === 3) Embed.setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${info.id}_f2.png`);

        if(info.name === "pikachu") {

          Embed.setImage(`https://cdn.discordapp.com/attachments/728975177563766896/729658308847206460/detective.png`)
          Embed.setTitle(`${message.author.username}'s Detective Pikachu`)

        }

        if(info.shiny === true) {

          if(info.name === "groudon" || info.name === "kyogre") Embed.setImage(`https://raw.githubusercontent.com/mungoman775/pikacord-shinies/master/ShinyPics/shiny_${info.name}-primal.png`)
          else Embed.setImage(`https://raw.githubusercontent.com/mungoman775/pikacord-shinies/master/ShinyPics/shiny_${info.name}-mega.png`)

        }

      }

      message.channel.send(Embed)

    })

  }
}