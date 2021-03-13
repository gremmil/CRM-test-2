export class ProvinciaApi {

    [k: string]: string | number

    constructor(
        public IdProvincia: number = 0,
        public Descripcion: string = '',
        public Estado: string = ''
    ) {

    }

}
export class Provincia {

    [k: string]: string | number

    constructor(
        public idProvincia: number = 0,
        public descripcion: string = '',
        public estado: string = ''
    ) {

    }

}
