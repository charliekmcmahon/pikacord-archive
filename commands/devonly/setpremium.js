const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const adminid = require('./dev.json')
const {get} = require('request-promise-native')
module.exports={
  name: "setpremium",  
  description: "Check your balance",
  run: async(bot,message,args) => {
    
    if(!adminid.includes(message.author.id)) return message.channel.send(new MessageEmbed().setAuthor("Insufficient Permission", "https://cdn.discordapp.com/emojis/696936608313901116.gif?v=1").setColor("#fba05b"))
    
    let msg = await message.channel.send(new MessageEmbed().setAuthor(`Are you sure you want to set ${message.guild.name} as a premium guild?`, message.guild.iconURL()).setDescription(`This will allow ${message.guild.name} to have all premium perks!`).setColor("#fba05b").setFooter("Reply with yes or no!").setTimestamp())
    const filter = m => m.author.id === message.author.id && m.content.toLowerCase() === "yes" || m.content.toLowerCase() === "no"
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
      
      if(collected.first().content.toLowerCase() === "yes") {
        
        db.set(`premium_` + message.guild.id, true)
        msg.edit(new MessageEmbed().setAuthor(`${message.guild.name} is now a Premium Guild!`, "https://cdn.discordapp.com/emojis/700309065355493496.gif?v=1").setColor("#19e623").setDescription(`${message.guild.name} will now have all premium guild features!`).setTimestamp())
      
      }else{
        
        msg.edit(new MessageEmbed().setAuthor(`Operation has been cancelled!`, "https://cdn.discordapp.com/emojis/696936608313901116.gif?v=1").setColor("#c92222").setTimestamp())
        
      }
      
    })
    
  }
}