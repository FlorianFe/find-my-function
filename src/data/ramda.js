
const ANY = Symbol();
const BOOLEAN = Symbol();
const NUMBER = Symbol();
const STRING = Symbol();

const array = (type) => () => ({ type: type });
const func = (params, returnValue) => ({ params, returnValue });

const data = [
    {
        "name": "add",
        "parameters": [NUMBER, NUMBER],
        "returns": NUMBER,
        "description": "Adds two numbers together.",
        "type": "math"
    },
    {
        "name": "subtract",
        "parameters": [NUMBER, NUMBER],
        "returns": NUMBER,
        "description": "Subtracts two numbers.",
        "type": "math"
    },
    {
        "name": "multiply",
        "parameters": [NUMBER, NUMBER],
        "returns": NUMBER,
        "description": "Multiplies two numbers.",
        "type": "math"
    },
    {
        "name": "divide",
        "parameters": [NUMBER, NUMBER],
        "returns": NUMBER,
        "description": "Divides two numbers.",
        "type": "math"
    },
    {
        "name": "modulo",
        "parameters": [NUMBER, NUMBER],
        "returns": NUMBER,
        "description": "Returns the remainder of two numbers.",
        "type": "math"
    },
    {
        "name": "addIndex",
        "parameters": [func([ANY, NUMBER], ANY), array(ANY)],
        "returns": array(ANY),
        "description": "Adds an index to each element in an array.",
        "type": "Function"
    },
    {
        "name": "adjust",
        "parameters": [NUMBER, func([ANY], ANY), array(ANY)],
        "returns": array(ANY),
        "description": "Applies a function to the value at the given index of an array, returning a new copy of the array with the element at the given index replaced with the result of the function application.",
        "type": "List"
    },
    {
        "name": "all",
        "parameters": [func([ANY], BOOLEAN), array(ANY)], /* TODO */
        "returns": BOOLEAN,
        "description": "Returns true if all elements of the list match the predicate, false if there are any that don't.",
        "type": "List"
    },
    {
        "name": "allPass",
        "parameters": [array(func([ANY], BOOLEAN)), array(ANY)], /* TODO */
        "returns": BOOLEAN,
        "description": "Returns true if all elements of the list match the predicate, false if there are any that don't.",
        "type": "List"
    },
    {
        "name": "always",
        "parameters": [ANY],
        "returns": func([], ANY),
        "description": "Returns a function that always returns the given value.",
        "type": "Function"
    },
    {
        "name": "and",
        "parameters": [BOOLEAN, BOOLEAN],
        "returns": BOOLEAN,
        "description": "Returns true if both arguments are true.",
        "type": "Logic"
    },
    {
        "name": "andThen",
        "parameters": [func([ANY], ANY), func([ANY], ANY)], // TODO
        "returns": ANY,
        "description": "Returns the first argument if it's true, otherwise the result of applying the second argument to the first.",
        "type": "Function"
    },
    {
        "name": "any",
        "parameters": [func([ANY], BOOLEAN), array(ANY)], // TODO
        "returns": BOOLEAN,
        "description": "Returns true if any element of the list matches the predicate, false if there are no matches.",
        "type": "List"
    },
    {
        "name": "anyPass",
        "parameters": [array(func([ANY], BOOLEAN)), array(ANY)], // TODO
        "returns": BOOLEAN,
        "description": "Returns true if any element of the list matches the predicate, false if there are no matches.",
        "type": "Logic",
    },
    {
        "name": "ap",
        "parameters": [array(func([ANY], ANY)), array(ANY)], // TODO
        "returns": array(ANY),
        "description": "Returns a new list, composed of n-tuples of consecutive elements If n is greater than the length of the list, an empty list is returned.",
        "type": "Function"
    },
    {
        "name": "aperture",
        "parameters": [NUMBER, array(ANY)], // TODO
        "returns": array(array(ANY)),
        "description": "Returns the n-tuples of consecutive elements of the given list. If n is greater than the length of the list, an empty list is returned.",
        "type": "List"
    },
    {
        "name": "append",
        "parameters": [ANY, array(ANY)],
        "returns": array(ANY),
        "description": "Returns a new list with the given element added to the end.",
        "type": "List"
    },
    {
        "name": "apply",
        "parameters": [func([ANY], ANY), array(ANY)],
        "returns": ANY,
        "description": "Applies a function to an argument list and returns the result.",
        "type": "Function"
    },
    {
        "name": "applySpec",
        "parameters": [array(func([ANY], ANY))], // TODO
        "returns": func([ANY], ANY), // TODO
        "description": "Applies a function to an argument list and returns the result.",
        "type": "Function"
    },
    {
        "name": "applyTo",
        "parameters": [func([ANY], ANY), ANY],
        "returns": ANY,
        "description": "Takes a value and applies a function to it. This function is also known as the thrush combinator.",
        "type": "Function"
    },
        








]