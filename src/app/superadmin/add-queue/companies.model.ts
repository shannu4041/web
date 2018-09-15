import { DirectorsModal } from "../accounts/directors.modal";

export class CompaniesModal{
    id?:number;
    input_id?:number;
    company?:number;
    email?:string;
    address?:string;
    directors:DirectorsModal[];
    constructor(){
        this.id = null;
        this.input_id = null;
        this.company = null;
        this.email = null;
        this.address = null;
        this.directors = Array<DirectorsModal>();
    }
}