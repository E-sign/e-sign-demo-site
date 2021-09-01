import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-international-law',
  templateUrl: './international-law.component.html',
  styleUrls: ['./international-law.component.css']
})
export class InternationalLawComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  LogInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })


  onSubmit(){
    console.log('Submit')
  }
}
