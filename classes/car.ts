// Läbivus kilomeetrites, kaal, keretüüp, istmearv, auto värv, hoiuruumimaht liitrites, vedrustsussüsteemitüüp, piduritüüp, tootmisaasta
/*
    Klass omab meetodid:

    - auto kuluinfo kuvamiseks (läbivus, piduritüüp, tootmisaasta, vedrustsussüsteemi tüüp)
    - auto mugavuseinfo kuvamiseks (värv, hoiuruumimaht, tootmisaasta, keretüüp, istmeaev)
    - odomeetri suurendamiseks
    - odomeetri mõõdu kuvamiseks inimloetava lausega 
*/

class Car {
    range: number
    weight: number
    body_style: string
    seets_number: number
    color: string
    cargo_volume: number
    suspension_type: string
    brake_type: string
    year: number

    constructor(range: number, weight: number, body_style: string, seets_number: number, color: string, cargo_volume: number, suspension_type: string, brake_type: string, year: number) {
        this.range = range
        this.weight = weight
        this.body_style = body_style
        this.seets_number = seets_number
        this.color = color
        this.cargo_volume = cargo_volume
        this.suspension_type = suspension_type
        this.brake_type = brake_type
        this.year = year
    }

    get_expenses_info(): void {
        console.log(`
            Läbivus: ${this.range} KM
            Piduri tüüp: ${this.brake_type}
            Tootmisaasta: ${this.year}
            Vedrustsussüsteemi tüüp: ${this.suspension_type}
            `)
    }

    get_comfort_info(): void {
        console.log(`
            Värv: ${this.color}
            Hoiuruumimaht: ${this.cargo_volume}
            Tootmisaasta: ${this.year}
            Keretüüp: ${this.body_style}
            Istmearv: ${this.seets_number}
            `)
    }

    add_odometer(numberToAdd: number): void {
        this.range += numberToAdd
    }
    
    get_odometer_stats(): void {
        
    }
}
