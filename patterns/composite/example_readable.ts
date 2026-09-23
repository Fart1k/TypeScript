abstract class Ese {
    protected parent!: Ese | null
    public setParent(parent: Ese | null) {this.parent = parent}
    public getParent() {return this.parent}
    public abstract getData(): string
    public abstract getHind(): number
}

// 1 toode
class Toode extends Ese {
    protected nimi!: string
    protected hind!: number
    public getHind(): number {
        return this.hind
    }

    public setHind(uusHind: number): void {
        this.hind = uusHind
    }
    public getNimi(): string {
        return this.nimi
    }
    public setNimi(uusNimi: string): void {
        this.nimi = uusNimi
    }
    public getData(): string {
        return `See toode on "${this.nimi}" ja maksab ${this.hind}`
    }
}

class Karp extends Ese {
    private esemed: Ese[] = []
    
    addEse(ese: Ese): void {
        this.esemed.push(ese)
    }

    public getData(): string {
        return `${this.esemed.length}`
    }

    getHind(): number {
        let total = 0
        
        for (const ese of this.esemed) {
            total += ese.getHind()
        }
        return total
    }
}

const telefon = new Toode()
telefon.setNimi("Nokia 3310")
telefon.setHind(299)

const laadija = new Toode()
laadija.setNimi("3310 laadija")
laadija.setHind(29)

const korvaklapid = new Toode()
korvaklapid.setNimi("Razor")
korvaklapid.setHind(110)

const saadetis = new Karp()
saadetis.addEse(telefon)
saadetis.addEse(laadija)
saadetis.addEse(korvaklapid)

console.log(saadetis.getData())
telefon.getData()
korvaklapid.getData()