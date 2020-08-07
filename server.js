const Eris = require('eris');
 
const bot = new Eris("NzQwODcwODg2NjI1NjQwNDc4.XyvTyA.JGbDQ5czKnwB97KVaTicNgSnFrY");

var active_po = null;
var active_po_id = null;
var active_po_name = null;

var queue = [];
var found = false;
var q;
bot.on('ready', () => {                                
    console.log('Ready!');                             
});
 
bot.on('messageCreate', (msg) => {   
  //console.log(msg);
    if(msg.content.substring(0,1) == ("-")) {   
      var split = msg.content.split(" ");
      //console.log(msg);
      if (split[0] =="-need"){
        if (active_po != null){
          if(split[1] == "gm"){
            if (queue.length == 0){
              bot.createMessage(msg.channel.id, active_po + " assign grand maester to '"+msg.author.username+"'");  
              queue.push(msg.author);
            }else{
              queue.push(msg.author);
              bot.createMessage(msg.channel.id, msg.author.username + " was added to queue, you are on position "+ queue.length);
            }
          }
        }else{
          bot.createMessage(msg.channel.id, "Nobody is logged as PO at this moment"); 
        }
      }
      else if (split[0] =="-done"){
        if (queue.length > 0){
          if (queue[0].username == msg.author.username){
            queue.shift();
            if (queue.length > 0){
              bot.createMessage(msg.channel.id, active_po + " assign grand maester to '"+queue[0].author.username+"'");  
            }
          }else{
            found = false;
            for (var i = 0 ; i < queue.length ; i++){
              if (queue[i].username == msg.author.username){
                queue.splice(i,1);
                bot.createMessage(msg.channel.id, queue[0].author.username + " has been removed from queue ");  
                found = true;
                break;
              }
            }
            if (!found){
              bot.createMessage(msg.channel.id, queue[0].author.username + " you are not even in queue ");
            }
          }
        }else{
          bot.createMessage(msg.channel.id, queue[0].author.username + " you are not even in queue ");
        }
      }
      else if (split[0] =="-q"){
        q = "Queue for GM: ```";
        for (var i = 0 ; i < queue.length ; i++){
          if (i == 0){
            q = q + i +". --> "+ queue[i].username;
          }else{
            q = q +"\n"+ i +". "+ queue[i].username;
          }
        }
        q = q + "```";
        bot.createMessage(msg.channel.id, q);
      }
      else if (split[0] =="-activate"){
        console.log(msg.member.roles);
        if (msg.member.roles.includes("740980216708726836")){
          if (active_po == null){
            active_po = "<@"+msg.author.id+">";
            active_po_id = msg.author.id;
            active_po_name = msg.author.username;
            queue = [];
            bot.createMessage(msg.channel.id, msg.author.username + " is now active PO, you can ask for titles");  
          }else{
            bot.createMessage(msg.channel.id, active_po_name + " is already logged as PO"); 
          }
        }else{
          bot.createMessage(msg.channel.id, " Only members with PO role can assing to PO"); 
        }
      }
      else if (split[0] =="-deactivate"){
        if (active_po != null){
          if(active_po_id == msg.author.id){
            active_po = null;
            active_po_id = null;
            active_po_name = null;
            queue = [];
            bot.createMessage(msg.channel.id, msg.author.username + " is no longer logged as PO , please wait for next one");
          }else{
            bot.createMessage(msg.channel.id, "Only active PO can use -deactivate");  
          }
        }else{
          bot.createMessage(msg.channel.id, "Nobody is logged as PO at this moment");  
        }
      }
    }
});
 
bot.connect();                                           