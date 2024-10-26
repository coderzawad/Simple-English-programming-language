class SimpleEnglishInterpreter {
    constructor() {
        this.variables = new Map();
        this.output = [];

        // Bind methods to ensure 'this' context is retained
        this.handleVariableCreation = this.handleVariableCreation.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleSubtraction = this.handleSubtraction.bind(this);
        this.handleMultiplication = this.handleMultiplication.bind(this);
        this.handleDivision = this.handleDivision.bind(this);
        this.handleIf = this.handleIf.bind(this);
        this.handleRepeat = this.handleRepeat.bind(this);
    }

    interpret(code) {
        this.output = [];
        const lines = code.trim().split('\n');

        for (let i = 0; i < lines.length; i++) {
            try {
                const line = lines[i].trim();
                if (line === '' || line.startsWith('#')) continue;

                if (line.startsWith('create')) {
                    this.handleVariableCreation(line);
                } else if (line.startsWith('print')) {
                    this.handlePrint(line);
                } else if (line.startsWith('add')) {
                    this.handleAddition(line);
                } else if (line.startsWith('subtract')) {
                    this.handleSubtraction(line);
                } else if (line.startsWith('multiply')) {
                    this.handleMultiplication(line);
                } else if (line.startsWith('divide')) {
                    this.handleDivision(line);
                } else if (line.startsWith('if')) {
                    const blockEnd = this.findBlockEnd(lines, i);
                    this.handleIf(line, lines.slice(i + 1, blockEnd));
                    i = blockEnd;
                } else if (line.startsWith('repeat')) {
                    const blockEnd = this.findBlockEnd(lines, i);
                    this.handleRepeat(line, lines.slice(i + 1, blockEnd));
                    i = blockEnd;
                }
            } catch (error) {
                this.output.push(`Error at line ${i + 1}: ${error.message}`);
            }
        }

        return this.output.join('\n');
    }

    findBlockEnd(lines, start) {
        let count = 1;
        for (let i = start + 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line === 'end') count--;
            if (count === 0) return i;
        }
        throw new Error('Missing end statement');
    }

    handleVariableCreation(line) {
        const match = line.match(/create (number|text) called (\w+) with value (.*)/);
        if (!match) throw new Error('Invalid variable creation syntax');

        const [, type, name, value] = match;
        if (type === 'number') {
            this.variables.set(name, Number(value));
        } else {
            this.variables.set(name, value.replace(/"/g, ''));
        }
    }

    handlePrint(line) {
        const parts = line.replace('print ', '').split(' and ');
        const output = parts.map(part => {
            const trimmed = part.trim();
            if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
                return trimmed.slice(1, -1);
            }
            return this.variables.get(trimmed);
        }).join(' ');
        this.output.push(output);
    }

    handleAddition(line) {
        const valueMatch = line.match(/add value (\w+) to (\w+)/);
        const numberMatch = line.match(/add (\d+) to (\w+)/);

        if (valueMatch) {
            const [, sourceVar, targetVar] = valueMatch;
            const sourceValue = this.variables.get(sourceVar);
            const targetValue = this.variables.get(targetVar);
            this.variables.set(targetVar, targetValue + sourceValue);
        } else if (numberMatch) {
            const [, amount, variable] = numberMatch;
            const currentValue = this.variables.get(variable);
            this.variables.set(variable, currentValue + Number(amount));
        } else {
            throw new Error('Invalid addition syntax');
        }
    }

    handleSubtraction(line) {
        const valueMatch = line.match(/subtract value (\w+) from (\w+)/);
        const numberMatch = line.match(/subtract (\d+) from (\w+)/);

        if (valueMatch) {
            const [, sourceVar, targetVar] = valueMatch;
            const sourceValue = this.variables.get(sourceVar);
            const targetValue = this.variables.get(targetVar);
            this.variables.set(targetVar, targetValue - sourceValue);
        } else if (numberMatch) {
            const [, amount, variable] = numberMatch;
            const currentValue = this.variables.get(variable);
            this.variables.set(variable, currentValue - Number(amount));
        } else {
            throw new Error('Invalid subtraction syntax');
        }
    }

    handleMultiplication(line) {
        const valueMatch = line.match(/multiply (\w+) by value (\w+)/);
        const numberMatch = line.match(/multiply (\w+) by (\d+)/);

        if (valueMatch) {
            const [, targetVar, sourceVar] = valueMatch;
            const sourceValue = this.variables.get(sourceVar);
            const targetValue = this.variables.get(targetVar);
            this.variables.set(targetVar, targetValue * sourceValue);
        } else if (numberMatch) {
            const [, variable, amount] = numberMatch;
            const currentValue = this.variables.get(variable);
            this.variables.set(variable, currentValue * Number(amount));
        } else {
            throw new Error('Invalid multiplication syntax');
        }
    }

    handleDivision(line) {
        const valueMatch = line.match(/divide (\w+) by value (\w+)/);
        const numberMatch = line.match(/divide (\w+) by (\d+)/);

        if (valueMatch) {
            const [, targetVar, sourceVar] = valueMatch;
            const sourceValue = this.variables.get(sourceVar);
            const targetValue = this.variables.get(targetVar);
            this.variables.set(targetVar, targetValue / sourceValue);
        } else if (numberMatch) {
            const [, variable, amount] = numberMatch;
            const currentValue = this.variables.get(variable);
            this.variables.set(variable, currentValue / Number(amount));
        } else {
            throw new Error('Invalid division syntax');
        }
    }

    handleIf(condition, block) {
        const match = condition.match(/if (\w+) is (greater|less) than (\d+) then/);
        if (!match) throw new Error('Invalid if condition syntax');

        const [, variable, comparison, value] = match;
        const variableValue = this.variables.get(variable);

        let conditionMet = false;
        if (comparison === 'greater') {
            conditionMet = variableValue > Number(value);
        } else {
            conditionMet = variableValue < Number(value);
        }

        if (conditionMet) {
            block.forEach(line => {
                if (line.trim() !== '') {
                    const interpreter = new SimpleEnglishInterpreter();
                    interpreter.variables = new Map(this.variables);
                    const result = interpreter.interpret(line);
                    this.output.push(result);
                    this.variables = interpreter.variables;
                }
            });
        }
    }

    handleRepeat(line, block) {
        const match = line.match(/repeat (\d+) times/);
        if (!match) throw new Error('Invalid repeat syntax');

        const [, count] = match;
        for (let i = 0; i < Number(count); i++) {
            block.forEach(line => {
                if (line.trim() !== '') {
                    const interpreter = new SimpleEnglishInterpreter();
                    interpreter.variables = new Map(this.variables);
                    const result = interpreter.interpret(line);
                    this.output.push(result);
                    this.variables = interpreter.variables;
                }
            });
        }
    }
}

