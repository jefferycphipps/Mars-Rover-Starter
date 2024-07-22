const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    it("throws error if name is NOT passed into constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Name required.'));
      });
    
    
    test("Constructor sets name type.", function() {
        let test = new Message('tester');
        expect(test.name).toBe('tester');
     });
    
     test("contains a commands array passed into the constructor as the 2nd argument", function() {
        let commandsTest = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let test = new Message('Test message with two commands', commandsTest);
      expect(test.commands).toBe(commandsTest);
    });



});
