const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
var voucher_codes = require('voucher-code-generator');

let trade = {}

module.exports={
  name: "trade",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {

    let user = message.mentions.users.first()

    let td1 = trade[message.author.id]
    let td2 = trade[user.id]

    let Embed = new MessageEmbed()
    .addField("Trade A", "``` ```")
    .addField("Trade B", "``` ```")
    let me = message.channel.send(Embed)
    const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id || m.author.id === user.id, {time: 150000})

    collector.on('collect', async msg => {

      const ar = msg.content.slice(7)

      if(msg.content.toLowerCase().startsWith(`p!p add `)) {

        trade[msg.author.id].push(ar)

        Embed = new MessageEmbed()
        .addField("Trade A", "```" + `${td1.map(t => t).join("\n")}` + "```")
        .addField("Trade B", "``` ```")
        me.edit(Embed)

      }

    })
    
  }
}