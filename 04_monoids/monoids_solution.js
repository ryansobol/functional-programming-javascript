import { Record, Tuple } from '@bloomberg/record-tuple-polyfill';

// GOAL: Use monoids to make the all output display true
//
// SEE: https://en.wikipedia.org/wiki/Monoid

// In programming languages, a monoid is a data type that:
//
//  1. Has a binary "combine" operation that is associative
//  2. Has an identity value, which can be combined with other values of the same type


// The number type in JavaScript is a monoid
//
// SEE: The binary combine operation for number

let a = 10
let b = 6

console.log('number: binary combine',
    a + b === 16,
)

// SEE: The associativity of number's binary combine operation

let c = 1

console.log('number: associativity of binary combine',
    (a + b) + c === 17,
    a + (b + c) === 17,
)

// SEE: The identity value for number, which can be combined with other numbers

let identity = 0

console.log('number: identity value, which can be combined',
    a + identity === a,
)

// The string type in JavaScript is also a monoid
//
// SEE: The binary combine operations for string

a = 'fire'
b = 'ball'

console.log('string: binary combine',
    a + b === 'fireball',

    `${a}${b}` === 'fireball',
)

// SEE: The associativity of string's binary combine operations

c = 's'

console.log('string: associativity of binary combine',
    (a + b) + c === 'fireballs',
    a + (b + c) === 'fireballs',

    `${`${a}${b}`}${c}` === 'fireballs',
    `${a}${`${b}${c}`}` === 'fireballs',
)

// SEE: The identity value for string, which can be combined with other strings

identity = ''

console.log('number: identity value, which can be combined',
    a + identity === a,

    `${a}${identity}` === a,
)

// The tuple type in JavaScript is also a monoid
//
// DO: Determine the expected result of tuple's binary combine operations

a = #[12, 18]
b = #[12, 10]

console.log('tuple: binary combine',
    a.concat(b) === #[12, 18, 12, 10],

    #[...a, ...b] === #[12, 18, 12, 10],
)

// DO: Determine the expected result of the associativity of tuple's binary combine
// operations

c = #[12, 14]

console.log('tuple: associativity of binary combine',
    (a.concat(b)).concat(c) === #[12, 18, 12, 10, 12, 14],
    a.concat(b.concat(c)) === #[12, 18, 12, 10, 12, 14],

    #[...#[...a, ...b], ...c] === #[12, 18, 12, 10, 12, 14],
    #[...a, ...#[...b, ...c]] === #[12, 18, 12, 10, 12, 14],
)

// DO: Determine the identity value for tuple, which can be combined with other tuples

identity = #[]

console.log('tuple: identity value, which can be combined',
    a.concat(identity) === a,

    #[...a, ...identity] === a,
)

// The record type in JavaScript is also a monoid, even though key-value pairs can be
// overwritten
//
// DO: Determine the expected result of record's binary combine operations

a = #{ name: 'Punchi' }
b = #{ ancestry: 'Gnome' }

console.log('record: binary combine',
    #{ ...a, ...b } === #{ name: 'Punchi', ancestry: 'Gnome' }
)

const z = #{ name: 'Ezren' }

console.log('record: binary combine (overwrite)',
    #{ ...a, ...z } === #{ name: 'Ezren' }
)

// DO: Determine the expected result of the associativity of record's binary combine
// operation

c = #{ background: 'Sailor' }

console.log('record: associativity of binary combine',
    #{ ...#{...a, ...b}, ...c } === #{
        name: 'Punchi',
        ancestry: 'Gnome',
        background: 'Sailor'
    },

    #{ ...a, ...#{ ...b, ...c }} === #{
        name: 'Punchi',
        ancestry: 'Gnome',
        background: 'Sailor'
    },
)

const y = #{ background: 'Street Urchin' }

console.log('record: associativity of binary combine (overwrite)',
    #{ ...#{ ...a, ...c}, ...y } === #{
        name: 'Punchi',
        background: 'Street Urchin'
    },

    #{ ...a, ...#{ ...c, ...y }} === #{
        name: 'Punchi',
        background: 'Street Urchin'
    },
)

identity = #{}

// DO: Determine the identity value for record, which can be combined with other tuples

console.log('record: identity value, which can be combined',
    #{ ...a, ...identity } === a,
)

console.log('record: identity value, which can be combined (overwrite)',
    #{ ...a, ...z, ...identity } === z,
)

// Benefits of monoids:
//
// #1 Monoids can be reduced to a single value
// #2 This reduction can be incrementally accumulated
// #3 This reduction can be parallelized
// #4 The reduction works even when data is empty (i.e. missing)
