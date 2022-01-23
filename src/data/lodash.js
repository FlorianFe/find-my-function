
import { chunk, compact, concat } from 'lodash';

const ANY = Symbol();
const BOOLEAN = Symbol();
const NUMBER = Symbol();
const STRING = Symbol();

const data = [
    {
        func: chunk,
        usage: [
            [[1, 'b', 3, 'd']],
            [['a', 'b', 'c', 'd'], 3],
        ],
        link: 'https://lodash.com/docs/4.17.15#chunk',
        description: "Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.",
        type: "Array",
    },
    {
        func: compact,
        usage: [
            [[1, 0, false, 2, '', 3]],
        ],
        link: 'https://lodash.com/docs/4.17.15#compact',
        description: "Creates a new array with all falsey values removed. The values false, null, 0, \"\", undefined, and NaN are falsey.",
        type: "Array",
    },
    {
        func: concat,
        usage: [
            [[[1, 2, 3], [4, 5, 6]], [1, 2, "x", 4, 5, 6]],
            [[[1, 2, 3], 1, 2, 3, "b", 5, 6]],
        ],
        link: 'https://lodash.com/docs/4.17.15#concat',
        description: "Creates a new array concatenating array with any additional arrays and/or values. Note: This method is designed to be used with array methods such as concat and push.",
        type: "Array",
    },       
]