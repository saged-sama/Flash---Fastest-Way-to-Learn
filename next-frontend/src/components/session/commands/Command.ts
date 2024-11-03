// Command.ts
export interface Command {
    execute(): Promise<void>;
  }
  






















  
  

  /*

theory : 
The design pattern you are using here is the Command Pattern.

In this setup:

The Command interface defines a standard execute method that encapsulates actions.
AcceptSessionCommand and DeclineSessionCommand are concrete command classes that implement the Command interface. Each class performs a specific action (accepting or declining a session) by executing its execute method.
This approach allows you to separate the invocation of actions (like accepting or rejecting a session) from the implementation of those actions, making the code modular, reusable, and more maintainable.
Why the Command Pattern?
The Command Pattern is suitable here because:

It encapsulates each request (accept or decline session) as an object, allowing you to parameterize methods with different requests.
It makes it easy to add new commands in the future, such as "RescheduleSessionCommand," without modifying existing code.
It provides better structure for handling asynchronous actions and commands with complex business logic in the frontend.
This pattern is especially useful for implementing features that may require undo/redo, queuing, or logging of commands.


  */