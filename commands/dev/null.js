const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
module.exports={
  name: "guilds",  
  description: "Check your balance",
  run: async(bot,message,args) => {

    function pages(arr, pokemonPerPage, page = 1) { // ignore the pokemonPerPage
      
      const maxPages = Math.ceil(arr.length / pokemonPerPage) // theres no .length
      if(page < 1 || page > maxPages) return null
      return arr.slice((page - 1) * pokemonPerPage, page * pokemonPerPage)
      
    }

    let embed = new MessageEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setColor("#fba05b") // lemme greb the function rq

    .setDescription(bot.guilds.cache.filter(g => g.memberCount < args[0]).map(guild => `**${guild.name}**・${guild.memberCount}`).join("\n")) // im dumb
    
    await message.channel.send(embed)
    
  }
}