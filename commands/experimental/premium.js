const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
var voucher_codes = require('voucher-code-generator');
module.exports={
  name: "premium",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {
    
    let isPremium = db.fetch(`premium_` + message.guild.id)
    
    let text = "Not a Premium Guild";
    
    if(isPremium === true) text = "This Guild is Premium";
    
    let Embed = new MessageEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setDescription(`**Premium Status:** ${text}`)
    .setColor("#fba05b")
    message.channel.send(Embed)
    
  }
}