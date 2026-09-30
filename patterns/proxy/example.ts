//Mingisuguse kauge teenuse liides
interface KolmandaOsapooleYoutubeTeenus {
    loetleVideod(): string[]
    loeVideoInfo(id: string): string
    laeVideodAlla(id: string): void
}

//Päristeenus
class KolmandaOsapooleYoutubeClass implements KolmandaOsapooleYoutubeTeenus {
    loetleVideod(): string[] {
        console.log("Loen videod youtubelt")        
        return ["Video1", "Video2", "Video3"]
    }
    
    loeVideoInfo(id: string): string {
        console.log(`Hangin info video ${id} kohta`)
        return `Siin on info ${id} kohta: hueta ebanaja`
    }

    laeVideodAlla(id: string): void {
        console.log(`Laen alla videot ${id} youtubist`)
    }
}

//Proxy, mis vahendab päristeenust kliendile
class ProxyKlassYoutubeTeenusele implements KolmandaOsapooleYoutubeTeenus {
    private teenus: KolmandaOsapooleYoutubeTeenus
    private loendiPuhver: string[] | null = null
    private videoPuhver: Map<string, string> = new Map()
    private allalaetudVideod: string[] = []
    vajabVärskendust: boolean = false

    constructor(teenus: KolmandaOsapooleYoutubeTeenus) {
        this.teenus = teenus
    }

    loetleVideod(): string[] {
        if (this.loendiPuhver === null || this.vajabVärskendust) {
            this.loendiPuhver = this.teenus.loetleVideod()
        }
        else {
            console.log("Videod tulevad puhvrist")
        }
        return this.loendiPuhver
    }

    loeVideoInfo(id: string): string {
        const puhverdatudVideo = this.videoPuhver.get(id)

        if (puhverdatudVideo === undefined || this.vajabVärskendust) {
            const info = this.teenus.loeVideoInfo(id)
            this.videoPuhver.set(id, info)
            return info
        }
        console.log(`Info video ${id} jaoks tuleb puhvrist`)
        return puhverdatudVideo
    }

    laeVideodAlla(id: string): void {
        const jubaAllalaetudVideo = this.allalaetudVideod.includes(id)
        if (!jubaAllalaetudVideo || this.vajabVärskendust) {
            this.teenus.laeVideodAlla(id)
            this.allalaetudVideod.push(id)
        }
        else {
            console.log(`See video ${id} on allalaetud`)
        }
    }
}