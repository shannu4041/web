export class languageModel {
    id:number;
    lang_key: string;
    menu_id: number;
    lang_words:languageValueModel[];
    constructor() {
        this.lang_key = null;
        this.menu_id = null;
        this.lang_key = null;
        this.lang_words = Array<languageValueModel>();
    }
}

export class languageValueModel {
    id:number;
    language_id: number;
    language_name: string;
    lang_value:string;
    constructor() {
        this.id = null;
        this.language_id = null;
        this.language_name = null;
        this.lang_value = null;
    }
}