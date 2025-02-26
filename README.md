# Part 1 Coding Exam for First Circle

## Tech Stack
<li>NodeJS</li>
<li>CLI</li>

## Resources
- https://opentdb.com/api.php?amount={} wherein the `amount` represents the frequency of calling the API from this URL link.
- Mac OS Mojave, 10.14.6

## Setup 
1. Install NodeJS version 20.18.3
2. Install dependencies by executing in the root directory, `npm install`
3. Initiate the Command Line Interface on your operating system
4. Execute the utility application through the syntax, `node app.js n={} f={}` wherein `n` represents the amount of times the API will be called and `f` represents
the format of the output
- `n` must be a positive integer, while `f` must either be `csv`, `json`, or `console`.
5. After the successful output, the system will prompt the user if he/she wants to continue producing outputs. The user can input either `Yes` or `No`.
- If the user inputs `Yes`, the utility application will ask you to input the same parameters as before in the form of `n={} f={}`. The system will continue the process of querying random questions given the parameters set by the user.
- If the user inputs `No`, the utility application will stop the whole process of querying random questions and providing prompts. The utility application will standby. At this point, the user could execute the command `Ctrl + c` to exit the application.  
