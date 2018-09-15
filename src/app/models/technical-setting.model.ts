export class TechnicalSettingsModel {
    smtp_host : string;
    smtp_port : number;
    smtp_username : string;
    smtp_password : string;
    map_api_key : string;
    fcm_android_key : string;
    ios_fcm_key : string;
    ios_pem_file : string;

    constructor(){
        this.smtp_host = null;
        this.smtp_port = null;
        this.smtp_username = null;
        this.smtp_password = null;
        this.map_api_key = null;
        this.fcm_android_key = null;
        this.ios_fcm_key = null;
        this.ios_pem_file = null;
    }
}

//smtp_host, smtp_port, smtp_username, smtp_password, map_api_key, fcm_android_key, ios_fcm_key, ios_pem_file

//{"smtp_host":"smtp.gmail.com","smtp_port":"465","smtp_username":"htsol756@gmail.com","smtp_password":"tvrk2256",
//"map_api_key":"sajdweyuuyewfjhewjfweu","fcm_android_key":"dkjewuewuuyewewfew","ios_fcm_key":"jewjhfewjhfjewjhfe",
//"ios_pem_file":null}