const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const { get } = require("request-promise-native");
const db = require("quick.db");

module.exports = {
  name: "pokedex",
  description: "gives you a hint from the recently spawned pokemon",
  usage: "+.hint",
  run: async (bot, message, args) => {
    
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    
    let options = {
      url: `https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`,
      json: true
    }
    
    if(args[0].toLowerCase() === "shiny") options.url = `https://pokeapi.co/api/v2/pokemon/${args[1].toLowerCase()}`;
    if(args[0].toLowerCase() === "mega" || args[0].toLowerCase() === "primal") options.url = `https://pokeapi.co/api/v2/pokemon/${args[1].toLowerCase()}-${args[0].toLowerCase()}`
    if(args[0].toLowerCase() === "shiny" && (args[1].toLowerCase() === "primal" || args[1].toLowerCase() === "mega")) options.url = `https://pokeapi.co/api/v2/pokemon/${args[2].toLowerCase()}-${args[1].toLowerCase()}`

    get(options).then(async body => {
      
      let ability = body.abilities.map(a => a.ability.name.capitalize())
      let types = body.types.map(t => t.type.name.capitalize())
      
      let s = "Type";
      let a = "Ability";
      let height = body.height / 10;
      let weight = body.weight / 10;
      
      if(body.types.length > 1) s = "Types"
      if(body.abilities.length > 1) a = "Abilities"
      
      let Embed = new MessageEmbed()
      .setAuthor("Pokédex", "https://cdn.discordapp.com/attachments/716461572754505789/729490450108514364/dex.png")
      .setTitle(`#${body.id} - ${body.name.capitalize()}`)
      
      function getlength(number) {
        return number.toString().length;
      }
      
      if (getlength(body.id) === 1) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${body.id}.png`
        );
      }
      if (getlength(body.id) === 2) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${body.id}.png`
        );
      }
      if (getlength(body.id) === 3) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${body.id}.png`
        );
      }

      let url = body.species.url

      let opt = {
        url: url,
        json: true
      }

      get(opt).then(async body2 => {

        let name = body2.names.map(n => `${n.name}・${n.language.name}`)
        name.length = 3;

        let capture = body2.capture_rate
        Embed.addField("Alternative Names", name.join("\n"))
        .addField("Base Stats", `**HP:** ${body.stats[0].base_stat}\n**Attack:** ${body.stats[1].base_stat}\n**Defense:** ${body.stats[2].base_stat}\n**Sp. Atk:** ${body.stats[3].base_stat}\n**Sp. Def:** ${body.stats[4].base_stat}\n**Speed:** ${body.stats[5].base_stat}`, true)
      .addField("Weight", `${weight}kg`, true)
      .addField("Height", `${height}m`, true)
      .addField(s, types.join(" | "), true)
      .addField(a, ability.join("\n"), true)
      .setColor("#fba05b")
      Embed.addField("Capture Rate", capture, true)

        let opt2 = {
          url: `https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`,
          json: true
        }

        if(args[0].toLowerCase() === "shiny") opt2.url = `https://pokeapi.co/api/v2/pokemon/${args[1].toLowerCase()}`;

        if(args[0].toLowerCase() === "shiny" && (args[1].toLowerCase() === "primal" || args[1].toLowerCase() === "mega")) {
          
          opt2.url = `https://pokeapi.co/api/v2/pokemon/${args[2].toLowerCase()}`
          Embed.setTitle(`#${body.id} - Shiny ${args[0].toLowerCase().capitalize()}`)

          }

        get(opt2).then(async body3 => {
          
          if(args[0].toLowerCase() === "shiny") Embed.setImage(`https://raw.githubusercontent.com/mungoman775/pikacord-shinies/master/ShinyPics/shiny_${body.name}.png`)

          let num = 0;

          let desc = body2.flavor_text_entries[num]

          while(desc.language.name != "en") {

            await num++
            desc = body2.flavor_text_entries[num]

          }

          let num2 = 0;

          let gen = body2.genera[num2]

          while(gen.language.name != "en") {

            await num2++;
            gen = body2.genera[num2]

          }       

          let bruh = body.types.map(t => t.type.name)

          let aei = "A";
          if(body.types[0].type.name.startsWith("a") || body.types[0].type.name.startsWith("i") || body.types[0].type.name.startsWith("u") || body.types[0].type.name.startsWith("e") || body.types[0].type.name.startsWith("o")) aei = "An";

          let extra = ". ";

          if(body2.evolves_from_species != null) extra = `, and the evolved form of ${body2.evolves_from_species.name.capitalize()}. `

          let meh = "type";
          if(body.types.length > 1) meh = "types";

          Embed.setDescription(`${body.name.capitalize()}, The ${gen.genus.toLowerCase()}. ${aei} ${bruh.join(" and ")} ${meh}${extra}` + desc.flavor_text.replace(/(\r\n|\n|\r)/gm," ").replace(/\f/gm," ").replace(/POKéMON/g, "pokémon").replace(body3.name.toUpperCase(), body3.name.capitalize()))

          if(args[0].toLowerCase() === "primal" || args[0].toLowerCase() === "mega") {
            
            Embed.setTitle(`#${body3.id} - ${args[0].toLowerCase().capitalize()} ${args[1].toLowerCase().capitalize()}`)

            if (getlength(body3.id) === 1) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${body3.id}_f2.png`
        );
      }
      if (getlength(body3.id) === 2) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${body3.id}_f2.png`
        );
      }
      if (getlength(body3.id) === 3) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${body3.id}_f2.png`
        );
      }

          }

          if(args[0].toLowerCase() === "shiny" && (args[1].toLowerCase() === "primal" || args[1].toLowerCase() === "mega")) {
            
            Embed.setImage(`https://raw.githubusercontent.com/mungoman775/pikacord-shinies/master/ShinyPics/shiny_${body3.name}-${args[1].toLowerCase()}.png`)

            Embed.setTitle(`#${body3.id} - Shiny ${args[1].toLowerCase().capitalize()} ${args[2].toLowerCase().capitalize()}`)
            
            }

          message.channel.send(Embed)

        })

      })
      
    })
    
  }
}