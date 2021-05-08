// GOAL: Use the new record and tuple constructs to make the all output display true
// SEE: https://2ality.com/2020/05/records-tuples-first-look.html

import { Record, Tuple } from '@bloomberg/record-tuple-polyfill';

// DO: Construct a record
// HRM: I can think of three unique approaches
let punchi = #{ ancestry: 'Gnome', background: 'Sailor', 'class': 'Monk' }
// const punchi = Record({ ancestry: 'Gnome', background: 'Sailor', 'class': 'Monk' })
// const punchi = #{ ...{ ancestry: 'Gnome', background: 'Sailor', 'class': 'Monk' }}

// DO: Construct a tuple
// HRM: I can think of three unique approaches
let scores = #[12, 18, 12, 10, 12, 14]
// const scores = Tuple.from([12, 18, 12, 10, 12, 14])
// const scores = #[ ...[12, 18, 12, 10, 12, 14]]

console.log('constructing',
    punchi === #{ ancestry: 'Gnome', background: 'Sailor', 'class': 'Monk' },
    scores === #[12, 18, 12, 10, 12, 14],
)

console.log('type checking',
    //typeof punchi === 'record',   // not implemented correctly in polyfill
    //typeof scores === 'tuple',    // not implemented correctly in polyfill
    Record.isRecord(punchi),
    Tuple.isTuple(scores),
)

// DO: Reference the ancestry value in the record
// HRM: I can think of three unique approaches
const ancestry = punchi.ancestry
// const ancestry = punchi['ancestry']
// const { ancestry } = punchi

// DO: Reference the last value in the tuple
// HRM: I can think of three unique approaches
const charisma = scores[5]
// const charisma = scores.slice(-1)[0]
// const [,,,,,charisma] = scores

console.log('referencing',
    ancestry === 'Gnome',
    charisma === 14,
)

// DO: Use a record to build a slightly different one
// HRM: I can think of three unique approaches
punchi = #{ ...punchi, background: 'Gambler' }
// punchi = Record(Object.assign({}, punchi, { background: 'Gambler'}))
// punchi = Record.fromEntries(Object.entries(punchi).map((entry) => entry[0] === 'background' ? ['background', 'Gambler'] : entry))

// DO: Use a tuple to build a slightly different one
// HRM: I can think of four unique approaches
scores = #[10, ...scores.slice(1, 5), 16]
// scores = scores.with(0, 10).with(5, 16)
// scores = scores.spliced(0, 1, 10).spliced(5, 1, 16)
// scores = scores.slice(1, 5).unshifted(10).pushed(16)

console.log('building',
    punchi === #{ ancestry: 'Gnome', background: 'Gambler', 'class': 'Monk' },
    scores === #[10, 18, 12, 10, 12, 16],
)

// DO: Nest a tuple inside a record
// HRM: I can think of two unique approaches
const pc = #{ ...punchi, scores }
// const pc = Record({ ...punchi, scores})

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
