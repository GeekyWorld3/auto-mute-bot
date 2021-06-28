  
const discord = require('discord.js')
const client = new discord.Client()
const config = require('./config.json')
const db = require('wio.db')

client.on("ready", async () => {
  console.log(`Bot Is Ready To Go - ${client.user.tag}`);
});



client.login(process.env.TOKEN)

const { badwords } = require("./data.json") 

client.on('message', message => {



    let confirm = false;
   
    var i;
    for(i = 0;i < badwords.length; i++) {
      
      if(message.content.toLowerCase().includes(badwords[i].toLowerCase()))
        confirm = true;


      
    }

    if(confirm) {
      const log = client.channels.cache.get(config.channel);
const user = message.member
              const logEmbed = new discord.MessageEmbed()
        .setTitle(`${message.author.username}`)
        .setDescription(`Message: ${message.content}`)

      message.delete()
      message.channel.send(`**${message.author}, don't send these messages here or you will be muted by me**`)
      log.send(logEmbed)
      db.add(`warns_${message.author}`, 1)

      const warns = db.fetch(`warns_${message.author}`)

      if (warns > 2) {
          const member = message.guild.roles.cache.find(
 (role) => role.name === 'Member'
);

const mute = message.guild.roles.cache.find(
 (role) => role.name === 'Muted'
);

const chatEmbed = new discord.MessageEmbed()
.setColor("RED")
.setDescription(`**${user} was muted for continuous infractions.**`)

user.roles.add(mute)
user.roles.remove(member)
message.channel.send(chatEmbed)
db.delete(`warns_${message.author}`)
      }
      
      
    }    
   
 
})
