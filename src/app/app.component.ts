import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import {FormGroup, FormBuilder, Validators, Validator, AbstractControl} from '@angular/forms';

// Custom Validation code factory validation function

function ageValidator(min: number, max: number){

  return (control: AbstractControl):{[key: string]: boolean} | null => {

  if( control.value !==null && (isNaN(control.value) || control.value <min  || control.value> max)){
    return {'ageValidator': true}
  }
  return null;
};
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Formseries';
  customerForm: FormGroup;
  customer = new Customer();
  

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.customerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', Validators.required],
      age: [null, ageValidator(20, 70)]

    })

  }
  loadData(){
    this.customerForm.patchValue({
      firstname: "Nishu"
    })
  }



  save(){
    if (this.customerForm.valid) {
      console.log("Form valid ")
    }
    console.log(this.customerForm.value);
  }
}
