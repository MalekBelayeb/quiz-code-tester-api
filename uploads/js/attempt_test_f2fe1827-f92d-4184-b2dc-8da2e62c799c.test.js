import addTwoNumbers from "E:/OrangeDigitalCoding/code-tester-js-api/uploads/js/attempt_10c7c96a-3968-4eb3-afbd-71325df16930.js"

test("Somme de deux entier",()=>{
    expect(addTwoNumbers(5,3)).toEqual(8)
})

test("Les deux entiers ne sont pas negatifs 0 sinon",()=>{
    expect(addTwoNumbers(-6,3)).toEqual(0)
})

test("Si l'un des deux entier est nul la fonction retourne 0",()=>{
    expect(addTwoNumbers(0,3)).toEqual(0)
})