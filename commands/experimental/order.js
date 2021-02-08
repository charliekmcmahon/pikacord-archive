const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
var voucher_codes = require('voucher-code-generator');
module.exports={
  name: "order",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {
    
    let order = db.fetch(`order_` + message.author.id)
    
    if(!args[0]) return
    
    let list = ["alphabetical"]
    
    if(!list.includes(args[0])) return
    
    message.channel.send("Your pokemon will now displayed in alphabetical order!")
    db.set(`order_` + message.author.id, "alphabetical")
    
  }
}