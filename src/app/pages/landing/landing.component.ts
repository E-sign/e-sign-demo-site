import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  EsignLink: string = "https://app.e-sign.co.uk/#/authorize?client_id=vxze34ES4kq-ELbkNjHIZe-lA48TrRLoYjQ6KsMrDdE&response_type=code&redirect_uri=http:%2F%2Flocalhost:9000%2Finternational-law"
  TestingLink: string = "https://app.e-sign.co.uk/#/authorize?client_id=JPls8IZKvxxruBojgbGXPLiW3iYUBDqxZmPKSzu2&response_type=code&redirect_uri=https://localhost:9000/oauth-demo"

  goToUrl(): void {
    window.location.href = this.TestingLink;
}
}
