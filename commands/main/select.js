const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
module.exports={
  name: "select",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {
    
    String.prototype.capitalize = function() {
      
      return this.charAt(0).toUpperCase() + this.slice(1);
      
    };
    
    let pokemon = db.fetch(`yourpokemons_` + message.author.id)
    
    if(!pokemon) return message.channel.send("Type **p!start** to begin your journey!")
    
    if(!args[0]) return message.channel.send("You need to specify the number!")
    if(isNaN(args[0])) return message.channel.send(`**${args[0]}** is not a valid number!`)
    
    let data = {
      
      "hpiv": pokemon[args[0]-1].hpiv,
      "atkiv": pokemon[args[0]-1].atkiv,
      "defiv": pokemon[args[0]-1].defiv,
      "spatkiv": pokemon[args[0]-1].spatkiv,
      "spdefiv": pokemon[args[0]-1].spdefiv,
      "speediv": pokemon[args[0]-1].speediv,
      "hpstat": pokemon[args[0]-1].hpstat,
      "atkstat": pokemon[args[0]-1].atkstat,
      "defstat": pokemon[args[0]-1].defstat,
      "spatkstat": pokemon[args[0]-1].spatkstat,
      "spdefstat": pokemon[args[0]-1].spdefstat,
      "speedstat": pokemon[args[0]-1].speedstat,
      "totaliv": pokemon[args[0]-1].totaliv,
      "level": pokemon[args[0]-1].level,
      "name": pokemon[args[0]-1].name,
      "mega": pokemon[args[0]-1].mega,
      "id": pokemon[args[0]-1].id,
      "shiny": pokemon[args[0]-1].shiny
      
    }
    
    db.set(`info_` + message.author.id, parseInt(args[0]) - 1)
    
    let selected = pokemon[args[0]-1].name.capitalize()
    let level = pokemon[args[0]-1].level
    let iv = pokemon[args[0]-1].totaliv
    
    let prefix = db.fetch(`prefix_` + message.guild.id);
    
    if(prefix === null) prefix = "p!";
    
    if(pokemon[args[0] - 1].mega === true && pokemon[args[0] - 1].name === "pikachu") return message.channel.send(new MessageEmbed().setAuthor(`Successfully selected your Detective ${selected}`, "https://cdn.discordapp.com/emojis/712335600950444153.gif?v=1").setColor("#fba05b").setDescription(`**Level:** ${level}\n**IV:** ${iv}%`).setTimestamp())

    if(pokemon[args[0] - 1].mega === true && pokemon[args[0] - 1].name === "groudon" || pokemon[args[0] - 1].name === "kyogre") return message.channel.send(new MessageEmbed().setAuthor(`Successfully selected your Primal ${selected}`, "https://cdn.discordapp.com/emojis/712335600950444153.gif?v=1").setColor("#fba05b").setDescription(`**Level:** ${level}\n**IV:** ${iv}%`).setTimestamp())

    if(pokemon[args[0] - 1].mega === true) return message.channel.send(new MessageEmbed().setAuthor(`Successfully selected your Mega ${selected}`, "https://cdn.discordapp.com/emojis/712335600950444153.gif?v=1").setColor("#fba05b").setDescription(`**Level:** ${level}\n**IV:** ${iv}%`).setTimestamp())

    message.channel.send(new MessageEmbed().setAuthor(`Successfully selected your ${selected}`, "https://cdn.discordapp.com/emojis/712335600950444153.gif?v=1").setColor("#fba05b").setDescription(`**Level:** ${level}\n**IV:** ${iv}%`).setTimestamp())
    
  }
}