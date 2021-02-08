const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
module.exports={
  name: "top",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args)=>{
    
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }
    
    let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data)
    
    money.length = 10;
    
    var finalLb = "";
    
    for (var i in money) {
      finalLb += `**${bot.users.cache.get(money[i].ID.split(`_`)[1]) ? bot.users.cache.get(money[i].ID.split(`_`)[1]).username : "Unknown User"}**・Total Balance: £${(money[i].data).toLocaleString('en')}\n`;
    }
    
    const Embed = new MessageEmbed()
    .setAuthor(`${bot.user.username} ▪ Shards Leaderboard`, bot.user.displayAvatarURL())
    .setColor("#fba05b")
    .setDescription(finalLb)
    .setFooter(`Last update`)
    .setTimestamp()
    message.channel.send(Embed);
    
  }
}