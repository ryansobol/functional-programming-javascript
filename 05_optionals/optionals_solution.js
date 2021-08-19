import { Record, Tuple } from '@bloomberg/record-tuple-polyfill';

// GOAL: Use option types to make the all output display true
//
// SEE: https://en.wikipedia.org/wiki/Option_type

// An option type (a.k.a optional type, maybe type) is a generic type that
// encapsulates an optional value. The optional value is said to be either:
//
// - Present by referencing a non-null (or non-undefined) value
// - Or absent (or empty) by referencing the null value
//
// An option type is used as the return type of functions which may or may not return a
// meaningful value, and returning null (or undefined) instead would likely cause a
// runtime error.
//
// Option types are more useful with languages that are strongly typed (i.e. not
// JavaScript), and can detect typing-related errors during compilation.
//
// SEE: https://en.wikipedia.org/wiki/Strong_and_weak_typing
//
// That said, option types are a common and powerful functional programming technique,
// as you will soon discover.


// Rules:
// #1 Never assign null to a constant or variable that expects to be assigned an Option
// #2 Never return null from a function that expects to return an Option
// #3 Never use Option.prototype.get() until its proven that the value is present
// #4 Prefer alternatives to Option.prototype.isPresent() plus Option.prototype.get()
class Option {
    // TYPE: <T>(value: T) -> void
    constructor(value) {
        this._value = value
    }

    // TYPE: () => boolean
    isPresent() {
        return this._value !== null && this._value !== undefined
    }

    // TYPE: <T>() => T
    get() {
        if (this.isPresent()) {
            return this._value
        }

        throw new TypeError('Option is empty')
    }

    // TYPE: <T>(T) => T
    orElse(value) {
        return this.isPresent() ? this.get() : value
    }
}

// The number type in JavaScript is a monoid
//
// SEE: The binary combine operation for number

// TYPE: type PC = { name: string; ancestry: string }
// TYPE: Tuple<PC>
const pcs = #[
    #{ name: 'Bilbo', ancestry: 'Halfling' },
    #{ name: 'Ezren', ancestry: 'Human' },
    #{ name: 'Fisti', ancestry: 'Gnome' },
    #{ name: 'Harsk', ancestry: 'Dwarf' },
]

// TYPE: (pcs: Tuple<PC>, ancestry: string) => string
let getNameByAncestry = (pcs, ancestry) => {
    return pcs.find((pc) => pc.ancestry === ancestry).name
}

// TYPE: string
const nameHalfing = getNameByAncestry(pcs, 'Halfling')

console.log(nameHalfing)

// TYPE: (pcs: Tuple<PC>, ancestry: string) => string
getNameByAncestry = (pcs, ancestry) => {
    const result = pcs.find((pc) => pc.ancestry === ancestry)

    return result !== null && result !== undefined ? result.name : 'UNKNOWN'
}

// TYPE: string
let nameElf = getNameByAncestry(pcs, 'Elf')

console.log(nameElf)

// TYPE: (pcs: Tuple<PC>, ancestry: string) => string
getNameByAncestry = (pcs, ancestry) => {
    const result = new Option(pcs.find((pc) => pc.ancestry === ancestry))

    return result.isPresent() ? result.get().name : 'UNKNOWN'
}

// TYPE: string
nameElf = getNameByAncestry(pcs, 'Elf')

console.log(nameElf)

// TYPE: (pcs: Tuple<PC>, ancestry: string) => string
getNameByAncestry = (pcs, ancestry) => {
    const result = new Option(pcs.find((pc) => pc.ancestry === ancestry))

    return result.orElse(#{ name: 'UNKNOWN', ancestry: 'UNKNOWN' }).name

    // return new Option(pcs.find((pc) => pc.ancestry === ancestry))
    //     .orElse(#{ name: 'UNKNOWN', ancestry: 'UNKNOWN' })
}

// TYPE: string
nameElf = getNameByAncestry(pcs, 'Elf')

console.log(nameElf)
