import { OauthService } from './../../services/oauth.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-international-law',
  templateUrl: './international-law.component.html',
  styleUrls: ['./international-law.component.css']
})
export class InternationalLawComponent implements OnInit {

  constructor(
    private oAuthService: OauthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUrlParamData()
  }

  EsignLink: string = "https://app.e-sign.co.uk/#/authorize?client_id=vxze34ES4kq-ELbkNjHIZe-lA48TrRLoYjQ6KsMrDdE&response_type=code&redirect_uri=https:%2F%2F/demo.e-sign.co.uk%2Foauth-demo"
  urlCode: string = "";
  token: string = "";

  pageNumber: number = 1;
  totalPages: number = 0;
  searchDate: any;
  displayDate: any;

  localUserData: any;
  localDocumentData: any = {
    files: []
  };
  loaded: boolean = false
  dataPresent: boolean = false

  getUrlParamData(){
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      this.urlCode = urlParams.get('code') as string
      this.getBearerToken()
    } catch (error) {
      this.router.navigate(['/oauth-redirect'])
    }
   
  }

  getBearerToken =  () => {
    console.log('here')
    try {
       this.oAuthService.GetToken(this.urlCode).subscribe(res => {
        this.token = res.access_token
        this.getUserData()
      },err => {
        this.router.navigate(['oauth-redirect'])
      })
    } catch (error) {
      this.router.navigate(['oauth-redirect'])
    }
  }

   getUserData(){
     this.oAuthService.GetUser(this.token).subscribe(res => {
      this.localUserData = res
      console.log(res)
      this.searchForAllDocuments()
    })
  }

   searchForAllDocuments(){
    let pageNumString = this.pageNumber.toString()
     this.oAuthService.GetAllDocuments(this.token).subscribe(res =>{
      this.localDocumentData = res
      this.loaded = true
      console.log(this.localDocumentData)
      // Check if anything is actually returned
      if(this.localDocumentData.files.length == 0){
        this.dataPresent = false;
      }else{
        this.dataPresent = true;
      }

      // Set Total Pages
      this.totalPages = res.pagination.total_pages
    })
  }





}
