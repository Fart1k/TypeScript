//Siin asub mediaatori liides.
//Lennukid teavitavad lennujuhtimistorni, selle asemel, et suhelda otse üksteisega.
interface Lennujuhtija {
    teavita(sender: object, event: string): void
}

//Lennujuhtimistornis on lennujuhtijad, kes koordineevrivad erinevaid lennukeid
class LennujuhtimisTorn implements Lennujuhtija {
    private reisiLennuk: ReisiLennuk
    private kaubaLennuk: KaubaLennuk

    constructor(reisiLennuk: ReisiLennuk, kaubaLennuk: KaubaLennuk) {
        this.reisiLennuk = reisiLennuk
        this.reisiLennuk.seaLennujuhtija(this)

        this.kaubaLennuk = kaubaLennuk
        this.kaubaLennuk.seaLennujuhtija(this)
    }

    public teavita(sender: object, event: string): void {
        if (event === "KÜSIN_LUBA_ÕHKUTÕUSUKS") {
            console.log("Lennujuhtimistorn: Õhkutõusu luba palutud")
            this.kaubaLennuk.hoiaAsukohta()
            this.reisiLennuk.tõuseÕhku()
        }

        if (event === "KÜSIN_LUBA_MAANDUMISEKS") {
            console.log("Lennujuhtimistorn: Maandumise luba palutud")
            this.reisiLennuk.eemalduRajalt()
            this.kaubaLennuk.maandu()
        }
    }
}

//Baasklass lennukite jaoks
class Lennuk {
    protected lennuTorn!: LennujuhtimisTorn

    public seaLennujuhtija(lennuTorn: LennujuhtimisTorn): void {
        this.lennuTorn = lennuTorn
    }
}

//Reisijalennuk
class ReisiLennuk extends Lennuk {
    public küsiÕhkutõusuLuba(): void {
        console.log('Reisilennuk küsib luba õhkutõusuks')
        this.lennuTorn.teavita(this, 'KÜSIN_LUBA_ÕHKUTÕUSUKS')
    }
    public tõuseÕhku(): void {
        console.log('Reisilennuk tõuseb õhku')
    }
    public eemalduRajalt(): void {
        console.log('Reisilennuk eemaldub õhkutõusurajalt')
    }
}

//Kaubalennuk
class KaubaLennuk extends Lennuk {
    public küsiMaandumisLuba(): void {
        console.log('Kaubalennuk küsib maandumisluba')
        this.lennuTorn.teavita(this, 'KÜSIN_LUBA_MAANDUMISEKS')
    }
    public hoiaAsukohta(): void {
        console.log('Kaubalennuk on paigal')
    }
    public maandu(): void {
        console.log('Kaubalennuk maandub ')
    }
}

//Kliendikood
const reisiLennuk = new ReisiLennuk()
const kaubaLennuk = new KaubaLennuk()
const lennujuhtimisTorn = new LennujuhtimisTorn(reisiLennuk, kaubaLennuk)

console.log('Reisilennuk tahab õhku tõusta:')
reisiLennuk.küsiÕhkutõusuLuba()

console.log('')
console.log('Kaubalennuk tahab maanduda:')
kaubaLennuk.küsiMaandumisLuba()