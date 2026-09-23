// Baasklass Komponent deklarerib ära ühised operatsioonid nii lihtsale kui keerulisele objektile, 
// kompositsioonis

abstract class Komponent {
  protected parent!: Komponent | null;

  // Valikuliselt saab Komponent deklareerida ka liidese ülemelemendi leidmiseks
  // mingisuguses puustruktuuris. See saab anda ka mingisuguse vaikeimplementatsiooni
  // neile meetoditele
  public setParent(ülemelent: Komponent | null) {
    this.parent = ülemelent;
  }

  public getParent(): Komponent | null {
    return this.parent;
  }
  
  // Mõningatel juhtudel on kasulik, kui defineeritakse ära ka alamobjektidega seotud haldusoperatsioonid
  // kohe siinsamas alusklassis Komponent. 
  //Niimodi ei pea paljastama mingeid konkreetseid komponentklasse kliendikoodile, 
  // isegi kui seda puud parasjagu kokku pannakse. 
  //Selle halp külg on see, et need meetodid jäävad vähimatel elementidel 
  // (alamelemente enam ei ole) tühjaks.
  public add(komponent: Komponent): void {  }
  public remove(komponent: Komponent): void {  }

  //Saab anda ka meetodi mis laseb klientkoodil aru saada kas sellel komponendil saab
  // olla alamelente.
  public KasOnKomposiitObjekt(): boolean {
    return false
  }

  //Baasklass Komponent võib implementeerida mingisuguse vaikekäitumise või tegevuse
  // aga võib ka selle ära jätta, ning lasta otsustada selle üle täielikult kindlatel klassidel.
  //Seda teebki sõda "abstract" meetodi signatuuris, öeldes et selle käitumine on abstraktne
  public abstract tegevus(): string
}

//Lehe klass väljendab lõppobjekte selles kompositsioonis, lehel ei saa olla alamobjekte
// ning tavaliselt on just need objektid, mis teevad tegelikku tööd.
//Kusjuures komposiitobjektid ainult delegeerivad tööd oma alamobjektidele.
class Leht extends Komponent {
    public tegevus(): string {
        return "olen leheke"
    }
}

//Komposiidi klass väljendab keerukaid objekte millel võib olla alamobjekte.
//Tavaliselt need objektid tööd ei tee, vaid ainult delegeerivad töö mujale.
class Komposiit extends Komponent {
    protected alamelemendid: Komponent[] = []

    //Komposiitobjekt saab lisada või eemaldada teisi komponent, nii lihtsaid kui keerukaid.
    public add(komponent: Komponent): void {
        this.alamelemendid.push(komponent)
        komponent.setParent(this)
    }

    public remove(komponent: Komponent): void {
        const komponendiIndeks =     this.alamelemendid.indexOf(komponent)
        this.alamelemendid.splice(komponendiIndeks, 1)

        komponent.setParent(null)
    }

    public KasOnKomposiitObjekt(): boolean {
        return true
    }

    //Komposiit täidab oma esmase loogika kindlal viisil, ning reisib kohu
    // alamelemtide kogumiku läbim summeerides tulemust ja kutsudes esile
    // alamelementide meetodeid.
    //Kuna komposiitalamelemendid esitavad need andmed oma alamelementidele jne,
    // kogu puu läbitakse selle tegevuse tulemusena
    public tegevus(): string {
        const results = []
        for (const alamelement of this.alamelemendid) {
            results.push(alamelement.tegevus())
        }

        return `Branch (${results.join('+')})`
    }
}

//Kliendikood töötab kõikide komponentidega läbi ühise alusliidese
function kliendikood7(komponent: Komponent) {
    console.log(`Result ${komponent.tegevus()}`)
}

const lihtne = new Leht()
console.log("On olemas lihtne komponent")
kliendikood7(lihtne)
console.log("")

// ja klientkood töötab ka kõikide komposiitobjektidega
const puu = new Komposiit()
const oks1 = new Komposiit()
const oks2 = new Komposiit()
oks1.add(new Leht())
oks1.add(new Leht())

oks2.add(new Leht())
puu.add(oks1)
puu.add(oks2)

console.log("Nüüd on olemas ka keeruline objekt")
kliendikood7(puu)

//Tänu sellele, et alamobjektide haldusoperatsioonid on deklareeritud Komponendi
// baasklassis, kliendikood saab töötada ükskõik millise komponendiga, olgu ta siis
// lihtne või keeruline ilma tuginemata nende kindlatele klassidele
function kliendikood8(komponent1: Komponent, komponent2: Komponent) {
    if (komponent1.KasOnKomposiitObjekt()) {
        komponent1.add(komponent2)
    }
}
console.log(`Ei ole vaja kontrollida komponentide klasse isegi kui on tegemist puu haldamisega`)
kliendikood8(puu, lihtne)