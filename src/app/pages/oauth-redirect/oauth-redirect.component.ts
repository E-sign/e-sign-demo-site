import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oauth-redirect',
  templateUrl: './oauth-redirect.component.html',
  styleUrls: ['./oauth-redirect.component.css']
})
export class OauthRedirectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  EsignLink: string = "https://app.e-sign.co.uk/#/authorize?client_id=vxze34ES4kq-ELbkNjHIZe-lA48TrRLoYjQ6KsMrDdE&response_type=code&redirect_uri=http:%2F%2Flocalhost:9000%2Finternational-law"
  TestingLink: string = "https://app.e-sign.co.uk/#/authorize?client_id=JPls8IZKvxxruBojgbGXPLiW3iYUBDqxZmPKSzu2-Co&response_type=code&redirect_uri=http:%2F%2Flocalhost:9000%2Foauth-demo"

  goToUrl(): void {
    window.location.href = this.TestingLink;
}
}
