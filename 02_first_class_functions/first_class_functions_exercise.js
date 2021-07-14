import { Record, Tuple } from "@bloomberg/record-tuple-polyfill";

// GOAL: Use first-class functions to make the all output display true
//
// SEE: https://en.wikipedia.org/wiki/First-class_function

// A programming language fully supports first-class functions if it can:
//
// 1. Define an anonymous function
// 2. Assign a function to constant or variable
// 3. Store a function in a data structure
// 4. Pass a function to another function as an argument
// 5. Return a function from another function as a result


// 1. Define an anonymous function
//
// DO: Observe the two ways to define an anonymous function in JavaScript
//
// SEE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function

console.log("Define an anonymous function expression",
    typeof function() {} === "function",
    (function() {}).name === "",
)

// SEE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

console.log("Define an anonymous arrow function expression",
    typeof (() => {}) === "function",
    (() => {}).name === "",
)

// 2. Assign a function to constant or variable
//
// DO: Rewrite the following function declaration as an arrow function expression
//
// function add(a, b) {
//     return a + b
// }

// TYPE: (a: number, b: number) => number
const add = undefined

console.log("Assign a function to a constant",
    typeof add === "function",
    add.name === "add",
    add(1, 2) === 3,
)

// 3. Store a function in a data structure
//
// DO: Store the previously defined `add` function in an array and assign it to the `functions` constant

// TYPE: Array<(a: number, b: number) => number>
const binaryFunctions = undefined

console.log("Store a function in an array",
    binaryFunctions.length === 1,
    binaryFunctions[0] === add,
)

// 4. Pass a function to another function as an argument
//
// DO: Define a `filter` function that:
//
//  1. Accepts a tuple of `elements` and a `callback` function as arguments
//  2. Creates new tuple with each `element` that passes a test implemented by the callback function
//  3. Returns that new tuple of filtered elements as a `result`
//
// SEE: https://github.com/tc39/proposal-record-tuple/blob/master/NS-Proto-Appendix.md#tupleprototypepushedvalues

// TYPE: type PC = { name: string; ancestry: string }
// TYPE: Tuple<PC>
const pcs = #[
    #{name: 'Bilbo', ancestry: 'Halfling'},
    #{name: 'Ezren', ancestry: 'Human'},
    #{name: 'Fisti', ancestry: 'Gnome'},
    #{name: 'Harsk', ancestry: 'Dwarf'},
]

// TYPE: (PC) => boolean
const isGnome = (pc) => pc.ancestry === 'Gnome'

// TYPE: (elements: Tuple<PC>, callback: (PC) => boolean) => Tuple<PC>
const filter = undefined

// TYPE: Tuple<PC>
const gnomes = filter(pcs, isGnome)

console.log("Pass a function as a argument",
    gnomes === #[#{name: 'Fisti', ancestry: 'Gnome'}]
)

// 5. Return a function from another function as a result
//
// DO: Define a `createAncestryGenerator` function that:
//
//  1. Accepts an `ancestry` string as an agrument
//  2. Creates new function that accepts a `name` string and returns a record with that name and ancestry
//  3. Returns that new function as a result

// TYPE: (ancestry: string) => (name: string) => PC
const createAncestryGenerator = undefined

// TYPE: (name: string) => PC
const generateGnome = createAncestryGenerator('Gnome')

// TYPE: PC
const fisti = generateGnome('Fisti')

console.log("Return a function as a result",
    fisti === #{name: 'Fisti', ancestry: 'Gnome'}
)

// Programming languages that support first-class functions enable two coding techniques:
//
//  1. Higher-order functions
//  2. Closures (also requires lexical scoping)
//
// SEE: https://en.wikipedia.org/wiki/Higher-order_function
// SEE: https://en.wikipedia.org/wiki/Closure_(computer_programming)
