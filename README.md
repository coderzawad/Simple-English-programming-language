# SimpleEnglishInterpreter

The **SimpleEnglishInterpreter** is a JavaScript-based interpreter for a simple programming language designed to execute commands written in plain English. The interpreter can handle variable creation, arithmetic operations, conditional statements, and loops.

## Features
- **Variable Creation:** Supports creating both numbers and text values.
- **Arithmetic Operations:** Add, subtract, multiply, and divide numbers.
- **Conditional Statements:** `if` statements for comparison.
- **Loops:** `repeat` loops to run code multiple times.
- **Printing:** Display text and variables with `print`.

## Usage

To use the interpreter, call the `interpret` method with a multi-line string containing the commands.

### Example Code

```plaintext
create number called age with value 13
create text called name with value "Zawad"

print "Welcome" and name

if age is greater than 18 then
    print "You are an adult"
end

if age is less than 18 then
    print "You are a minor"
end

add 5 to age
print "New Age:" and age

repeat 3 times
    print "Hello!"
end
```

# Example output 

```plaintext
Welcome Zawad
You are a minor
New Age: 18
Hello!
Hello!
Hello!
```
# Installation 

You can integrate the interpreter into your JavaScript project by including the ```SimpleEnglishInterpreter``` class.

```plaintext
const interpreter = new SimpleEnglishInterpreter();
const code = `...`; // Add your code here
console.log(interpreter.interpret(code));
```

# Command reference

This interpreter supports various commands, allowing you to perform operations, control flow, and output text. Below are all available commands with examples.

- **Create a Number:**   
  `create number called <variable_name> with value <number>`
  ```plaintext
  create number called age with value 13
  create text called name with value "Zawad"
- **Print values**
  Display text and vairables with values using `print`
  ```plaintext
    print "Hello, world!"
    print "Welcome" and name
  ```
- **Addition**
  Add values to variable
  ```plaintext
    add value secondNumber to firstNumber
    add 5 to age
  ```

- **Subtraction**
  Subtract values from a variable:
  ```plaintext
  subtract 2 from firstNumber
  ```
- **Multiplication**
  Multiply a variable by a number or another variable:
  ```
  multiply firstNumber by 2
  ```
- **Division**
  Divide a variable by a number or another variable:
  ```
  divide firstNumber by 3
  ```
- **If Conditionals**
  Use `if` statements to check conditions:
  ```
  if age is greater than 18 then
    print "You are an adult"
  end
  ```
- **Repeat Loops**
 Run a code block multiple times with `repeat`:
 ```
  repeat 3 times
    print "Repeating..."
  end
 ```

# Error Handling
The interpreter includes error handling to help identify issues in the code, displaying line numbers and error messages for syntax errors, undefined variables, and missing `end` statements.
