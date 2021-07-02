
// Tuple type is a monoid
// Has a combine operation
let a = #[1, 2]
let b = #[3, 4]

console.log(
  a.concat(b) === #[1, 2, 3, 4],

    #[...a, ...b] === #[1, 2, 3, 4],
)

// The combine operation is ssociative
let c = #[5, 6]

console.log(
  a.concat(b).concat(c) === a.concat(b.concat(c)),

    #[...a, ...b, ...c] === #[...a, ...#[...b, ...c]],
)

// Has an identity value that works correctly with the combine opeation

console.log(
    #[].concat(a) === a,

    #[...a, ...#[]] === a,
)

// Record type is also a monoid, even though key-value pairs can be overwritten
//   combine
a = #{ name: 'Punchi' }
b = #{ ancestry: 'Gnome' }

console.log(
    #{ ...a, ...b } === #{ name: 'Punchi', ancestry: 'Gnome' }
)

const z = #{ name: 'Ezren' }

console.log(
    #{ ...a, ...z } === #{ name: 'Ezren' }
)

//   associativty
c = #{ background: 'Sailor' }

console.log(
    #{ ...a, ...b, ...c } === #{ ...a, ...#{ ...b, ...c }},
)

const y = #{ background: 'Street Urchin' }

console.log(
    #{ ...a, ...b, ...y } === #{ ...a, ...#{ ...b, ...y }},
)

//   identity
console.log(
    #{ ...a, ...#{}} === a,
)

console.log(
    #{ ...a, ...z, ...#{}} === z,
)
