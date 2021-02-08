const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
module.exports={
  name: "premium-code",  
  description: "Check your balance",
  run: async(bot,message,args) => {
    
    let pokemon = db.fetch(`yourpokemons_` + message.author.id)
    
    if(!pokemon) return message.channel.send("Type **p!start** to begin your journey!")
    
    if(!args[0]) return message.channel.send(`Please specify the code!`)
    
    let code = db.fetch(`${args[0]}_premium`)
    
    if(code === null || code === false) return message.channel.send(`Your code is **INVALID**`)
    
    let msg = await message.channel.send(new MessageEmbed().setAuthor(`Are you sure you want to set ${message.guild.name} as a premium guild?`, message.guild.iconURL()).setDescription(`This will give ${message.guild.name} all premium perks!`).setColor("#fba05b").setFooter("Reply with yes or no!").setTimestamp())
    const filter = m => m.author.id === message.author.id && m.content.toLowerCase() === "yes" || m.content.toLowerCase() === "no"
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
      
      if(collected.first().content.toLowerCase() === "yes") {
        
        db.set(`premium_` + message.guild.id, true)
        msg.edit(new MessageEmbed().setAuthor(`Congratulation! ${message.guild.name} is now a Premium Guild!`, "https://cdn.discordapp.com/emojis/700309065355493496.gif?v=1").setColor("#19e623").setDescription(`${message.guild.name} will now have all premium guild features!`).setTimestamp())
        await tdb.set(`${args[0]}_premium`, false)
        
      }else{
        
        msg.edit(new MessageEmbed().setAuthor(`You can use the code next time`, "https://cdn.discordapp.com/emojis/696936608313901116.gif?v=1").setColor("#c92222").setTimestamp())
        
      }
      
    })
    
  }
}