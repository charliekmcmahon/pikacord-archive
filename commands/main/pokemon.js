const { MessageEmbed } = require("discord.js");
const { v4: uuidv4 } = require("uuid");
const db = require("quick.db");
const ms = require("ms");
const talkedRecently = new Set();
const { get } = require("request-promise-native");
const fs = require("fs");
const ascii = require('ascii-table');
module.exports = {
  name: "pokemon",
  description: "Show all your pokemons",
  usage: "pokemon",
  run: async (bot, message, args) => {
    
    let join = args.join(" ")
    let flag = join.trim().split(/--/g)

    let order = db.fetch(`order_` + message.author.id)
    let pokemon = db.fetch(`yourpokemons_` + message.author.id)
    let prefix = db.fetch(`prefix_` + message.guild.id)
    if(prefix === null) prefix = "p!"
    if(!pokemon) return message.channel.send(`Type **${prefix}start** to begin your journey!`)
    //if(!pokemon) return message.channel.send("You don't have any pokemon! Do `p!start` to get started!")
    
    function pages(arr, pokemonPerPage, page = 1) {
      
      const maxPages = Math.ceil(arr.length / pokemonPerPage)
      if(page < 1 || page > maxPages) return null
      return arr.slice((page - 1) * pokemonPerPage, page * pokemonPerPage)
      
    }
    
    function getlength(number) {
      return number.toString().length;
    }
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    let mons = db.fetch(`yourpokemons_${message.author.id}`); // array

    if (!mons || mons === null)
      return message.channel.send(`Type **${prefix}start** to begin your journey!`);

    let pet = db
      .all()
      .filter(data => data.ID.startsWith(`pet_${message.author.id}`));

    let finalLb = ""
    
    let Embed = new MessageEmbed()
      .setTitle(`Your pokémon:`)
      .setColor("#fba05b")
    
    function getPosition(elementToFind, arrayElements) {
    var i;
    for (i = 0; i < arrayElements.length; i += 1) {
        if (arrayElements[i] === elementToFind) {
            return i;
        }
    }
    return null; //not found
}
    
    if(!args[0]) args[0] = 1
    
    //if(isNaN(args[0])) return message.channel.send(`**${args[0].toUpperCase()}** is not a valid number!`)
    let legendaries = [144,145,150,151,243,244,245,249,250,251,377,378,379,380,381,382,383,384,385,386,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,638,639,640,641,642,643,644,645,646,647,648,649]

    let page = pages(mons.map(m => {

      let result = `**${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      let primal = ["kyogre", "groudon"]

      if(m.mega === true && !primal.includes(m.name)) result = `**Mega ${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.mega === true && primal.includes(m.name)) result = `**Primal ${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.shiny === true) result = `**${m.name.capitalize()}** ⭐ | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.mega === true && !primal.includes(m.name) && m.shiny === true) result = `**Mega ${m.name.capitalize()}** ⭐ | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.mega === true && primal.includes(m.name && m.shiny === true)) result = `**Primal ${m.name.capitalize()}** ⭐ | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;
      
      if(m.mega === true && m.name === "pikachu") result = `**Detective ${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.mega === true && m.name === "kyurem") result = `**White ${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      return result;

    }), 20, args[0])

    if(isNaN(args[0]) && args[0] && args[0].toLowerCase() === "--name") {

      page = pages(mons.filter(mons => mons.name.includes(args[1].toLowerCase())).map(m => {

      let result = `**${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      let primal = ["kyogre", "groudon"]

      if(m.mega === true && !primal.includes(m.name)) result = `**Mega ${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.mega === true && primal.includes(m.name)) result = `**Primal ${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.shiny === true) result = `**${m.name.capitalize()}** <:shiny:730767750854737930> | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.mega === true && !primal.includes(m.name) && m.shiny === true) result = `**Mega ${m.name.capitalize()}** ⭐ | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.mega === true && primal.includes(m.name && m.shiny === true)) result = `**Primal ${m.name.capitalize()}** ⭐ | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;
      
      if(m.mega === true && m.name === "pikachu") result = `**Detective ${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.mega === true && m.name === "kyurem") result = `**White ${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      return result;

    }), 20, args[2] || 1)

    }

    if(isNaN(args[0]) && args[0] && args[0].toLowerCase() === "--legendary") {

      page = pages(mons.filter(mons => legendaries.includes(mons.id)).map(m => {

      let result = `**${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      let primal = ["kyogre", "groudon"]

      if(m.mega === true && !primal.includes(m.name)) result = `**Mega ${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.mega === true && primal.includes(m.name)) result = `**Primal ${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.shiny === true) result = `**${m.name.capitalize()}** <:shiny:730767750854737930> | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.mega === true && !primal.includes(m.name) && m.shiny === true) result = `**Mega ${m.name.capitalize()}** ⭐ | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.mega === true && primal.includes(m.name && m.shiny === true)) result = `**Primal ${m.name.capitalize()}** ⭐ | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;
      
      if(m.mega === true && m.name === "pikachu") result = `**Detective ${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      if(m.mega === true && m.name === "kyurem") result = `**White ${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`;

      return result;

    }), 20, args[1] || 1)

    }
    
    //if(order === "alphabetical") page = pages(mons.map(m => `**${m.name.capitalize()}** | Level: ${m.level} | IV: ${m.totaliv}% | Number: ${mons.indexOf(m) + 1}`).sort(function(a, b){return a.name - b.name}), 20, args[0])
    
    let pseudo = [149, 248, 373, 376, 445, 635, 706, 786]
    
    if(!page) return message.channel.send("You don't have that many pokemons!")
    
    Embed.setDescription(page.join("\n"))
    Embed.setFooter(`You have a total of ${mons.length} pokemon`)
    if(mons.length > 1) Embed.setFooter(`You have a total of ${mons.length} pokemons`)
    message.channel.send(Embed);
    
  }
};
