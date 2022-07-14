import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(
    private http: HttpClient,
  ) { }

  oAuthData: any = {
    id: "83aec176-c469-4c21-ab3e-ddd8a0f64679",
    name: "E-Law-Direct Demo",
    redirect_uri: "https://e-sign.github.io/e-sign-demo-site/international-law",
    client_id: "vxze34ES4kq-ELbkNjHIZe-lA48TrRLoYjQ6KsMrDdE",
    client_secret: "ykIywcId71MaVwMINeVM3P2NvvTXHrPG67SAZcUd2os",
    api_key: environment.apiKey
  }

  testOAuthData: any =  {
    id: "0b3df1e6-3f98-4662-a249-a36a7f591704",
  name: "Oauth testing",
  redirect_uri: "http://localhost:9000/oauth-demo",
  client_id: "JPls8IZKvxxruBojgbGXPLiW3iYUBDqxZmPKSzu2-Co",
  client_secret: "pywUcJFaSrlcvH0Sfhch_9JscTNQfkAYxNLbY7yOQPM",
  }

  ROOT_URL: string = "https://api.e-sign.co.uk/v3"


  // Authorize(body: any){
  //   return this.http.post<any>(this.ROOT_URL + '/oauth​/authorize', body)
  // }

  GetToken(code: string){

    let body = {
      grant_type: "authorization_code",
      redirect_uri: this.testOAuthData.redirect_uri,
      client_id: this.testOAuthData.client_id,
      client_secret: this.testOAuthData.client_secret,
      code: code as string,
    }

    return this.http.post<any>(this.ROOT_URL + '/oauth/token', body)
  }

  // =======================
  // == GET ALL DOCUMENTS ==
  // =======================

  GetAllDocuments(token: string){
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<any>(this.ROOT_URL + `/uploads/list/documents?page=1&per_page=9`, {headers})
  }

  // ==============
  // == GET USER ==
  // ==============

  // uses ID
  GetUser(token: string){
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<any>(this.ROOT_URL + '/accounts', {headers})
  }

}

