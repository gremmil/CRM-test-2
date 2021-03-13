export class CampanaApi {

    [k: string]: string | number

    constructor(
        public IdCampana: number = 0,
        public Descripcion: string = '',
        public ArchivosAdjuntos: string = '',
        public Contenedor: string = '',
        public Estado: string = ''
    ){}

}

export class Campana {

    [k: string]: string | number

    constructor(
        public idCampana: number = 0,
        public descripcion: string = '',
        public archivosAdjuntos: string = '',
        public contenedor: string = '',
        public estado: string = ''
    ){}
    
}
