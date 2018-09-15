export class Countries {
    id : number;
    name :string;
    value : number;
    text :string;
    constructor(){
        this.text = this.name;
        this.id = this.value;
    }
}