const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { stripIndents } = require("common-tags");
const ms = require('ms')
const {get} = require('request-promise-native')
const Canvas = require('canvas');
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports={
  name: "wild",
  aliases: ["stat"],
  description: "Show list of help commands",
  usage: "help [command]",
  run: async(bot, message, args) => {
    let p = db.fetch(`yourpokemons_` + message.author.id)
    let num = db.fetch(`info_` + message.author.id)
    let pokemon = p[num];
    let prefix = db.fetch(`prefix_` + message.guild.id)
    if(!prefix) prefix = "p!";
    const body = await get({url: `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`, json: true})
    console.log(pokemon)
    const body2 = await get({url: `https://pokeapi.co/api/v2/pokemon/${Math.floor((Math.random() * 500) + 1)}`, json: true})
    const canvas = Canvas.createCanvas(1920, 1080);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://img.techpowerup.org/200531/eh.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    let pokemons = await Canvas.loadImage(`https://img.pokemondb.net/sprites/home/normal/${body.name}.png`);
    if(pokemon.shiny === true) pokemons = await Canvas.loadImage(`https://img.pokemondb.net/sprites/home/shiny/${body.name}.png`);
    ctx.drawImage(pokemons, 185, 380, 500, 500);
    const opp = await Canvas.loadImage(`https://img.pokemondb.net/sprites/home/normal/${body2.name}.png`);
    ctx.drawImage(opp, 1250, 380, 500, 500);
    
    let hp = pokemon.hpstat
    let npcHp = 150
    let Embed = new MessageEmbed()
    .setAuthor(`${pokemon.name.capitalize()} vs Wild ${body2.name.capitalize()}`)
    .setDescription(`**${body.name.capitalize()} Hp** : ${hp}\n**${body2.name.capitalize()} Hp** : ${npcHp}`)
    .attachFiles([{name: 'duel.png', attachment: canvas.toBuffer()}])
    .setImage("attachment://duel.png")
    .setColor("#fba05b")
    const m = await message.channel.send(Embed)
    const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, {time: 1200000})
    collector.on('collect', async msg => {
      if(msg.content.toLowerCase() === prefix + "use 1") {
        const a = await get({url: `https://pokeapi.co/api/v2/move/${pokemon.moves[0]}`, json: true})
        const toDamage = a.power;
        message.channel.send(`**You** dealt **${toDamage} Damages** **|** **${body.name.capitalize()}** used **${a.name.capitalize()}**`)
        npcHp -= toDamage
        if(npcHp <= 0) {
          Embed = new MessageEmbed()
          .setAuthor(`${pokemon.name.capitalize()} vs Wild ${body2.name.capitalize()}`)
          .setDescription(`**${body.name.capitalize()} Hp** : ${hp}\n**${body2.name.capitalize()} Hp** : 0`)
          .attachFiles([{name: 'duel.png', attachment: canvas.toBuffer()}])
          .setImage("attachment://duel.png")
          .setColor("#08fa00")
          m.edit(Embed)
          message.channel.send(`The Wild **${body2.name.capitalize()}** fainted`)
          collector.stop()
          return;
        }
        const c = await get({url: `https://pokeapi.co/api/v2/pokemon/${body2.name}`, json: true})
        const b = await get({url: c.moves[getRandomInt(0, 3)].move.url, json: true})
        const playerDamage = b.power
        hp -= playerDamage
        message.channel.send(`The wild **${body2.name.capitalize()}** dealt **${playerDamage} Damages** **|** **${body2.name.capitalize()}** used **${b.name.capitalize()}**`)
        if(hp <= 0) {
          Embed = new MessageEmbed()
          .setAuthor(`${pokemon.name.capitalize()} vs Wild ${body2.name.capitalize()}`)
          .setDescription(`**${body.name.capitalize()} Hp** : 0\n**${body2.name.capitalize()} Hp** : ${npcHp}`)
          .attachFiles([{name: 'duel.png', attachment: canvas.toBuffer()}])
          .setImage("attachment://duel.png")
          .setColor("#fa0000")
          m.edit(Embed)
          message.channel.send(`**${body.name.capitalize()}** fainted`)
          collector.stop()
          return;
        }
        Embed = new MessageEmbed()
        .setAuthor(`${pokemon.name.capitalize()} vs Wild ${body2.name.capitalize()}`)
        .setDescription(`**${body.name.capitalize()} Hp** : ${hp}\n**${body2.name.capitalize()} Hp** : ${npcHp}`)
        .attachFiles([{name: 'duel.png', attachment: canvas.toBuffer()}])
        .setImage("attachment://duel.png")
        .setColor("#fba05b")
        m.edit(Embed)
      }
      if(msg.content.toLowerCase() === prefix + "use 2") {
        const a = await get({url: `https://pokeapi.co/api/v2/move/${pokemon.moves[1]}`, json: true})
        const toDamage = a.power;
        message.channel.send(`**You** dealt **${toDamage} Damages** **|** **${body.name.capitalize()}** used **${a.name.capitalize()}**`)
        npcHp -= toDamage
        if(npcHp <= 0) {
          Embed = new MessageEmbed()
          .setAuthor(`${pokemon.name.capitalize()} vs Wild ${body2.name.capitalize()}`)
          .setDescription(`**${body.name.capitalize()} Hp** : ${hp}\n**${body2.name.capitalize()} Hp** : 0`)
          .attachFiles([{name: 'duel.png', attachment: canvas.toBuffer()}])
          .setImage("attachment://duel.png")
          .setColor("#08fa00")
          m.edit(Embed)
          message.channel.send(`The Wild **${body2.name.capitalize()}** fainted`)
          collector.stop()
          return;
        }
        const c = await get({url: `https://pokeapi.co/api/v2/pokemon/${body2.name}`, json: true})
        const b = await get({url: c.moves[getRandomInt(0, 3)].move.url, json: true})
        const playerDamage = b.power
        hp -= playerDamage
        message.channel.send(`The wild **${body2.name.capitalize()}** dealt **${playerDamage} Damages** **|** **${body2.name.capitalize()}** used **${b.name.capitalize()}**`)
        if(hp <= 0) {
          Embed = new MessageEmbed()
          .setAuthor(`${pokemon.name.capitalize()} vs Wild ${body2.name.capitalize()}`)
          .setDescription(`**${body.name.capitalize()} Hp** : 0\n**${body2.name.capitalize()} Hp** : ${npcHp}`)
          .attachFiles([{name: 'duel.png', attachment: canvas.toBuffer()}])
          .setImage("attachment://duel.png")
          .setColor("#fa0000")
          m.edit(Embed)
          message.channel.send(`**${body.name.capitalize()}** fainted`)
          collector.stop()
          return;
        }
        Embed = new MessageEmbed()
        .setAuthor(`${pokemon.name.capitalize()} vs Wild ${body2.name.capitalize()}`)
        .setDescription(`**${body.name.capitalize()} Hp** : ${hp}\n**${body2.name.capitalize()} Hp** : ${npcHp}`)
        .attachFiles([{name: 'duel.png', attachment: canvas.toBuffer()}])
        .setImage("attachment://duel.png")
        .setColor("#fba05b")
        m.edit(Embed)
      }
      if(msg.content.toLowerCase() === prefix + "use 3") {
        const a = await get({url: `https://pokeapi.co/api/v2/move/${pokemon.moves[2]}`, json: true})
        const toDamage = a.power;
        message.channel.send(`**You** dealt **${toDamage} Damages** **|** **${body.name.capitalize()}** used **${a.name.capitalize()}**`)
        npcHp -= toDamage
        if(npcHp <= 0) {
          Embed = new MessageEmbed()
          .setAuthor(`${pokemon.name.capitalize()} vs Wild ${body2.name.capitalize()}`)
          .setDescription(`**${body.name.capitalize()} Hp** : ${hp}\n**${body2.name.capitalize()} Hp** : 0`)
          .attachFiles([{name: 'duel.png', attachment: canvas.toBuffer()}])
          .setImage("attachment://duel.png")
          .setColor("#08fa00")
          m.edit(Embed)
          message.channel.send(`The Wild **${body2.name.capitalize()}** fainted`)
          collector.stop()
          return;
        }
        const c = await get({url: `https://pokeapi.co/api/v2/pokemon/${body2.name}`, json: true})
        const b = await get({url: c.moves[getRandomInt(0, 3)].move.url, json: true})
        const playerDamage = b.power
        hp -= playerDamage
        message.channel.send(`The wild **${body2.name.capitalize()}** dealt **${playerDamage} Damages** **|** **${body2.name.capitalize()}** used **${b.name.capitalize()}**`)
        if(hp <= 0) {
          Embed = new MessageEmbed()
          .setAuthor(`${pokemon.name.capitalize()} vs Wild ${body2.name.capitalize()}`)
          .setDescription(`**${body.name.capitalize()} Hp** : 0\n**${body2.name.capitalize()} Hp** : ${npcHp}`)
          .attachFiles([{name: 'duel.png', attachment: canvas.toBuffer()}])
          .setImage("attachment://duel.png")
          .setColor("#fa0000")
          m.edit(Embed)
          message.channel.send(`**${body.name.capitalize()}** fainted`)
          collector.stop()
          return;
        }
        Embed = new MessageEmbed()
        .setAuthor(`${pokemon.name.capitalize()} vs Wild ${body2.name.capitalize()}`)
        .setDescription(`**${body.name.capitalize()} Hp** : ${hp}\n**${body2.name.capitalize()} Hp** : ${npcHp}`)
        .attachFiles([{name: 'duel.png', attachment: canvas.toBuffer()}])
        .setImage("attachment://duel.png")
        .setColor("#fba05b")
        m.edit(Embed)
      }
      if(msg.content.toLowerCase() === prefix + "use 4") {
        const a = await get({url: `https://pokeapi.co/api/v2/move/${pokemon.moves[3]}`, json: true})
        const toDamage = a.power;
        message.channel.send(`**You** dealt **${toDamage} Damages** **|** **${body.name.capitalize()}** used **${a.name.capitalize()}**`)
        npcHp -= toDamage
        if(npcHp <= 0) {
          Embed = new MessageEmbed()
          .setAuthor(`${pokemon.name.capitalize()} vs Wild ${body2.name.capitalize()}`)
          .setDescription(`**${body.name.capitalize()} Hp** : ${hp}\n**${body2.name.capitalize()} Hp** : 0`)
          .attachFiles([{name: 'duel.png', attachment: canvas.toBuffer()}])
          .setImage("attachment://duel.png")
          .setColor("#08fa00")
          m.edit(Embed)
          message.channel.send(`The Wild **${body2.name.capitalize()}** fainted`)
          collector.stop()
          return;
        }
        const c = await get({url: `https://pokeapi.co/api/v2/pokemon/${body2.name}`, json: true})
        const b = await get({url: c.moves[getRandomInt(0, 3)].move.url, json: true})
        const playerDamage = b.power
        hp -= playerDamage
        message.channel.send(`The wild **${body2.name.capitalize()}** dealt **${playerDamage} Damages** **|** **${body2.name.capitalize()}** used **${b.name.capitalize()}**`)
        if(hp <= 0) {
          Embed = new MessageEmbed()
          .setAuthor(`${pokemon.name.capitalize()} vs Wild ${body2.name.capitalize()}`)
          .setDescription(`**${body.name.capitalize()} Hp** : 0\n**${body2.name.capitalize()} Hp** : ${npcHp}`)
          .attachFiles([{name: 'duel.png', attachment: canvas.toBuffer()}])
          .setImage("attachment://duel.png")
          .setColor("#fa0000")
          m.edit(Embed)
          message.channel.send(`**${body.name.capitalize()}** fainted`)
          collector.stop()
          return;
        }
        Embed = new MessageEmbed()
        .setAuthor(`${pokemon.name.capitalize()} vs Wild ${body2.name.capitalize()}`)
        .setDescription(`**${body.name.capitalize()} Hp** : ${hp}\n**${body2.name.capitalize()} Hp** : ${npcHp}`)
        .attachFiles([{name: 'duel.png', attachment: canvas.toBuffer()}])
        .setImage("attachment://duel.png")
        .setColor("#fba05b")
        m.edit(Embed)
      }
    })
  }
}