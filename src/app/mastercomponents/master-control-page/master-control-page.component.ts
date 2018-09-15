import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DropzoneConfig } from '../dropzone/dropzone.interfaces';

@Component({
  //selector: 'app-master-control-page',
  templateUrl: './master-control-page.component.html',
  styleUrls: ['./master-control-page.component.css']
})
export class MasterControlPageComponent implements OnInit {
 //public exampleData: Array<Select2OptionData>;
	person = {
		name: 'Venkat',
		email: '',
		gender: 'Male',
		address: 'Bagumpet, Hyderabad, Telangana - 500016',
		hobbies : null,
		switchval : null,
		age: 24,
		DOB: "11/20/2003",
		image:null,
		progress:10,
		skillset:[]
	}
	//master: any = {};
	//data: OptionData[] = [new OptionData(1, "Dev"), new OptionData(2, "Design")];
	//dropdownList = [];
   // selectedItems = [];
   // dropdownSettings = {};
	hobbylist = [{text: 'Reading', value: 1},
				{text: 'Writing', value: 2},
				{text: 'Listening to Music', value: 3},
				{text: 'Dancing', value: 4}
			];

	countries = [
       {value: "US", text: "United States"},
       {value: "AU", text: "Australia"},
       {value: "CA", text: "Canada"},
       {value: "BR", text: "Brazil"},
       {value: "ENG", text: "England"}
     ];
	 
	 select2options: any[] = ['Basic1', 'Basic2', 'Basic3', 'Basic4', 'Atlanta'];
  
  onSelect({id, text}){
    //alert(`id: ${id}, text: ${text}`);
  }

	statesWithFlags = [
  {'label': 'Alabama', 'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},
  {'label': 'Alaska', 'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'},
  {'label': 'Arizona', 'flag': '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},
  {'label': 'Arkansas', 'flag': '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'},
  {'label': 'California', 'flag': '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},
  {'label': 'Colorado', 'flag': '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},
  {'label': 'Connecticut', 'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},
  {'label': 'Delaware', 'flag': 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},
  {'label': 'Florida', 'flag': 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},
  {
    'label': 'Georgia',
    'flag': '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'
  },
  {'label': 'Hawaii', 'flag': 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'},
  {'label': 'Idaho', 'flag': 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'},
  {'label': 'Illinois', 'flag': '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'},
  {'label': 'Indiana', 'flag': 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'},
  {'label': 'Iowa', 'flag': 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'},
  {'label': 'Kansas', 'flag': 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},
  {'label': 'Kentucky', 'flag': '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'},
  {'label': 'Louisiana', 'flag': 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'},
  {'label': 'Maine', 'flag': '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},
  {'label': 'Maryland', 'flag': 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'},
  {'label': 'Massachusetts', 'flag': 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},
  {'label': 'Michigan', 'flag': 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'},
  {'label': 'Minnesota', 'flag': 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'},
  {'label': 'Mississippi', 'flag': '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'},
  {'label': 'Missouri', 'flag': '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'},
  {'label': 'Montana', 'flag': 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'},
  {'label': 'Nebraska', 'flag': '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'},
  {'label': 'Nevada', 'flag': 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'},
  {'label': 'New Hampshire', 'flag': '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},
  {'label': 'New Jersey', 'flag': '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},
  {'label': 'New Mexico', 'flag': 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'},
  {'label': 'New York', 'flag': '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'},
  {'label': 'North Carolina', 'flag': 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'},
  {'label': 'North Dakota', 'flag': 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'},
  {'label': 'Ohio', 'flag': '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'},
  {'label': 'Oklahoma', 'flag': '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'},
  {'label': 'Oregon', 'flag': 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'},
  {'label': 'Pennsylvania', 'flag': 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'},
  {'label': 'Rhode Island', 'flag': 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},
  {'label': 'South Carolina', 'flag': '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'},
  {'label': 'South Dakota', 'flag': '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'},
  {'label': 'Tennessee', 'flag': '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'},
  {'label': 'Texas', 'flag': 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'},
  {'label': 'Utah', 'flag': 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'},
  {'label': 'Vermont', 'flag': '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'},
  {'label': 'Virginia', 'flag': '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'},
  {'label': 'Washington', 'flag': '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'},
  {'label': 'West Virginia', 'flag': '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'},
  {'label': 'Wisconsin', 'flag': '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'},
  {'label': 'Wyoming', 'flag': 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}
];

progressBarData = [
			{color:'primary', value:'50%', text:'AngularJs'},
			{color:'success', value:'20%', text:'Angular2'},
			{color:'danger', value:'25%', text:'Angular4'}
 ];

    foodtype =[{text:'Veg',value:1},{text:'Non-Veg',value:2}];

	
	genderHelpText:string = 'Enter Gender';
	
	@ViewChild('f') myfrm;
	
	value = [];
	options = {};
	current;
  config : DropzoneConfig =  new DropzoneConfig();
  constructor() { }

  ngOnInit() {
    
    this.config.addRemoveLinks = true;
	  //this.myfrrm.form.markAsTouched();
	  //this.master.dropdown = '';
	  // this.exampleData = [
      // {
        // id: 'basic1',
        // text: 'Basic 1'
      // },
      // {
        // id: 'basic2',
        // disabled: true,
        // text: 'Basic 2'
      // },
      // {
        // id: 'basic3',
        // text: 'Basic 3'
      // },
      // {
        // id: 'basic4',
        // text: 'Basic 4'
      // }
    // ];
	this.value = ['multiple2', 'multiple4'];

    this.options = {
      multiple: true
    }

    this.current = this.value.join(' | ');
  }
  
  
  buttonClick(e){
	alert("Button Click Event");
	
	
  }
  
  cancelButtonClick(e){
	  this.myfrm.form.markAsUntouched();
  }
  
  cancelAllButtonClick(e){
	  this.person.skillset = ['Basic1','Basic2'];
	  this.myfrm.form.markAsUntouched();
	  
	  
	  for (let key of Object.keys(this.myfrm.form.controls)){
		this.myfrm.form.get(key).markAsUntouched();
		this.myfrm.form.get(key).updateValueAndValidity();
	  }
  }
  
  receiveEvent(event) {
	alert(event.target.value);
  }
  
  DOBClick(e){
	//this.person.DOB = "11/29/2017";
  }	  
  
  SubmitForm(f: NgForm){
	
	f.form.markAsTouched();
	if(f.valid){
      alert('validation pass');
    }
	return false;
  }
  changed(data: {value: string[]}) {
    this.current = data.value.join(' | ');
  }

  fileuploadsuccess(e)
  {
    
    //console.log(e);
    this.person.image = e;
    console.log(this.person.image);
  }
}
