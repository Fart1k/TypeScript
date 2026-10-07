//Mediaatori liides deklareerib ära meetodi mida komponendid kasutavad mediaatorile 
// teavituse saatmiseks, kui juhtub mingisugune asi.
//Mediaator võib reageerida nendele juhtumitele ja anda edasi töö teisele komponendile.
interface Mediaator {
    teadvusta(sender: object, event: string): void
}

//Kindlad mediaatorid implementeerivad koostöölise käitumise kordineerides erinevaid komponente
class KindelMediaator implements Mediaator {
    private komponent1: Komponent1
    private komponent2: Komponent2

    constructor(k1: Komponent1, k2: Komponent2) {
        this.komponent1 = k1
        this.komponent1.seaMediaator(this)

        this.komponent2 = k2
        this.komponent2.seaMediaator(this)
    }

    public teadvusta(sender: object, event: string): void {
        if (event === 'A') {
            console.log('Mediaator reageerib juhtumile A ja teostab järgnevad tegevused:')
            this.komponent2.teeTegevusC()
        }
        if (event === 'D') {
            console.log('Mediaator reageerib juhtumile D ja teostab järgnevad tegevused:')
            this.komponent1.teeTegevusB()
            this.komponent2.teeTegevusC()
        }
    }
}
//Baas komponent annab esmaselt põhifunktsioonalsuse mediaatori instantsi komponendi
// objektide sees hoidmiseks
class BaasKomponent {
    protected mediaator: Mediaator

    constructor(mediaator?: Mediaator) {
        this.mediaator = mediaator!
    }

    public seaMediaator(mediaator: Mediaator): void {
        this.mediaator = mediaator
    }
}
//kindlad komponendid implementeerivad erinevaid funktsionaalsusi,
// ning ei sõltu teistest komponentidest.
//Nad ei sõltu ka teistest kindlatest mediaatoriklassidest.
class Komponent1 extends BaasKomponent {
    public teeTegevusA(): void {
        console.log('Komponent1 teostab tegevuse A')
        this.mediaator.teadvusta(this, 'A')
    }
    public teeTegevusB(): void {
        console.log('Komponent1 teostab tegevuse B')
        this.mediaator.teadvusta(this, 'B')
    }
}
class Komponent2 extends BaasKomponent {
    public teeTegevusC(): void {
        console.log('Komponent2 teostab tegevuse C')
        this.mediaator.teadvusta(this, 'C')
    }
    public teeTegevusD(): void {
        console.log('Komponent2 teostab tegevuse D')
        this.mediaator.teadvusta(this, 'D')
    }
}

//Kliendikood
const k1 = new Komponent1()
const k2 = new Komponent2()
const mediaator = new KindelMediaator(k1, k2)
console.log("Klient kutsub esile tegevuse A")
k1.teeTegevusA()
console.log("Klient kutsub esile tegevuse D")
k2.teeTegevusD()