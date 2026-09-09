/*
klass asukoha jaoks, kus on kirjas lat, lon, aadress, postiindeks,
elamu tüüp (enumina), maja värv, korruste arv, katuse materjal

Klass omab ühte konstruktorit kõikide andmeväärtustega

Klass omab ka meetodit asukoha info kuvamiseks, ainult laiuskraadide väljastuseks, majavärvi kuvamiseks tekstina, majavärvi muutmiseks
*/
class LocationClass {
    lat: number
    lon: number
    aadress: string
    postal_code: number
    living_type: string
    color: string
    storrey_number: number
    roof_material: string


    constructor( lat: number, lon:number, aadress: string, postal_code: number, living_type: string, color: string, storrey_number: number, roof_material: string ) {
        this.lat = lat
        this.lon = lon
        this.aadress = aadress
        this.postal_code = postal_code
        this.living_type = living_type
        this.color = color
        this.storrey_number = storrey_number
        this.roof_material = roof_material
    }

    get_location_info(): void {
        console.log(`
            Latitude: ${this.lat}
            Longitude: ${this.lon}
            Aadress: ${this.aadress}
            Postal Code: ${this.postal_code}
            `)
    }

    get_lat_lon(): void {
        console.log(`
            Latitude: ${this.lat}
            Longitude: ${this.lon}
            `)
    }

    get_color(): void {
        console.log(`Color: ${this.color}`)
    }

    set_color(newColor: string): void {
        this.color = newColor
    }
}