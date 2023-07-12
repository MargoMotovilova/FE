//? Начальник цеха пригласил людей на совещание
//? Каждый, кто входит в кабинет пожимает руки всем присутствующим
//? Сколько человек зашло в кабинет, если известно,
//? что всего произошло 120 рукопожатий.

function getPeople( handshake ) {
    let people = 0; 
    let temp_handshake = 0; 

    while ( handshake > temp_handshake ) {
        people++; 
        temp_handshake = people * ( people - 1 ) / 2; 
    }

    return people;
}

console.log( getPeople(1) ); // 2
console.log( getPeople(3) ); // 3
console.log( getPeople(6) ); // 4
console.log( getPeople(10) ); // 5
console.log( getPeople(15) ); // 6
console.log( getPeople(120) ); // 15

//  6           7
// 15 + 6 = 21 + 7 = 28 + 8 = 36 + 9 = 45 + 10 = 55 + 11 = 66 + 12 = 78 + 13 = 91 + 14 = 105 + 15 = 120;
//2 = 2 рукопожатия 2 + 1 = 
// n(n-1)/2  6(6-1)/2 = 15 
// 1 = 0
// 2 = 1
// 3 = 3
// 4 = 6
// 5 = 10
// 6 = 15
// n = 6(6-1)/2