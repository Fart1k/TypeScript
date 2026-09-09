//tingimuslause
if (true) {

}
else if(false) {

}
else {

}

const month: number = 9;
let monthName: string;
switch(month) {
    case 1:
        monthName = "jaanuar"
        break;
    case 5:
        monthName = "mai"
        break;
    case 9:
        monthName = "september"
        break;
    default:
        monthName = "unknown"
        break
}
console.log(monthName);

let isThisOddOrEven = 9;

let oddEvenBool = isThisOddOrEven % 2 == 0 ? "Even" : "Odd";

//loogilised operaatorid
if(month && monthName) {
    console.log("On mõlemad")
}
if(month || monthName) {
    console.log("On ainult üks")
}
if(!month) {
    console.log("Kuu arv puudub")
}
