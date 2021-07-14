import { Record, Tuple } from "@bloomberg/record-tuple-polyfill";

// GOAL: Use higher-order functions to make the all output display true
//
// SEE: https://en.wikipedia.org/wiki/Higher-order_function

// A higher-order functions is a function that can do at least one of the following:
//
// - Accepts one or more functions as arguments (i.e. The focus of this exercise)
// - Returns a function as its result


// DO: Define a `forEach` higher-order function that:
//
//  1. Accepts a tuple of `elements` and a `callback` function as arguments
//  2. Calls the `callback` function once on each `element` of the tuple
//  3. Returns nothing
//
// SEE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

// TYPE: Tuple<string>
let warrants = #[]

// TYPE: (warrant: string) => void
const issueWarrant = (warrant) => {
    warrants = warrants.pushed(warrant)
}

// TYPE: type PC = { name: string; ancestry: string }
// TYPE: Tuple<PC>
const pcs = #[
    #{ name: 'Bilbo', ancestry: 'Halfling' },
    #{ name: 'Ezren', ancestry: 'Human' },
    #{ name: 'Fisti', ancestry: 'Gnome' },
    #{ name: 'Harsk', ancestry: 'Dwarf' },
]

// TYPE: (pc: PC) => void
const introduce = (pc) => issueWarrant(`${pc.name} the ${pc.ancestry}`)

// TYPE: <T>(
//     elements: Tuple<T>,
//     callback: (element: T) => void,
// ) => void
const forEach = undefined

forEach(pcs, introduce)

console.log("forEach",
    warrants === #[
        'Bilbo the Halfling',
        'Ezren the Human',
        'Fisti the Gnome',
        'Harsk the Dwarf',
    ],
)

// DO: Define a `map` higher-order function that:
//
//  1. Accepts a tuple of `elements` and a `callback` function as arguments
//  2. Creates a new tuple of results from calling the `callback` function once on each
//     `element` of the tuple
//  3. Returns that new tuple of `mapped` elements as a `result`
//
// SEE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

// TYPE: type Leveled = { level: number }
// TYPE: type LeveledPC = PC & Leveled

// TYPE: (pc: PC) => LeveledPC
let gainLevel = (pc) => #{ ...pc, level: 1 }

// TYPE: <T, U>(
//     elements: Tuple<T>,
//     callback: (element: T) => U
// ) => Tuple<U>
const map = undefined

// TYPE: LeveledPC
const pcsLevel1 = map(pcs, gainLevel)

console.log("map (level 1)",
    pcsLevel1 === #[
        #{ name: 'Bilbo', ancestry: 'Halfling', level: 1 },
        #{ name: 'Ezren', ancestry: 'Human', level: 1 },
        #{ name: 'Fisti', ancestry: 'Gnome', level: 1 },
        #{ name: 'Harsk', ancestry: 'Dwarf', level: 1 },
    ],
)

// TYPE: (pc: PC | LeveledPC) => LeveledPC
gainLevel = (pc) => #{ ...pc, level: pc.level ? pc.level + 1 : 1 }

// TYPE: LeveledPC
const pcsLevel2 = map(pcsLevel1, gainLevel)

console.log("map (level 2)",
    pcsLevel2 === #[
        #{ name: 'Bilbo', ancestry: 'Halfling', level: 2 },
        #{ name: 'Ezren', ancestry: 'Human', level: 2 },
        #{ name: 'Fisti', ancestry: 'Gnome', level: 2 },
        #{ name: 'Harsk', ancestry: 'Dwarf', level: 2 },
    ],
)

// DO: Define a `reduce` higher-order function that:
//
//  1. Accepts a tuple of `elements`, a `callback` function, and an `initial` value as
//     arguments
//  2. Accumulates the `initial` value with the results from calling the `callback`
//     function once on each `element` of the tuple
//  3. Returns the single, accumulated value as a `result`
//
// SEE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

// TYPE: (accumulation: number, pc: LeveledPC) => number
const accumulateLevel = (accumulation, pc) => accumulation + pc.level

// TYPE: <T, U>(
//     elements: Tuple<T>,
//     callback: (accumulation: U, element: T) => U,
//     initial: U,
// ) => U
const reduce = undefined

// TYPE: number
const levelsTotal = reduce(pcsLevel2, accumulateLevel, 0)

// TYPE: number
const pcsTotal = pcsLevel2.length

// TYPE: number
const levelsAverage = levelsTotal / pcsTotal

console.log("reduce",
    levelsAverage === 2,
)

// DO: Define a `flatMap` higher-order function that:
//
//  1. Accepts a tuple of `elements` and a `callback` function as arguments
//  2. Creates a new tuple by concatenating the results from calling the `callback`
//     function once on each `element` of the tuple
//  3. Returns that new tuple of `mapped`, then "flattened" elements as a `result`
//
// SEE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap

// TYPE: type Skilled = { skills: Tuple<string> }
// TYPE: type SkilledPC = PC & Skilled
// TYPE: Tuple<SkilledPC>
const pcsSkilled = #[
    #{ name: 'Bilbo', ancestry: 'Halfling', skills: #['Acrobatics', 'Stealth'] },
    #{ name: 'Ezren', ancestry: 'Human', skills: #['Arcana', 'Society'] },
    #{ name: 'Fisti', ancestry: 'Gnome', skills: #['Crafting', 'Stealth'] },
    #{ name: 'Harsk', ancestry: 'Dwarf', skills: #['Nature', 'Survival'] },
]

// TYPE: (pc: SkilledPC) => Tuple<string>
const getSkills = (pc) => pc.skills

// TYPE: <T, U>(
//     elements: Tuple<T>,
//     callback: (element: T) => Tuple<U>,
// ) => Tuple<U>
const flatMap = undefined

// TYPE: Tuple<string>
const skillsAll = flatMap(pcsSkilled, getSkills)

console.log("flatMap",
    skillsAll === #[
        'Acrobatics',
        'Stealth',
        'Arcana',
        'Society',
        'Crafting',
        'Stealth',
        'Nature',
        'Survival',
    ],
)

// In functional programming languages, many built-in data types are monoids. In this 
// exercise, you've worked with a few monoids.
//
// In programming, a monoid is a data type that:
//
//  1. Has an binary "combine" operation that is associative
//  2. Has an identity value that can be combined with other values of the same type
//
// SEE: https://en.wikipedia.org/wiki/Monoid
