const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
var voucher_codes = require('voucher-code-generator');
module.exports={
  name: "buy",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {
    
    return message.channel.send("Under Maintenance")
    
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }
    
    let user = message.mentions.users.first()
    let bal = db.fetch(`money_` + message.author.id)
    
    let offer = parseInt(args[1])
    if(!offer) offer = 0
    if(!user) return message.channel.id("You need to mention the user you want to trade!")
    
    if(bal < args[0]) return message.channel.send("You don't have enough money!")
    
    let poke2 = db.fetch(`info_` + user.id)
    let content2 = "```" + `Pokemon: ${poke2.name.capitalize()}\nLevel: ${poke2.level}\nHP: ${poke2.hpstat} - IV: ${poke2.hpiv}\nAttack: ${poke2.atkstat} - IV: ${poke2.atkiv}\nDefense: ${poke2.defstat} - IV: ${poke2.defiv}\nSp Attack: ${poke2.spatkstat} - IV: ${poke2.spatkiv}\nSp Defense: ${poke2.spdefstat} - IV: ${poke2.spdefiv}\nSpeed: ${poke2.speedstat} - IV: ${poke2.speediv}\nTotal IV %: ${poke2.totaliv}` + "```"
    let mon2 = db.fetch(`yourpokemons_` + user.id)
    
    let Embed = new MessageEmbed()
    .setAuthor(`Pokemon Trade`, "https://cdn.discordapp.com/emojis/700309065355493496.gif?v=1")
    .addField(`**${message.author.username}'s Offer**`, "```" + `${(offer).toLocaleString('en')} Credits` + "```")
    .addField(`**${user.username}'s Pokemon**`, content2, true)
    .setColor("#fba05b")
    .setFooter(`${user.username}・Type p!accept to accept ${message.author.username}'s offer`)
    let msg = await message.channel.send(Embed)
    
    const filter = m => m.author.id === user.id && m.content.toLowerCase() === "p!accept" || m.content.toLowerCase() === "p!decline"
    message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }).then(async collected => {
      
      if(collected.first().content.toLowerCase() === "p!accept") {
        
        const index = mon2.indexOf(poke2)
        
        mon2.splice(index, 1)
        db.set(`yourpokemons_` + user.id, mon2)
        
        db.set(`money_` + message.author.id, bal-offer)
        db.add(`money_` + user.id, offer)
        db.push(`yourpokemons_` + message.author.id, poke2)
        let Embed2 = new MessageEmbed()
        .setAuthor(`Pokemon Offer`, "https://cdn.discordapp.com/emojis/700309065355493496.gif?v=1")
        .setDescription("**OFFER HAS BEEN ACCEPTED** <a:emoji:726281584604479549>")
        .addField(`**${message.author.username}'s Offer**`, "```" + `${(offer).toLocaleString('en')} Credits` + "```")
        .addField(`**${user.username}'s Pokemon**`, content2)
        .setColor("#29f20a")
        .setFooter(`${user.username}・Thank you for accepting the offer!`)
        msg.edit(Embed2)
        
      }else{
        
        message.channel.send("Offer has been declined!")
        
      }
      
    })
    
  }
}