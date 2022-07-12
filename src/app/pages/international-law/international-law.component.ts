import { OauthService } from './../../services/oauth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-international-law',
  templateUrl: './international-law.component.html',
  styleUrls: ['./international-law.component.css']
})
export class InternationalLawComponent implements OnInit {

  constructor(
    private oAuthService: OauthService
  ) { }

  ngOnInit(): void {
    this.getUrlParamData()
  }

  EsignLink: string = "https://app.e-sign.co.uk/#/authorize?client_id=vxze34ES4kq-ELbkNjHIZe-lA48TrRLoYjQ6Ks[…]pe=code&redirect_uri=http://localhost:9000/international-law"
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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.urlCode = urlParams.get('code') as string
    this.getBearerToken()
  }

  getBearerToken = async () => {
    await this.oAuthService.GetToken(this.urlCode).subscribe(res => {
      this.token = res.access_token
      this.getUserData()
    })
  }

  async getUserData(){
    await this.oAuthService.GetUser(this.token).subscribe(res => {
      this.localUserData = res
      console.log(res)
      this.searchForAllDocuments()
    })
  }

  async searchForAllDocuments(){
    let pageNumString = this.pageNumber.toString()
    await this.oAuthService.GetAllDocuments(pageNumString, '24', '', '', this.token).subscribe(res =>{
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
