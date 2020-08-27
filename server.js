const Eris = require('eris');
 
const bot = new Eris("NzQwODcwODg2NjI1NjQwNDc4.XyvTyA.JGbDQ5czKnwB97KVaTicNgSnFrY");

var active_po = null;
var active_po_id = null;
var active_po_name = null;

var queue_gm = [];
var queue_cb = [];
var queue_mow = [];
var found = false;
var q;
var num;
var name;
var counter = 0;

var nick;
var use_nick;


bot.on('ready', () => {
    console.log('Ready!');
});

bot.on('messageCreate', (msg) => {
  //console.log(msg);
	var channel = msg.channel;
	if (msg.member.nick != null){
		nick = [msg.member.nick , msg.author.id];
	}else{
		nick = [msg.author.username , msg.author.id];
	}
    if(msg.content.substring(0,1) == ("-")) {
      var split = msg.content.split(" ");
	  
	  if (split[0] =="-activate"){
		console.log(msg.member.roles);
		//bot.createMessage(msg.channel.id, msg.member.roles[0]);
		if (msg.member.roles.includes("709564651461148675") || msg.member.roles.includes("740858481271111691")){
		  if (active_po == null){
			active_po = "<@"+nick[1]+">";
			active_po_id = nick[1];
			active_po_name = nick[0];
			queue_gm = [];
			queue_cb = [];
			queue_mow = [];
			
			channel = msg.channel;
			channel.edit({name: "open-buff-request"},"open-buff-request");
			bot.createMessage(msg.channel.id, nick[0] + " is now active PO, you can ask for titles");
		  }else{
			bot.createMessage(msg.channel.id, active_po_name + " is already logged as PO");
		  }
		}else{
		  bot.createMessage(msg.channel.id, " Only members with PO role can assing to PO");
		}
	  }
	  
	  else if (active_po != null){
		  //console.log(msg);
		  if (split[0] =="-need"){
			if (active_po != null){
			  if(split[1] == "gm"){
				counter = counter + 1;
				if (split.length > 2){
				  name = split[2];
				  for (var i = 3 ; i < split.length ; i++){
					name = name + " " + split[i];
				  }
				  if (queue_gm.length == 0){
					bot.createMessage(msg.channel.id, active_po + " assign grand maester to "+ name+" , asked by '"+nick[0]+"'");
					queue_gm.push([msg.member,name]);
				  }else{
					found = false;
					for (var i = 0 ; i < queue_gm.length ; i++){
					  if ((queue_gm[i][0].nick == nick[0] || queue_gm[i][0].user.username == nick[0]) && queue_gm[i][1] == name) {
						bot.createMessage(msg.channel.id, queue_gm[i][1] + " is already in GM queue");
						found = true;
						break;
					  }
					}
					if (!found) {
					  queue_gm.push([msg.member,name]);
					  bot.createMessage(msg.channel.id, name + " was added to GM queue, you are on position " + queue_gm.length + " asked by " + nick[0]);
					}
					found = false;
				  }
				}else {
				  if (queue_gm.length == 0) {
					bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + nick[0] + "'");
					queue_gm.push([msg.member,nick[0]]);
				  } else {
					found = false;
					for (var i = 0; i < queue_gm.length; i++) {
					  if (queue_gm[i][1] == nick[0] && (queue_gm[i][0].nick == nick[0] || queue_gm[i][0].user.username == nick[0])) {
						bot.createMessage(msg.channel.id, nick[0] + " you are already in GM queue");
						found = true;
						break;
					  }
					}
					if (!found) {
					  queue_gm.push([msg.member,nick[0]]);
					  bot.createMessage(msg.channel.id, nick[0] + " was added to GM queue, you are on position " + queue_gm.length);
					}
					found = false;
				  }
				}
			  }else if (split[1] == "cb"){
				counter = counter + 1;
				if (split.length > 2) {
				  name = split[2];
				  for (var i = 3; i < split.length; i++) {
					name = name + " " + split[i];
				  }
				  if (queue_cb.length == 0) {
					bot.createMessage(msg.channel.id, active_po + " assign chief builder to "+ name+" , asked by '"+nick[0]+"'");
					queue_cb.push([msg.member,name]);
				  } else {
					found = false;
					for (var i = 0; i < queue_cb.length; i++) {
					  if ((queue_cb[i][0].nick == nick[0] || queue_cb[i][0].user.username == nick[0]) && queue_cb[i][1] == name) {
						bot.createMessage(msg.channel.id, queue_cb[i][1] + " is already in CB queue");
						found = true;
						break;
					  }
					}
					if (!found) {
					  queue_cb.push([msg.member,name]);
					  bot.createMessage(msg.channel.id, name + " was added to CB queue, you are on position " + queue_cb.length + " asked by " + nick[0]);
					}
					found = false;
				  }
				}else {
				  if (queue_cb.length == 0) {
					bot.createMessage(msg.channel.id, active_po + " assign chief builder to '" + nick[0] + "'");
					queue_cb.push([msg.member,nick[0]]);
				  } else {
					found = false;
					for (var i = 0; i < queue_cb.length; i++) {
					  if (queue_cb[i][1] == nick[0] && (queue_cb[i][0].nick == nick[0] || queue_cb[i][0].user.username == nick[0])) {
						bot.createMessage(msg.channel.id, nick[0] + " you are already in CB queue");
						found = true;
						break;
					  }
					}
					if (!found) {
					  queue_cb.push([msg.member,nick[0]]);
					  bot.createMessage(msg.channel.id, nick[0] + " was added to CB queue, you are on position " + queue_cb.length);
					}
					found = false;
				  }
				}
			  }else if(split[1] == "mow"){
				counter = counter + 1;
				if (split.length > 2){
				  name = split[2];
				  for (var i = 3 ; i < split.length ; i++){
					name = name + " " + split[i];
				  }
				  if (queue_mow.length == 0){
					bot.createMessage(msg.channel.id, active_po + " assign master of whisperers to "+ name+" , asked by '"+nick[0]+"'");
					queue_mow.push([msg.member,name]);
				  }else{
					found = false;
					for (var i = 0 ; i < queue_mow.length ; i++){
					  if ((queue_mow[i][0].nick == nick[0] || queue_mow[i][0].user.username == nick[0]) && queue_mow[i][1] == name) {
						bot.createMessage(msg.channel.id, nick[0] + " is already in MOW queue");
						found = true;
						break;
					  }
					}
					if (!found) {
					  queue_mow.push([msg.member,name]);
					  bot.createMessage(msg.channel.id, name + " was added to MOW queue, you are on position " + queue_mow.length + " asked by " + nick[0]);
					}
					found = false;
				  }
				}else {
				  if (queue_mow.length == 0) {
					bot.createMessage(msg.channel.id, active_po + " assign master of whisperers to '" + nick[0] + "'");
					queue_mow.push([msg.member,nick[0]]);
				  } else {
					found = false;
					for (var i = 0; i < queue_mow.length; i++) {
					  if (queue_mow[i][1] == nick[0] && (queue_mow[i][0].nick == nick[0] || queue_mow[i][0].user.username == nick[0])) {
						bot.createMessage(msg.channel.id, nick[0] + " is already in MOW queue");
						found = true;
						break;
					  }
					}
					if (!found) {
					  queue_mow.push([msg.member,nick[0]]);
					  bot.createMessage(msg.channel.id, nick[0] + " was added to MOW queue, you are on position " + queue_mow.length);
					}
					found = false;
				  }
				}
			  }else{
				bot.createMessage(msg.channel.id, nick[0] + " define correct title that you are asking for , for example '-need gm'");
			  }
			}else{
			  bot.createMessage(msg.channel.id, "Nobody is logged as PO at this moment");
			}
		  }
		  else if (split[0] =="-done"){
			if (split.length > 2) {
			  //-------------------------------------------------------------------------------------------------------------------------------------------------
			  name = split[2];
			  for (var i = 3 ; i < split.length ; i++){
				name = name + " " + split[i];
			  }
			  if (split[1] == "gm") {
				if (queue_gm.length > 0) {
				  if ((queue_gm[0][0].nick == nick[0] || queue_gm[0][0].user.username == nick[0]) && queue_gm[0][1] == name) {
					bot.createMessage(msg.channel.id, queue_gm[0][1] + " has been removed from GM queue ");
					queue_gm.shift();
					if (queue_gm.length > 0) {
					  if ((queue_gm[0][0].nick == queue_gm[0][1]) || (queue_gm[0][0].user.username == queue_gm[0][1]))
						bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_gm[0][1] + "'");
					  else{
						if (queue_gm[0][0].nick != null)
							bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_gm[0][1] + "'" + ", asked by " + queue_gm[0][0].nick);
						else
							bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_gm[0][1] + "'" + ", asked by " + queue_gm[0][0].user.username);
					  }
					}
				  } else {
					found = false;
					for (var i = 0; i < queue_gm.length; i++) {
					  if ((queue_gm[i][0].nick == nick[0] || queue_gm[i][0].user.username == nick[0]) && queue_gm[i][1] == name) {
						bot.createMessage(msg.channel.id, queue_gm[i][1] + " has been removed from GM queue ");
						queue_gm.splice(i, 1);
						found = true;
						break;
					  }
					}
					if (!found) {
					  bot.createMessage(msg.channel.id, nick[0] + " you are not even in GM queue ");
					}
				  }
				} else {
				  bot.createMessage(msg.channel.id, nick[0] + " you are not even in GM queue ");
				}
			  } else if (split[1] == "cb") {
				if (queue_cb.length > 0) {
				  if ((queue_cb[0][0].nick == nick[0] || queue_cb[0][0].user.username == nick[0]) && queue_cb[0][1] == name) {
					bot.createMessage(msg.channel.id, queue_cb[0][1] + " has been removed from CB queue ");
					queue_cb.shift();
					if (queue_cb.length > 0) {
					  if ((queue_cb[0][0].nick == queue_cb[0][1]) || (queue_cb[0][0].user.username == queue_cb[0][1]))
						bot.createMessage(msg.channel.id, active_po + " assign chief builder to '" + queue_cb[0][1] + "'");
					  else{
						if (queue_cb[0][0].nick != null) 
							bot.createMessage(msg.channel.id, active_po + " assign chief builder to '" + queue_cb[0][1] + "'" + ", asked by " + queue_cb[0][0].nick);
						else
							bot.createMessage(msg.channel.id, active_po + " assign chief builder to '" + queue_cb[0][1] + "'" + ", asked by " + queue_cb[0][0].user.username);
					  }
					}
				  } else {
					found = false;
					for (var i = 0; i < queue_cb.length; i++) {
					  if ((queue_cb[i][0].nick == nick[0] || queue_cb[i][0].user.username == nick[0]) && queue_cb[i][1] == name) {
						bot.createMessage(msg.channel.id, queue_cb[i][1] + " has been removed from CB queue ");
						queue_cb.splice(i, 1);
						found = true;
						break;
					  }
					}
					if (!found) {
					  bot.createMessage(msg.channel.id, nick[0] + " you are not even in CB queue ");
					}
				  }
				} else {
				  bot.createMessage(msg.channel.id, nick[0] + " you are not even in CB queue ");
				}
			  } else if (split[1] == "mow") {
				if (queue_mow.length > 0) {
				  if ((queue_mow[0][0].nick == nick[0] || queue_mow[0][0].user.username == nick[0]) && queue_mow[0][1] == name) {
					bot.createMessage(msg.channel.id, queue_mow[0][1] + " has been removed from MOW queue ");
					queue_mow.shift();
					if (queue_mow.length > 0) {
					  if ((queue_mow[0][0].nick == queue_mow[0][1]) || (queue_mow[0][0].user.username == queue_mow[0][1]))
						bot.createMessage(msg.channel.id, active_po + " assign master of whisperers to '" + queue_mow[0][1] + "'");
					  else{
						if (queue_mow[0][0].nick != null)
							bot.createMessage(msg.channel.id, active_po + " assign master of whisperers to '" + queue_mow[0][1] + "'" + ", asked by " + queue_mow[0][0].nick);
						else
							bot.createMessage(msg.channel.id, active_po + " assign master of whisperers to '" + queue_mow[0][1] + "'" + ", asked by " + queue_mow[0][0].user.username);
					  }
					}
				  } else {
					found = false;
					for (var i = 0; i < queue_mow.length; i++) {
					  if ((queue_mow[i][0].nick == nick[0] || queue_mow[i][0].user.username == nick[0]) && queue_mow[i][1] == name) {
						bot.createMessage(msg.channel.id, queue_mow[i][1] + " has been removed from MOW queue ");
						queue_mow.splice(i, 1);
						found = true;
						break;
					  }
					}
					if (!found) {
					  bot.createMessage(msg.channel.id, nick[0] + " you are not even in MOW queue ");
					}
				  }
				} else {
				  bot.createMessage(msg.channel.id, nick[0] + " you are not even in MOW queue ");
				}
			  } else {
				bot.createMessage(msg.channel.id, nick[0] + " define what title are you done with , for example '-done gm'");
			  }

			  //-------------------------------------------------------------------------------------------------------------------------------------------------
			}else{
			  if (split[1] == "gm") {
				if (queue_gm.length > 0) {
				  if (queue_gm[0][1] == nick[0]) {
					bot.createMessage(msg.channel.id, queue_gm[0][1] + " has been removed from GM queue ");
					queue_gm.shift();
					if (queue_gm.length > 0) {
					  bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_gm[0][1] + "'");
					}
				  } else {
					found = false;
					for (var i = 0; i < queue_gm.length; i++) {
					  if (queue_gm[i][1] == nick[0]) {
						bot.createMessage(msg.channel.id, queue_gm[i][1] + " has been removed from GM queue ");
						queue_gm.splice(i, 1);
						found = true;
						break;
					  }
					}
					if (!found) {
					  bot.createMessage(msg.channel.id, nick[0] + " you are not even in GM queue ");
					}
				  }
				} else {
				  bot.createMessage(msg.channel.id, nick[0] + " you are not even in GM queue ");
				}
			  } else if (split[1] == "cb") {
				if (queue_cb.length > 0) {
				  if (queue_cb[0][1] == nick[0]) {
					bot.createMessage(msg.channel.id, queue_cb[0][1] + " has been removed from CB queue ");
					queue_cb.shift();
					if (queue_cb.length > 0) {
					  bot.createMessage(msg.channel.id, active_po + " assign chief builder to '" + queue_cb[0][1] + "'");
					}
				  } else {
					found = false;
					for (var i = 0; i < queue_cb.length; i++) {
					  if (queue_cb[i][1] == nick[0]) {
						bot.createMessage(msg.channel.id, queue_cb[i][1] + " has been removed from CB queue ");
						queue_cb.splice(i, 1);
						found = true;
						break;
					  }
					}
					if (!found) {
					  bot.createMessage(msg.channel.id, nick[0] + " you are not even in CB queue ");
					}
				  }
				} else {
				  bot.createMessage(msg.channel.id, nick[0] + " you are not even in CB queue ");
				}
			  } else if (split[1] == "mow") {
				if (queue_mow.length > 0) {
				  if (queue_mow[0][1] == nick[0]) {
					bot.createMessage(msg.channel.id, queue_mow[0][1] + " has been removed from MOW queue ");
					queue_mow.shift();
					if (queue_mow.length > 0) {
					  bot.createMessage(msg.channel.id, active_po + " assign master of whisperers to '" + queue_mow[0][1] + "'");
					}
				  } else {
					found = false;
					for (var i = 0; i < queue_mow.length; i++) {
					  if (queue_mow[i][1] == nick[0]) {
						bot.createMessage(msg.channel.id, queue_mow[i][1] + " has been removed from MOW queue ");
						queue_mow.splice(i, 1);
						found = true;
						break;
					  }
					}
					if (!found) {
					  bot.createMessage(msg.channel.id, nick[0] + " you are not even in MOW queue ");
					}
				  }
				} else {
				  bot.createMessage(msg.channel.id, nick[0] + " you are not even in MOW queue ");
				}
			  } else {
				bot.createMessage(msg.channel.id, nick[0] + " define what title are you done with , for example '-done gm'");
			  }
			}
		  }
		  else if (split[0] =="-q"){
			if (split[1] == "gm") {
			  if (queue_gm.length != 0) {
				q = "Queue for GM: ```";
				for (var i = 0; i < queue_gm.length; i++) {
				  num = i+1;
				  if (i == 0) {
					q = q + num + ". --> " + queue_gm[i][1];
				  } else {
					q = q + "\n" + num + ". " + queue_gm[i][1];
				  }
				}
				q = q + "```";
				bot.createMessage(msg.channel.id, q);
			  }else{
				bot.createMessage(msg.channel.id, "Queue fo GM is empty");
			  }
			}else if (split[1] == "cb"){
			  if (queue_cb.length != 0) {
				q = "Queue for CB: ```";
				for (var i = 0; i < queue_cb.length; i++) {
				  num = i+1;
				  if (i == 0) {
					q = q + num + ". --> " + queue_cb[i][1];
				  } else {
					q = q + "\n" + num + ". " + queue_cb[i][1];
				  }
				}
				q = q + "```";
				bot.createMessage(msg.channel.id, q);
			  }else{
				bot.createMessage(msg.channel.id, "Queue for CB is empty");
			  }
			}else if (split[1] == "mow"){
			  if (queue_mow.length != 0) {
				q = "Queue for MOW: ```";
				for (var i = 0; i < queue_mow.length; i++) {
				  num = i+1;
				  if (i == 0) {
					q = q + num + ". --> " + queue_mow[i][1];
				  } else {
					q = q + "\n" + num + ". " + queue_mow[i][1];
				  }
				}
				q = q + "```";
				bot.createMessage(msg.channel.id, q);
			  }else{
				bot.createMessage(msg.channel.id, "Queue for MOW is empty");
			  }
			}else{
			  bot.createMessage(msg.channel.id, "Define queue, for example '-q gm'");
			}

		  }
		  else if (split[0] =="-deactivate"){
			if (active_po != null){
			  if(active_po_id == nick[1]){
				active_po = null;
				active_po_id = null;
				active_po_name = null;
				queue_gm = [];
				queue_cb = [];
				queue_mow = [];
				
				channel = msg.channel;
				channel.edit({name: "closed-buff-request"},"closed-buff-request");

				bot.createMessage(msg.channel.id, nick[0] + " is no longer logged as PO , please wait for next one");
				bot.createMessage(msg.channel.id, nick[0] + " you managed " + counter + " requests during your service. Thank you.");
				counter = 0;
			  }else{
				bot.createMessage(msg.channel.id, "Only active PO can use -deactivate");
			  }
			}else{
			  bot.createMessage(msg.channel.id, "Nobody is logged as PO at this moment");
			}
		  }else if(split[0] =="-next"){
			if ((msg.member.roles.includes("709564651461148675") || msg.member.roles.includes("740858481271111691")) && active_po_id == nick[1]){
			  if (split[1] == "gm") {
				if (queue_gm.length != 0) {
				  bot.createMessage(msg.channel.id, queue_gm[0][1] + " has been removed from GM queue ");
				  queue_gm.shift();
				  if (queue_gm.length > 0) {
					if ((queue_gm[0][0].nick == queue_gm[0][1]) || (queue_gm[0][0].user.username == queue_gm[0][1]))
					  bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_gm[0][1] + "'");
					else{
						if (queue_gm[0][0].nick != null)
							bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_gm[0][1] + "'" + ", asked by " + queue_gm[0][0].nick);
						else 
							bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_gm[0][1] + "'" + ", asked by " + queue_gm[0][0].user.username);
					}            
				} else {
					bot.createMessage(msg.channel.id, "GM queue is now empty");
				  }
				}else {
				  bot.createMessage(msg.channel.id, "GM queue is empty");
				}
			  } else if (split[1] == "cb") {
				if (queue_cb.length != 0) {
				  bot.createMessage(msg.channel.id, queue_cb[0][1] + " has been removed from CB queue ");
				  queue_cb.shift();
				  if (queue_cb.length > 0) {
					if ((queue_cb[0][0].nick == queue_cb[0][1]) || (queue_cb[0][0].user.username == queue_cb[0][1]))
					  bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_cb[0][1] + "'");
					else{
						if (queue_cb[0][0].nick != null)
							bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_cb[0][1] + "'" + ", asked by " + queue_cb[0][0].nick);
						else
							bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_cb[0][1] + "'" + ", asked by " + queue_cb[0][0].user.username);
					}
				  } else {
					bot.createMessage(msg.channel.id, "CB queue is now empty");
				  }
				}else{
				  bot.createMessage(msg.channel.id, "CB queue is empty");
				}
			  } else if (split[1] == "mow") {
				if (queue_mow.length != 0) {
				  bot.createMessage(msg.channel.id, queue_mow[0][1] + " has been removed from MOW queue ");
				  queue_mow.shift();
				  if (queue_mow.length > 0) {
					if ((queue_mow[0][0].nick == queue_mow[0][1]) || (queue_mow[0][0].user.username == queue_mow[0][1]))
					  bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_mow[0][1] + "'");
					else{
						if (queue_mow[0][0].nick != null)
							bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_mow[0][1] + "'" + ", asked by " + queue_mow[0][0].nick);
						else
							bot.createMessage(msg.channel.id, active_po + " assign grand maester to '" + queue_mow[0][1] + "'" + ", asked by " + queue_mow[0][0].user.username);
					}
				  } else {
					bot.createMessage(msg.channel.id, "MOW queue is now empty");
				  }
				}else {
				  bot.createMessage(msg.channel.id, "MOW queue is empty");
				}
			  }else {
				bot.createMessage(msg.channel.id, "Define queue, for example '-next gm");
			  }
			}else {
			  bot.createMessage(msg.channel.id, "Only active PO can use that command");
			}
		  }else if (split[0] =="-use"){
			  
			  if (split[1] == "gm") {
				if (queue_gm.length != 0 ) {
				  if ((queue_gm[0][0].nick == queue_gm[0][1]) || (queue_gm[0][0].user.username == queue_gm[0][1])){
					bot.createMessage(msg.channel.id, "<@" + queue_gm[0][0].id + "> you are using GM now , please use **-done gm** when you will be done");
				  }
				  else{
					bot.createMessage(msg.channel.id, queue_gm[0][1]+", is using GM now , this was asked by" +"<@" + queue_gm[0][0].id + "> , please use **-done gm " + queue_gm[0][1]+"** when you will be done");
				  }
				}else
				  bot.createMessage(msg.channel.id, "GM queue is empty");
			  } else if (split[1] == "cb") {
				if (queue_cb.length != 0 ) {
				  if ((queue_cb[0][0].nick == queue_cb[0][1]) || (queue_cb[0][0].user.username == queue_cb[0][1])){
					bot.createMessage(msg.channel.id, "<@" + queue_cb[0][0].id + "> you are using CB now , please use **-done cb** when you will be done");
				  }
				  else{
					bot.createMessage(msg.channel.id, queue_cb[0][1]+", is using CB now , this was asked by" +"<@" + queue_cb[0][0].id + "> , please use **-done cb " + queue_cb[0][1]+"** when you will be done");
				  }
				}else
				  bot.createMessage(msg.channel.id, "CB queue is empty");
			  } else if (split[1] == "mow") {
				if (queue_mow.length != 0 ) {
				  if ((queue_mow[0][0].nick == queue_mow[0][1]) || (queue_mow[0][0].user.username == queue_mow[0][1])){
					bot.createMessage(msg.channel.id, "<@" + queue_mow[0][0].id + "> you are using MOW now , please use **-done mow** when you will be done");
				  }
				  else{
					bot.createMessage(msg.channel.id, queue_mow[0][1]+", is using MOW now , this was asked by" +"<@" + queue_mow[0][0].id + "> , please use **-done mow " + queue_mow[0][1]+"** when you will be done");
				  }
				}else
				  bot.createMessage(msg.channel.id, "MOW queue is empty");
			  }else {
				bot.createMessage(msg.channel.id, "Define correct title, for example -use gm");
			  }
		  }else{
			bot.createMessage(msg.channel.id, "This is not valid command");
		  }
		}else{
			bot.createMessage(msg.channel.id, "Nobody is logged as PO at this moment");
		}
    }
});

bot.connect();