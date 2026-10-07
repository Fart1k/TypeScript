//Subjekti liides näitab ära mingid meetodid kuulajate haldamiseks
interface Subjekt {
    //Lisame jälgija subjekti juurde
    attach(jälgija: Jälgija): void
    //Eemaldame jälgija subjekti juurest
    detach(jälgija: Jälgija): void
    //Teavitusmeetod
    teavita(): void
}

//Subjekt omab mingit tähtsat olekut ja teavitab jälgijaid kui olek muutub
class KindelSubjekt implements Subjekt {
    //Lihtsuse mõttes on sisemine olek ainult üks number
    public olek: number
    //Jälgijate nimekiri, päriselt hoitakse seda nimekirja tunduvalt detailsemalt,
    // siin lihtsalt Array
    private jälgijad: Jälgija[] = []

    //Jälgijate haldusmeetodid
    public attach(jälgija: Jälgija): void {
        const onOlemas = this.jälgijad.includes(jälgija)

        if (onOlemas) {
            return console.log('Subjekt: Jälgija on juba registreeritud')
        }
        console.log('Subjekt: Uus jälgija')
        this.jälgijad.push(jälgija)
    }

    public detach(jälgija: Jälgija): void {
        const jälgijaIndex = this.jälgijad.indexOf(jälgija)

        if (jälgijaIndex === -1) {
            return console.log(`Subjekt: Jälgijat nimega ${jälgija} ei leitud`)
        }
        this.jälgijad.splice(jälgija, 1)
        console.log("Subjekt: Jälgija lahkus")
    }

    //Teavitusmeetod mis kutsub esile uuenduse jälgijatele
    public teavita(): void {
        console.log("Subjekt: Teavitan jälgijaid")
        for (const jälgija of this.jälgijad) {
            jälgija.uuendaMind(this)
        }
    }

    //Tavaliselt, tellimisloogika on ainult osa mida üks subjekt teha päriselt oskab
    // subjektid tüüpiliselt hoiavad endas mingit kindlat tähtsat äriloogikat,
    // see päästab valla teavituste laine teavitusmeetodi abil, kui midagi tähtsat
    // kas hakkab juhtuma või on juba juhtunud
    public mingiÄriLoogika(): void {
        console.log('Subjekt: Mingi värk läks baltas lahti')
        this.olek = Math.floor(Math.random()*11)
        console.log(`Subjekt: Mu olek on nüüd: ${this.olek}`)
        this.teavita()
    }
}

//Jälgija liides ütleb ära meetodi millega teda uuendada/teavitada saab
interface Jälgija {
    //Uuenduste saamismeetod
    uuendaMind(subjekt: Subjekt): void
}

//Kindlad jälgijad reageerivad teavitustele mis tulevad subjektilt
// kelle kuulajad nad on.
class KindelKuulajaA implements Jälgija {
    public uuendaMind(subjekt: Subjekt): void {
        if(subjekt instanceof KindelSubjekt && subjekt.olek <= 3) {
            console.log('Kindeljälgija A reageeris juhtumile')
        }
    }
}

class KindelKuulajaB implements Jälgija {
    public uuendaMind(subjekt: Subjekt): void {
        
    }
}