export class Result
{
    success:boolean;
    data?:any;
    message:string;
    totalrecords?:number;
    constructor()
    {
        this.success = false; 
        this.message = null;
    }

}
