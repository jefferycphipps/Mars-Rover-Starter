const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position){
      this.position = position;
     if (!position) {
       throw Error('Position required.');
     }
     
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }

   receiveMessage(message){
      let resultsReturn = [];
      for (let x = 0; x<message.commands.length; x++){
         let resultTemp = this.command(message.commands[x]);
         resultsReturn.push(resultTemp);
      }
      return {message: message.name,
         results: resultsReturn,
      };
   }

   command(commander){
      let result = {};
      if(commander.commandType==='MOVE'){
         if (this.mode === 'LOW_POWER'){
            
            result = {completed: false};
         }
         if(this.mode === 'NORMAL'){
            this.position = commander.value;
           result = {completed: true}; 
         }
         
      }
      if(commander.commandType==='STATUS_CHECK'){
         result = {completed: true,
            roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
         };
      }
      if(commander.commandType==='MODE_CHANGE'){
         this.mode = commander.value;
         result = {completed: true};
      }
      return result;
   }
}

module.exports = Rover;

