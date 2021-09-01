import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employment-law',
  templateUrl: './employment-law.component.html',
  styleUrls: ['./employment-law.component.css']
})
export class EmploymentLawComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  currentPage: string = "status"
  numberOfDocsToSign: number = 0
  documentsToSign: any = ['test']

  openDocument(){
    console.log('click')
  }
}
