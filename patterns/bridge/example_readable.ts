//Abstraktsioon defineerib ära kontrollimise liidese mis on üks osa nende kahe klassi hierarhiast. See hoiab endas viiteid objektidele implementatsioonis ja delegeerib kogu töö sinna

class Telekapult {
    protected  seade: Seade

    constructor(seade: Seade) {
        this.seade = seade
    }
    lülitaSisseVälja() {
        if (this.seade.onSees()) {
            this.seade.lülitaVälja()
        } else {
            this.seade.lülitaSisse()
        }
    }
    heliMaha() {
        this.seade.setHeli(this.seade.getValjus()-10)
    }
    heliÜles() {
        this.seade.setHeli(this.seade.getValjus()+10)
    }
    kanalVäiksemaks() {
        this.seade.setKanal(this.seade.getKanal()-1)
    }
    kanalSuuremaks() {
        this.seade.setKanal(this.seade.getKanal()+1)
    }
}

//Klasse saab iseseisvalt Seade klassist laiendada.
class nutiPult extends Telekapult {
    vaigistaHeli() {
        this.seade.setHeli(0)
    }
}

//implementatsiooni liides deklareerib meetodid mis on ühtsed kõikidele implementatsiooni klassidele. See ei pea vastama bastraktsioonide liidestele. Liidesed võivad olla täielikult erinevad. Tavaliselt implementatsiooni liides annab ainult primitiivseid funktsioone, aga abstraktsioon kirjeldab ära kõrgema taseme tegevused mis põhinevad nendel primitiividel.
interface Seade {
    onSees(): boolean;
    lülitaSisse(): void;
    lülitaVälja(): void;
    getValjus(): number;
    setHeli(protsent: number): void;
    getKanal(): number;
    setKanal(kanalinumber: number): void;
}

class Telekas implements Seade {
    private kasOnSees: boolean = false;
    private helitase: number = 50;
    private kanal: number = 0;

    onSees(): boolean {
        return this.kasOnSees;
    }
    lülitaSisse(): void {
        this.kasOnSees = true
        console.log("Telekas sees")
    }
    lülitaVälja(): void {
        this.kasOnSees = false
        console.log("Telekas väljas (mitte õues)")
    }
    getValjus(): number {
        return this.helitase
    }
    setHeli(protsent: number): void {
        this.helitase = Math.max(0, Math.min(100, protsent))
        console.log(`Heli seatud ${this.helitase}`)
    }
    getKanal(): number {
        return this.kanal
    }
    setKanal(kanalinumber: number): void {
        this.kanal = Math.max(1, kanalinumber)
        console.log(`Kanal on number ${this.kanal}`)
    }
}

const telekas = new Telekas()

const telekapult = new Telekapult(telekas)

telekapult.lülitaSisseVälja()
telekapult.heliÜles()
telekapult.heliÜles()
telekapult.kanalSuuremaks()