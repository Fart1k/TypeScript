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