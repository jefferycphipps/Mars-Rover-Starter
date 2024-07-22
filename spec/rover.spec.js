const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  
  test("Constructor sets err if no postition pass, mode, and generatorWatts  type.", function() {
      expect( function() { new Rover();}).toThrow(new Error('Position required.'));
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message = new Message('Test message with two commands', commands);
      let rover = new Rover(98382);    // Passes 98382 as the rover's position.
      expect(rover.mode).toBe('NORMAL');


      let response = rover.receiveMessage(message);
      
      expect(rover.generatorWatts).toBe(110);
      expect(response.message).toBe('Test message with two commands');
      expect(response.results).toStrictEqual([
        { completed: true },
        {
          completed: true,
          roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
        }
      ]);
      commands = [new Command('MOVE', 11), new Command('STATUS_CHECK')];
      message = new Message('Test message with two commands', commands);
      response = rover.receiveMessage(message);
      expect(response.results).toStrictEqual([
        { completed: false },
        {
          completed: true,
          roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
        }
      ]);

      commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];
      message = new Message('Test message with two commands', commands);
      response = rover.receiveMessage(message);
      expect(response.results).toStrictEqual([
        { completed: true },
        {
          completed: true,
          roverStatus: { mode: 'NORMAL', generatorWatts: 110, position: 98382 }
        }
      ]);

      commands = [new Command('MOVE', 2321), new Command('STATUS_CHECK')];
      message = new Message('Test message with two commands', commands);
      response = rover.receiveMessage(message);
      expect(response.results).toStrictEqual([
        { completed: true },
        {
          completed: true,
          roverStatus: { mode: 'NORMAL', generatorWatts: 110, position: 2321 }
        }
      ]);
  });
 

});
