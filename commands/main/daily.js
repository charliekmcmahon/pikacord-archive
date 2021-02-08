const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
var voucher_codes = require('voucher-code-generator');
module.exports={
  name: "daily",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {
    
    let Embed = new MessageEmbed()
    .setAuthor("You already claimed your daily!", "https://cdn.discordapp.com/emojis/696936608313901116.gif?v=1")
    .setDescription("[Click me to vote every 12 hours!](https://top.gg/bot/712109633862631473/vote) \n Currently disabled but all votes are still appreciated!")
    .setFooter("Vote to help us develop the bot!")
    .setTimestamp()
    .setColor("#fba05b")
    
    if(!message.member.roles.cache.has('726039894757212170')) return message.channel.send(Embed)
    
    db.add(`money_` + message.author.id, 500)
    let Embed2 = new MessageEmbed()
    .setAuthor("Thank you for voting!", "https://cdn.discordapp.com/emojis/700309065355493496.gif?v=1")
    .setDescription("**Need any help?**\n・Our Website: https://pikacord.xyz\n・Contact Us: [support@pikacord.xyz](https://www.gmail.com)\n**Reward**\n・500 Credits \nCurrently disabled but all votes are still appreciated!")
    .setFooter("Vote to help us develop the bot!")
    .setTimestamp()
    .setColor("#fba05b")
    message.channel.send(Embed2)
    
    message.member.roles.remove('726039894757212170')
    
  }
}