import addTwoNumbers from "${attempt_path}"

test("Somme de deux entier",()=>{
    expect(addTwoNumbers(5,3)).toEqual(8)
})

test("Les deux entiers ne sont pas negatifs 0 sinon",()=>{
    expect(addTwoNumbers(-6,3)).toEqual(0)
})

test("Si l'un des deux entier est nul la fonction retourne 0",()=>{
    expect(addTwoNumbers(0,3)).toEqual(0)
})