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

  data = {
    "oauth_app": {
      "id": "9313a4ec-9757-445e-bca4-2137aea70dd7",
      "name": "Demo site",
      "redirect_uri": "https://demo.e-sign.co.uk/oauth-demo",
      "client_id": "rw6oytr-q7kiWRrA5KszUp0oITiaYs6YJmS02ECCKjA",
      "client_secret": "mqwATuMRJxHcRbidVcdC4i-TECK37ua1SB5rlRbpKtM",
      "scopes": [
        "read_write"
      ]
    },
    "links": []
  }


  EsignLink: string = "https://app.e-sign.co.uk/#/authorize?client_id=vxze34ES4kq-ELbkNjHIZe-lA48TrRLoYjQ6KsMrDdE&response_type=code&redirect_uri=https:%2F%2F/demo.e-sign.co.uk%2Foauth-demo"
  TestingLink: string = "https://app.e-sign.co.uk/#/authorize?client_id=JPls8IZKvxxruBojgbGXPLiW3iYUBDqxZmPKSzu2-Co&response_type=code&redirect_uri=http:%2F%2Flocalhost:9000%2Foauth-demo"

  goToUrl(): void {
    window.location.href = this.EsignLink;
}
}
