const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const adminid = require('./dev.json')
const {get} = require('request-promise-native')
module.exports={
  name: "status",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {
    
    if(!adminid.includes(message.author.id)) return message.channel.send(new MessageEmbed().setAuthor("Insufficient Permission", "https://cdn.discordapp.com/emojis/696936608313901116.gif?v=1").setColor("#fba05b"))
    
    let top = bot.guilds.cache.get('264445053596991498').memberCount
    let final = bot.users.cache.size - top;

    let Embed = new MessageEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .addField(`**Guilds**`, "```" + `${(bot.guilds.cache.size).toLocaleString('en')}` + "```", true)
    .addField(`**Members**`, "```" + `${(top).toLocaleString('en')}` + "```", true)
    .addField(`**Developers**`, "```BigChungus#2441\nMacca™#0001\nTravdrag#8657\nHyp3r#0001```")
    .setColor("#fba05b")
    message.channel.send(Embed)
    
  }
}