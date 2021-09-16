import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";


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
    redirect_uri: "http://localhost:9000/international-law",
    client_id: "vxze34ES4kq-ELbkNjHIZe-lA48TrRLoYjQ6KsMrDdE",
    client_secret: "ykIywcId71MaVwMINeVM3P2NvvTXHrPG67SAZcUd2os",
    api_key: "demo7820"
  }

  ROOT_URL: string = "https://api.e-sign.co.uk/v3​"


  Authorize(body: any){
    return this.http.post<any>(this.ROOT_URL + '/oauth​/authorize', body)
  }

  GetToken(body: any){
    return this.http.post<any>(this.ROOT_URL + '/oauth​/token', body)
  }

}

