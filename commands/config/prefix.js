const {MessageEmbed} = require('discord.js');
const fs = require("fs");
let db = require('quick.db')
module.exports={
  name: "prefix",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {
    
    let prefix = db.fetch(`pref_` + message.guild.id)
    if(prefix === null) prefix = "p!"
    
    if(!args[0]) return message.channel.send("The current prefix for this server is **" + prefix + "**")
    
    message.channel.send(`Server prefix has been changed to **${args[0]}**`)
    db.set(`prefix_` + message.guild.id, args[0])
    
  }
}        