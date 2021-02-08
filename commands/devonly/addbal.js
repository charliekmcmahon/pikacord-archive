const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const adminid = require('./dev.json')
const {get} = require('request-promise-native')
module.exports={
  name: "addbal",  
  description: "Check your balance",
  run: async(bot,message,args) => {
    
    if(!adminid.includes(message.author.id)) return message.channel.send(new MessageEmbed().setAuthor("Insufficient Permission", "https://cdn.discordapp.com/emojis/696936608313901116.gif?v=1").setColor("#fba05b"))
    
    let user = message.mentions.users.first()
    
    if(!args[0]) return message.channel.send(`Please mention the user!`)
    
    if(!args[1]) return message.channel.send(`Please specify the amount of shards you want to give!`)
    
    db.add(`money_` + user.id, args[1])
    if(args[1] > 1) {
      
      return message.channel.send(`**${args[1]}** Credits has been sent to **${user.username}**`)
      
    }else{
      
      return message.channel.send(`**${args[1]}** Credits has been sent to **${user.username}**`)
      
    }
    
  }
}