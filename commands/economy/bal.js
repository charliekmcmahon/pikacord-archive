const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
module.exports={
  name: "bal",
  aliases: ['balance', 'shards', 'shard', 'money'],
  description: "Check your balance",
  run: async(bot,message,args) => {
    
    let pokemon = db.fetch(`yourpokemons_` + message.author.id)
    
    let prefix = db.fetch(`prefix_` + message.guild.id)
    if(prefix === null) prefix = "p!"
    if(!pokemon) return message.channel.send(`Type **${prefix}start** to begin your journey!`)
    
    let money = db.fetch(`money_` + message.author.id)
    let shard = db.fetch(`shards_` + message.author.id)
    
    if(shard === null) shard = 0
    if(money === null) money = 0
    
    let Embed = new MessageEmbed()
    .setAuthor(`${message.author.username}'s Balance`, "https://www.pngrepo.com/download/303723/crystal-shard.png")
    .setColor("#fba05b")
    .addField("**Shards**", `${(money).toLocaleString('en')} Shards`) 
    
    if(shard > 1) {
      
      Embed.addField("**Redeems**", `${(shard).toLocaleString('en')} Redeems`)
      
    }else{
      
      Embed.addField("**Redeems**", `${(shard).toLocaleString('en')} Redeem`)
      
    }
    
    message.channel.send(Embed)
    
  }
}