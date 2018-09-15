import {search} from "../../app/models/search.model";
export class Map{
    pageSize?:number;
    page?:number ;
    sortBy?:string;
    sortDirection?:string ;
    business_group_id?:number;
    business_unit_id?:number;
    name?:string;
    registration_no?:number;
    from_date?:string;
    search? : search;
    vehicleobj? : any;
    constructor()
	{
        this.name = null;
        this.business_group_id =null;
        this.business_unit_id = null;
        this.registration_no = null;
        this.from_date = null;
        this.page = 0;
        this.search=new search();
        this.vehicleobj = null;
    }
}