//Kõikidel töötlejatel peab olema ühine liides.
interface TelefonitoeLiides {
    lahendaPäring(päring: Telefonipäring): void
}

//See on kõikide töötlejate baasklass
class TelefonitoeTöötleja implements TelefonitoeLiides {

    //See muutuja näitab, kellele päring edasi antakse,
    // kui praegune töötleja ei saa seda lahendada
    protected järgmine: TelefonitoeTöötleja | null = null

    //See funktsioon määrab järgmise töötlejat.
    määraJärgmine(töötleja: TelefonitoeTöötleja): void {
        this.järgmine = töötleja
    }

    lahendaPäring(päring: Telefonipäring): void {
        //Kui järgmine töötleja on olemas, siis saadame päringu edasi
        if (this.järgmine !== null) {
            this.järgmine.lahendaPäring(päring)
        }
        else {
            //Kui päringule ei ole leitud ühtegi sobiva töötlejat, siis logime seda konsooli.
            console.log("Päringule ei leitud sobiv töötaja")
        }
    }
}

//See on ahela esimene töötleja.
//Ta lahendab kõige lihtsamad küsimused.
class Automaatvastaja extends TelefonitoeTöötleja {
    lahendaPäring(päring: Telefonipäring): void {
        if (päring.tüüp === "staatuseNumber") {
            //Kui päring on midagi, mida automaatvastaja saab lahendada, siis kirjutame seda konsooli
            console.log("Automaatvastaja: Telefoninumber on aktiivne")
        }
        else {
            //Kui tegemist on sellega, mida automaatvastaja ei saa teha, siis saadetakse seda edasi.
            super.lahendaPäring(päring)
        }
    }
}

//Klienditeenindaja tegeleb küsimustega, mis vajavad juba inimese aju.
//Kuid see veel ei ole ahela tipp.
class Klienditeenindaja extends TelefonitoeTöötleja {
    lahendaPäring(päring: Telefonipäring): void {
        if (päring.tüüp === "paketiVahetamine") {
            console.log("Klienditeenindaja: Teie telefonipakett on vahetatud")
        }
        else {
            super.lahendaPäring(päring)
        }
    }
}

//Tehniline spetsialist tegeleb küsimustega, mida keegi teine ei saa.
//See on ahela tipp
class Tehnilinespetsialist extends TelefonitoeTöötleja {
    lahendaPäring(päring: Telefonipäring): void {
        if (päring.tüüp === "võrguViga") {
            console.log("Tehniline spetsialist: Töötleme")
        }
        else {
            //Kuna see on meie ahela tipp, siis baasklass ei saa seda edasi lükkama.
            super.lahendaPäring(päring)
        }
    }
}

//See klass kirjeldab kasutaja saadetud päringut.
//Päring sisaldab tüüpi ja kirjeldust.
class Telefonipäring {
    constructor(public tüüp: string, public kirjeldus: string) {  }
}

//See klass loob kogu tugisüsteemi.
//Tema ülesanne on töötlejad õigesse järjekorra panna
class Telefonirakendus {
    looTugiSüsteem(): TelefonitoeTöötleja {
        //Siin me loome kõiki vajalikuid töötlejaid
        const automaatVastaja = new Automaatvastaja()
        const kliendiTeenindaja = new Klienditeenindaja()
        const tehnilineSpetsialist = new Tehnilinespetsialist()

        //Moodustan ahela: Automaatvastaja -> Klienditeenindaja -> Tehniline spetsialist
        automaatVastaja.määraJärgmine(kliendiTeenindaja)
        kliendiTeenindaja.määraJärgmine(tehnilineSpetsialist)

        //Tagastan esimese töötlejat
        return automaatVastaja
    }

    käivita(): void {
        const tugiSüsteem = this.looTugiSüsteem()

        //Esimene päring, mida saab automaatvastaja lahendada
        const esimenePäring = new Telefonipäring("staatuseNumber", "Kas minu number on aktiivne?")
        tugiSüsteem.lahendaPäring(esimenePäring)

        //Teine päring, mida saab teha klienditeenindaja
        const teinePäring = new Telefonipäring("paketiVahetamine", "Soovin minna suurema paketi juurde")
        tugiSüsteem.lahendaPäring(teinePäring)

        //Kolmas päring, mida saab teha tehniline spetsialist
        const kolmasPäring = new Telefonipäring("võrguViga", "Telefon ei saa mobiiliühendust")
        tugiSüsteem.lahendaPäring(kolmasPäring)

        //Neljas päring, mida keegi ei saa lahendada
        const neljasPäring = new Telefonipäring("keegiSedaEiSaaLahendada", "Selle päringu ei saa lahendada")
        tugiSüsteem.lahendaPäring(neljasPäring)
    }
}

const rakendus = new Telefonirakendus()

rakendus.käivita()