//Fassadi klass annab lihtsa liidese mingisugusele kompleksele loogiikale
// kas ühe või mitme alasüsteemi jaoks.
//Fassaad delegeerib kliendi päringud õigetele objektidele
// alamsüsteemi sees.
//Fassaad on ka vastutav nende elutsükli eest. 
//Kõik see värjestab klienti alamsüsteemi soovimatu
// kompleksuse eest.

class Fassaad {
    protected alasüsteem1: Alasüsteem1
    protected alasüsteem2: Alasüsteem2
    
    //Olenevalt sinu programmi vajadustest, sa saad anda fassaadile
    // olemasolevate alasüsteemide objektid või sundima fassaadi
    // neid ise looma

    constructor(alasüsteem1?: Alasüsteem1, alasüsteem2?: Alasüsteem2) {
        this.alasüsteem1 = alasüsteem1 || new Alasüsteem1()
        this.alasüsteem2 = alasüsteem2 || new Alasüsteem2()
    }

    //Fassaadi meetodid on mugavad läbilõiked/otseteed läbi alasüsteemi
    // keerulise funktsionaalsuse.
    //Aga, kliendid saavad vasti ainult murdosa alamsüsteemi keerukusest.
    public tegevus(): string {
        let tulemus = "Fassaad initsialiseerib alamsüsteeme: \n"
        tulemus += this.alasüsteem1.tegevus1()
        tulemus += this.alasüsteem2.tegevus1()
        tulemus += "Fassaad käsib alamsüsteemidel täita tegevusi"
        tulemus += this.alasüsteem1.tegevusN()
        tulemus += this.alasüsteem2.tegevusZ()

        return tulemus
    }
}
//Alasüsteem suudab vastu võtta päringuid kas fassaadilt või kliendilt otse.
//Igal juhul on alasüsteem jaoks fassaad lihtsalt veel üks klient,
// mis ei ole selle alasüsteemi osa.

class Alasüsteem1 {
    public tegevus1(): string {
        return "Tagasüsteem1 valmis"
    }

    public tegevusN(): string {
        return "Alasüsteem 1 TÕTTAB ÄKSHONISSE"
    }
}

//Osad fassaadid suudavad töötada mitme süsteemiga samaaegselt korraga.
class Alasüsteem2 {
    public tegevus1(): string {
        return "Alasüsteem 2 valmis"
    }

    public tegevusZ(): string {
        return "Alasüsteem 2 valmis ründab Venemaad!"
    }
}

//Kliendikood töötab kompleksete alasüsteemidega läbi lihtsa liidese,
// mille annab fassaad, kui fassaad haldab selle alasüsteemi elutsüklit,
// klient ei pruugi üldse selle alasüsteemi olemasolust teadlik olla.
//Selline lähenemine aitab hoida kompleksust kontrolli alla.
function klientkood10(fassaad: Fassaad) {
    console.log(fassaad.tegevus())
}

//Klientkoodil võib olla mõned alasüsteemi objektid olla juba loodud.
//Sellisel juhul võib vajalik olla fassaadi initsialiseerimine nende objektidega,
// selle asemel, et lasta fassaadil luua uued instantsid nendest objektidest.
const alasüsteem1 = new Alasüsteem1()
const alasüsteem2 = new Alasüsteem2()
const fassaad = new Fassaad(alasüsteem1, alasüsteem2)
klientkood10(fassaad)