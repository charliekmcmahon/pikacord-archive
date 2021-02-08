const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const {get} = require('request-promise-native')
var voucher_codes = require('voucher-code-generator');
module.exports={
  name: "learn",  
  description: "Check your balance",
  usage: "<new prefix>",
  run: async(bot,message,args) => {

    const p = db.fetch(`yourpokemons_` + message.author.id)
    let num = db.fetch(`info_` + message.author.id)
    let info = p[num];

    const body = await get({url: `https://pokeapi.co/api/v2/move/${args.slice(1).join(" ").replace(/ /g, "-")}`, json: true})
    const body2 = await get({url: `https://pokeapi.co/api/v2/pokemon/${info.id}`, json: true})

    const availableMoves = body2.moves.map(m => m.move.name)
    console.log(availableMoves)
    if(!availableMoves.includes(args.slice(1).join(" ").replace(/ /g, "-"))) return message.channel.send("Your pokemon can't learn the selected move!")
    let data = {
      "hpstat": info.hpstat,
      "atkstat": info.atkstat,
      "defstat": info.defstat,
      "spatkstat": info.spatkstat,
      "spdefstat": info.spdefstat,
      "hpiv": info.hpiv,
      "atkiv": info.atkiv,
      "defiv": info.defiv,
      "spatkiv": info.spatkiv,
      "spdefiv": info.spdefiv,
      "speediv": info.speediv,
      "totaliv": info.totaliv,
      "name": info.name,
      "id": info.id,
      "shiny": info.shiny,
      "mega": info.mega,
      "level": info.level,
      "xp": info.xp,
      "moves": [info.moves[0], info.moves[1], info.moves[2], info.moves[3]]
    }

    if(args[0].toLowerCase() === '1') {
       data = {
      "hpstat": info.hpstat,
      "atkstat": info.atkstat,
      "defstat": info.defstat,
      "spatkstat": info.spatkstat,
      "spdefstat": info.spdefstat,
      "hpiv": info.hpiv,
      "atkiv": info.atkiv,
      "defiv": info.defiv,
      "spatkiv": info.spatkiv,
      "spdefiv": info.spdefiv,
      "speediv": info.speediv,
      "totaliv": info.totaliv,
      "name": info.name,
      "id": info.id,
      "shiny": info.shiny,
      "mega": info.mega,
      "level": info.level,
      "xp": info.xp,
      "moves": [body.id, info.moves[1], info.moves[2], info.moves[3]]
    }

    }else if(args[0].toLowerCase() === '2') {
       data = {
      "hpstat": info.hpstat,
      "atkstat": info.atkstat,
      "defstat": info.defstat,
      "spatkstat": info.spatkstat,
      "spdefstat": info.spdefstat,
      "hpiv": info.hpiv,
      "atkiv": info.atkiv,
      "defiv": info.defiv,
      "spatkiv": info.spatkiv,
      "spdefiv": info.spdefiv,
      "speediv": info.speediv,
      "totaliv": info.totaliv,
      "name": info.name,
      "id": info.id,
      "shiny": info.shiny,
      "mega": info.mega,
      "level": info.level,
      "xp": info.xp,
      "moves": [info.moves[0], body.id, info.moves[2], info.moves[3]]
    }
    }else if(args[0].toLowerCase() === '3') {
       data = {
      "hpstat": info.hpstat,
      "atkstat": info.atkstat,
      "defstat": info.defstat,
      "spatkstat": info.spatkstat,
      "spdefstat": info.spdefstat,
      "hpiv": info.hpiv,
      "atkiv": info.atkiv,
      "defiv": info.defiv,
      "spatkiv": info.spatkiv,
      "spdefiv": info.spdefiv,
      "speediv": info.speediv,
      "totaliv": info.totaliv,
      "name": info.name,
      "id": info.id,
      "shiny": info.shiny,
      "mega": info.mega,
      "level": info.level,
      "xp": info.xp,
      "moves": [info.moves[0], info.moves[1], body.id, info.moves[3]]
    }
    }else if(args[0].toLowerCase() === '4') {
       data = {
      "hpstat": info.hpstat,
      "atkstat": info.atkstat,
      "defstat": info.defstat,
      "spatkstat": info.spatkstat,
      "spdefstat": info.spdefstat,
      "hpiv": info.hpiv,
      "atkiv": info.atkiv,
      "defiv": info.defiv,
      "spatkiv": info.spatkiv,
      "spdefiv": info.spdefiv,
      "speediv": info.speediv,
      "totaliv": info.totaliv,
      "name": info.name,
      "id": info.id,
      "shiny": info.shiny,
      "mega": info.mega,
      "level": info.level,
      "xp": info.xp,
      "moves": [info.moves[0], info.moves[1], info.moves[2], body.id]
    }
    }

    p.splice(num, 1)
    db.set(`yourpokemons_` + message.author.id, p)
    db.push(`yourpokemons_` + message.author.id, data)
    message.channel.send(`Move slot **${args[0]}** has been replaced with **${body.name.capitalize()}**`)

  }
}