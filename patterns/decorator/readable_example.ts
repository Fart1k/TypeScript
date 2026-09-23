//Komponendi liides defineerib ära operatsiooni tegevused, mida dekoraatorid muuda saavad
interface AndmeAllikas {
    kirjutaAndmed(data: string): void
    loeAndmed(): string
}

//Kindlad komponendid annavad vaikeimplementatsioonid nende tegevuste jaoks.
//Võib olla mitmed variatsioone nendes klassidest ühes programmis
class FailiAndmeAllikas implements AndmeAllikas {
    public kirjutaAndmed(data: string): void {
        //nothing write data
    }

    public loeAndmed(): string {
        return "Siin on andmed: "
    }

    
}
//Baas dekoraatori klass jälgib sama liidest nagu kõik teised komponendid,
// selle klassi esmane eesmärk on defineerida wrappimisliides kõikidele 
// kindlatele dekoraatoritele
//Vaikeimplementatsioon wrappivast koodist võib sisaldada välju mis hoiavad
// endas seda wrapitud komponenti ennast ning ka siis mooduseid selle 
// kasutamiseks või initsialiseerimiseks

class ZipFail implements AndmeAllikas {
    wrapitav: AndmeAllikas
    
    constructor(allikas: AndmeAllikas) {
        this.wrapitav = allikas
    }

    //Baasdekoraator lihtsalt delegeerib töö wräpitud komponendile, lisakäitumisi
    // saab siin või kindlates dekoraatorites lisada
    kirjutaAndmed(data: string): void {
        console.log(`Kirjutasin andmed ${data}sse`)
        console.log(`${this.wrapitav.kirjutaAndmed("abc")}`)
    }

    //Kindlad dekoraatorid võivad kutsuda esile ülemobjekti meetodi 
    // implementatsiooni mingist meetodist, selle asemele, et seda
    // wräpitud objektid ise otse välja kutsuda.
    //See lähenemine lihtsustab dekoraatorklasside laiendamist.
    loeAndmed(): string {
        this.wrapitav.loeAndmed()
        return "Lugesin andmed aga mitte midagi aru ei saanud, vist on zip-pomm"
    }
}

//Kindlad dekoraatorid peavad kutsuma meetodeid wräpitud objektilt,
// aga võivad lisada midagi omalt poolt tulemusele.
//Dekoraatorid saavad käivitada lisandkäitumist kas enne või pärast
// kutset wräpitud objektil olevale meetodile.
class KrüpteerimisDekoraator extends FailiAndmeAllikas {
    public kirjutaAndmed(data: string): void {
        console.log(`Kirjutasin krüpteeritud andmed, süsteem valmis`)
    }

    public loeAndmed(): string {
        return "Loetud on krüpteeritud andmed, need ütlevad 'õki kaki kommi nommi'"
    }
}

function kliendikood9() {
    let source = new FailiAndmeAllikas()
    source.kirjutaAndmed("mingiFail.dat")
    console.log(source.loeAndmed())
    
    source = new KrüpteerimisDekoraator()
    source.kirjutaAndmed("krüpteeritudAndmed.bat")
    console.log(source.loeAndmed())

    source = new ZipFail(source)
    source.kirjutaAndmed("pakitudAndmed.cat")
    console.log(source.loeAndmed())
}

kliendikood9