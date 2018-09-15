import { DirectorsModal } from "../accounts/directors.modal";
import { CompaniesModal } from "../add-queue/companies.model";

/* AcountModal Begin */
export class AccountModal {
	filepath:string;
	user_id:number;
	emp_code:string;
	constructor()
	{
	this.filepath = null;
	this.user_id = null;
	this.emp_code = null;
	}
	}
	/* AcountModal Completed */


	/* CGIModal Begin */
	export class CGIModal {
		id?:number;
		cgid?:string;
		customer_full_name?:string;
		FileName?:string;
		is_email_search_processed?:number;
		is_tc_processed?:number;
	constructor()
	{
	this.id = null;
	this.cgid = null;	
	this.customer_full_name = null;
	this.FileName = null
	this.is_email_search_processed = null;
	this.is_tc_processed = null;
	}
  }
  /* CGIModal Completed */
  
  /* ProbeModal Begin */
  
  export class ProbeModal{
	id?:number;
	input_id?:number;
	company?:string;
	address?:string;
	email?:string;
	directors:DirectorsModal[];
	constructor(){
		this.id = null;
		this.input_id = null;
		this.company = null;
		this.address = null;
		this.email = null;
		this.directors = Array<DirectorsModal>();
	}
  }

  export class TruecallerModal{
	id?:number;
	cgid?:number;
	source?:string;
	source_input?:string;
	input?:string;
	name?:string;
	accuracy?:string;
	tag?:string;
	provider?:string;
	email?:string;
	address?:string;
	verified?:string;
	status?:string;
	last_execution_time?:string;
	naukriid?:number;
	phone_number?:string;
	last_accessed?:string;
	last_modified?:string;
	in_verified?:string;

	constructor(){
		this.id = null;
		this.cgid = null;
		this.source = null;
		this.source_input = null;
		this.input = null;
		this.name = null;
		this.accuracy = null;
		this.tag = null;
		this.provider = null;
		this.email = null;
		this.verified = null;
		this.status = null;
		this.last_execution_time = null;
		this.naukriid = null;
		this.phone_number = null;
		this.last_accessed = null;
		this.last_modified = null;
		this.in_verified = null;
		
	}
  }


  export class GoogleModal{
	id?:number;
	cgid?:number;
	source?:string;
	source_input?:string;
	input?:string;
	status?:string;
	last_execution_time?:string;
	google_search_output?:string;

	constructor(){
		this.id = null;
		this.cgid = null;
		this.source = null;
		this.source_input = null;
		this.input = null;
		this.status = null;
		this.last_execution_time = null;
		this.google_search_output = null;
		
	}
  }

  export class NaukriModal{
	id?:number;
	cgid?:number;
	source?:string;
	source_input?:string;
	input?:string;
	status?:string;
	last_execution_time?:string;

	constructor(){
		this.id = null;
		this.cgid = null;
		this.source = null;
		this.source_input = null;
		this.input = null;
		this.status = null;
		this.last_execution_time = null;
		
	}
  }


  //Queues Page model
  export class ProbedataModal{
	id?:number;
	cgid?:number;
	source?:string;
	source_input?:string;
	input?:string;
	customer_full_name?:string;
	father_name?:string;
	mother_maiden_name?:string;
	spouse_name?:string;
	city?:string;
	state?:string;
	pin?:string;
	din?:string;
	dob?:string;
	address?:string;
	email?:string;
	screenshot?:string;
	last_execution_time?:string;
	status?:string;
	companies:CompaniesModal[];
	constructor(){
		this.id = null;
		this.screenshot = null;
		this.cgid = null;
		this.address = null;
		this.email = null;
		this.source = null;
		this.source_input = null;
		this.input = null;
		this.customer_full_name = null;
		this.father_name = null;
		this.mother_maiden_name = null;
		this.spouse_name = null;
		this.city = null;
		this.state = null;
		this.pin = null;
		this.din = null;
		this.dob = null;
		this.last_execution_time = null;
		this.status = null;
		this.companies = Array<CompaniesModal>();
	}
  }

  export class InputDetails{
	ID?:number;
	uploadid?:number;
	cgid?:string;
	city?:string;
	state?:string;
	pin?:number;
	customer_full_name?:string;
	dob?:string;
	mother_maiden_name?:string
	father_name?:string;
	spouse_name?:string;
	employer_name?:string;
	pan_nbr?:string;
	email_id?:string;
	aadhar_nbr?:string;
	drivers_license_no?: string;
	passport_no?:string;
	voter_id_no?:string;
	food_card_or_ration_no?:string;
	customer_profile?:string;
	additional_details?:string;
	email1?:string;
	email2?:string;
	email3?:string;
	email4?:string;
	mobile1?:number;
	mobile2?:number;
	mobile3?:number;
	mobile4?:number;
	mobile5?:number;
	mobile6?:number;
	mobile7?:number;
	mobile8?:number;
	mobile9?:number;
	address1?:string;
	address2?:string;
	address3?:string;
	address4?:string;
	tc_execution?:number;
	google_execution?:number;
	probe_execution?:number;
	naukri_execution?:number;
	status?:string;
	robot_id?:number;
	naukri_robot_id?:number;
	is_seperated?:number

	constructor(){
	this.ID = null;
	this.uploadid = null;
	this.cgid = null;
	this.city = null;
	this.state = null;
	this.pin = null;
	this.customer_full_name = null;
	this.dob = null;
	this.mother_maiden_name = null;
	this.father_name = null;
	this.spouse_name = null;
	this.employer_name = null;
	this.pan_nbr = null;
	this.email_id = null;
	this.aadhar_nbr = null;
	this.drivers_license_no = null;
	this.passport_no = null;
	this.voter_id_no = null;
	this.food_card_or_ration_no = null;
	this.customer_profile = null;
	this.additional_details = null;
	this.email1 = null;
	this.email2 = null;
	this.email3 = null;
	this.email4 = null;
	this.mobile1 = null;
	this.mobile2 = null;
	this.mobile3 = null;
	this.mobile4 = null;
	this.mobile5 = null;
	this.mobile6 = null;
	this.mobile7 = null;
	this.mobile8 = null;
	this.mobile9 = null;
	this.address1 = null;
	this.address2 = null;
	this.address3 = null;
	this.address4 = null;
	this.tc_execution = null;
	this.google_execution = null;
	this.probe_execution = null;
	this.naukri_execution = null;
	this.status = null;
	this.robot_id = null;
	this.naukri_robot_id = null;
	this.is_seperated = null;

	}
  }