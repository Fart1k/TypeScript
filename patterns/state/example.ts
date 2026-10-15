//Kontekst kirjeldab ära kliendi huvitava liidese.
//See hoiab ka viidet Olek alamklassi juurde mis esindab hetkel
// kontekstis olevat olekut
class Kontekst {
    private olek: Olek

    constructor(olek: Olek) {
        this.ülekanne(olek)
    }
    //Kontekst lubab olekut muuta koodi jooksutamisega samaaegselt 
    // läbi vastava meetodi.
    public ülekanne(olek: Olek): void {
        console.log(`Kontekst muudab oma olekut selleks: ${(<any>olek).constructor.name}`)
        this.olek = olek
        this.olek.seaKontekst(this)
    }

    //Kontekst delegeerib osa oma käitumisest praegu kasutusel olevale olekuobjektile
    public päring1(): void {
        this.olek.tegevus1()
    }
    
    public päring2(): void {
        this.olek.tegevus2()
    }
}

//Baas Oleku klass ütleb ära kindlad meetodid mida kõik Kindlad Olekud peaksid implementeerima
//See klass annab ka tagasiviite Konteksti objektile, 
// mis selle olekuga seotud on.
//Seda tagasiviidet saavad erinevad olekud kasutada, 
// et anda konteksti olek üle teisele olekule.
abstract class Olek {
    protected kontekst: Kontekst

    public seaKontekst(kontekst: Kontekst): void {
        this.kontekst = kontekst
    }

    public abstract tegevus1(): void
    public abstract tegevus2(): void
}

//Kindlad Olekud implementeerivad erivad käitumised,
// mis on seotud konteksti olekuga
class KindelOlekA extends Olek {
    public tegevus1(): void {
        console.log('KindelOlekA tegeleb tegevuse 1-ga')
        console.log('KindelOlekA tahab muuta Konteksti olekut')
        this.kontekst.ülekanne(new KindelOlekB())

    }
    public tegevus2(): void {
        console.log('KindelOlekA tegeleb tegevuse 2-ga')
    }
}

class KindelOlekB extends Olek {
    public tegevus1(): void {
        console.log('KindelOlekB tegeleb tegevuse 1-ga')
    }
    public tegevus2(): void {
        console.log('KindelOlekB tegeleb tegevuse 2-ga')
        console.log('KindelOlekB tahab muuta Konteksti olekut')
        this.kontekst.ülekanne(new KindelOlekA())
    }
}

//Kliendikood
const kontekst = new Kontekst(new KindelOlekA())
kontekst.päring1()
kontekst.päring2()