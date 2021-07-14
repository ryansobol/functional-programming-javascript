// Tuple type is a monoid
//
// Has a combine operation
let a = #[1, 2]
let b = #[3, 4]

console.log("tuple: has combine",
    a.concat(b) === #[1, 2, 3, 4],

    #[...a, ...b] === #[],
)

// The combine operation is associative
let c = #[5, 6]

console.log("tuple: associative combine",
    a.concat(b).concat(c) === #[],
    a.concat(b.concat(c)) === #[],

    #[...a, ...b, ...c] === #[],
    #[...a, ...#[...b, ...c]] === #[],
)

// Has an identity value that works correctly with the combine operation

let identity = undefined

console.log("tuple: identity combine",
    a.concat(identity) === a,

    #[...a, ...identity] === a,
)

// Record type is also a monoid, even though key-value pairs can be overwritten
//
// combine
a = #{ name: 'Punchi' }
b = #{ ancestry: 'Gnome' }

console.log("record: has combine",
    #{ ...a, ...b } === #{}
)

const z = #{ name: 'Ezren' }

console.log("record: has combine (overwrite)",
    #{ ...a, ...z } === #{}
)

// associativty
c = #{ background: 'Sailor' }

console.log("record: associative combine",
    #{ ...a, ...b, ...c } === #{},

    #{ ...a, ...#{ ...b, ...c }} === #{},
)

const y = #{ background: 'Street Urchin' }

console.log("record: associative combine (overwrite)",
    #{ ...a, ...b, ...y } === #{},

    #{ ...a, ...#{ ...b, ...y }} === #{},
)

identity = undefined

// identity
console.log("record: identity combine",
    #{ ...a, ...identity } === a,
)

console.log("record: identity combine (overwrite)",
    #{ ...a, ...z, ...identity } === z,
)
