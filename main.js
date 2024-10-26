function runCode() {
    const code = document.getElementById('code').value;
    const interpreter = new SimpleEnglishInterpreter();
    const output = interpreter.interpret(code);
    document.getElementById('output').textContent = output;
}
