const {MessageEmbed} = require('discord.js');
const fs = require("fs");
let db = require('quick.db')
module.exports={
  name: "redirect",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {
    
    let channel = message.mentions.channels.first()
    
    if(!channel) {
    
      db.set(`redirectspawn_` + message.guild.id, null)
      message.channel.send("Spawn redirect has been disabled!")
      
    }
    
    db.set(`redirectspawn_` + message.guild.id, channel.id)
    message.channel.send("Spawn has been redirected to **" + channel.name + "**")
    
  }
}        