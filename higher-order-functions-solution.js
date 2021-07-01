import { Record, Tuple } from "@bloomberg/record-tuple-polyfill";

// GOAL: Use higher-order functions to make the all output display true
//
// SEE: https://en.wikipedia.org/wiki/Higher-order_function

// TYPE: Tuple<string>
let warnings = #[]

// TYPE: (warning: string) => void
const warn = (warning) => {
    warnings = warnings.pushed(warning)
}

// TYPE: type PC = { name: string; ancestry: string }
// TYPE: Tuple<PC>
const pcs = #[
    #{ name: 'Bilbo', ancestry: 'Halfling'},
    #{ name: 'Ezren', ancestry: 'Human'},
    #{ name: 'Fisti', ancestry: 'Gnome'},
    #{ name: 'Harsk', ancestry: 'Dwarf'},
]

// TYPE: (PC) => void
const announce = (pc) => warn(`${pc.name} the ${pc.ancestry}`)

// TYPE: <T>(elements: Tuple<T>, callback: (T) => void) => void
const forEach = (elements, callback) => {
    for (const element of elements) {
        callback(element)
    }
}

forEach(pcs, announce)

console.log("forEach",
    warnings === #[
      'Bilbo the Halfling',
      'Ezren the Human',
      'Fisti the Gnome',
      'Harsk the Dwarf',
    ],
)

// TYPE: type LeveledPC = { name: string; ancestry: string; level: number }

// TYPE: (PC) => LeveledPC
const gainLevel = (pc) => #{...pc, level: pc.level ? pc.level + 1 : 1}

// TYPE: <T, U>(elements: Tuple<T>, callback: (element: T) => U) => Tuple<U>
const map = (elements, callback) => {
    let result = #[]

    for (const element of elements) {
        const transformed = callback(element)
        result = result.pushed(transformed)
    }

    return result
}

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

// TYPE: (accumulation: number, pc: LeveledPC) => number
const accumulateLevel = (accumulation, pc) => accumulation + pc.level

// TYPE: <T, U>(
//     elements: Tuple<T>,
//     callback: (accumulation: U, element: T) => U,
//     initial: U,
// ) => U
const reduce = (elements, callback, initial) => {
    let result = initial

    for (const element of elements) {
        result = callback(result, element)
    }

    return result
}

// TYPE: number
const levelsTotal = reduce(pcsLevel2, accumulateLevel, 0)

// TYPE: number
const pcsTotal = pcsLevel2.length

// TYPE: number
const levelsAverage = levelsTotal / pcsTotal

console.log("reduce",
    levelsAverage === 2,
)

// TYPE: type SkilledPC = { name: string; ancestry: string; skills: Tuple<string> }
// TYPE: Tuple<SkilledPC>
const pcsSkilled = #[
    #{ name: 'Bilbo', ancestry: 'Halfling', skills: #['Acrobatics', 'Stealth']},
    #{ name: 'Ezren', ancestry: 'Human', skills: #['Arcana', 'Society']},
    #{ name: 'Fisti', ancestry: 'Gnome', skills: #['Crafting', 'Stealth']},
    #{ name: 'Harsk', ancestry: 'Dwarf', skills: #['Nature', 'Survival']},
]

// TYPE: (pc: SkilledPC) => Tuple<string>
const getSkills = (pc) => pc.skills

// TYPE: <T, U>(elements: Tuple<T>, callback: (element: T) => Tuple<U>) => Tuple<U>
const flatMap = (elements, callback) => {
    let result = #[]

    for (const element of elements) {
        result = result.concat(callback(element))
    }

    return result
}

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
