// GOAL: Use the new record and tuple constructs to make the all output display true

import { Record, Tuple } from '@bloomberg/record-tuple-polyfill';

// DO: Construct a record
// HRM: I can think of three unique approaches
let phisti = { ancestry: 'Gnome', background: 'Sailor', 'class': 'Monk' }

// DO: Construct a tuple
// HRM: I can think of three unique approaches
let scores = [12, 18, 12, 10, 12, 14]

console.log('constructing',
    phisti === #{ ancestry: 'Gnome', background: 'Sailor', 'class': 'Monk' },
    scores === #[12, 18, 12, 10, 12, 14],
)

console.log('type checking',
    //typeof phisti === 'record',   // not implemented correctly in polyfill
    //typeof scores === 'tuple',    // not implemented correctly in polyfill
    Record.isRecord(phisti),
    Tuple.isTuple(scores),
)

// DO: Reference the ancestry value in the record
// HRM: I can think of three unique approaches
const ancestry = ''

// DO: Reference the last value in the tuple
// HRM: I can think of three unique approaches
const charisma = 0

console.log('referencing',
    ancestry === 'Gnome',
    charisma === 14,
)

// DO: Use a record to build a slightly different one
// HRM: I can think of three unique approaches
phisti = #{}

// DO: Use a tuple to build a slightly different one
// HRM: I can think of four unique approaches
scores = #[]

console.log('building',
    phisti === #{ ancestry: 'Gnome', background: 'Gambler', 'class': 'Monk' },
    scores === #[10, 18, 12, 10, 12, 16],
)

// DO: Nest a tuple inside a record
// HRM: I can think of two unique approaches
const pc = #{}

console.log('nesting',
    pc === #{
        ancestry: 'Gnome',
        background: 'Gambler',
        'class': 'Monk',
        scores: #[10, 18, 12, 10, 12, 16],
    },
)

console.log("ordering",
    pc === #{
        scores: #[10, 18, 12, 10, 12, 16],
        'class': 'Monk',
        background: 'Gambler',
        ancestry: 'Gnome',
    },
)
