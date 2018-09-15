import {search} from "../../../models/search.model";
export class pagingModel
{
    pageSize
    page ;
    sortBy;
    sortDirection ;
    search : search = new search();
    public companyName: string;
    public address: string;
    public country: string;
    public state: string;
    public zipCode: string;
     
}