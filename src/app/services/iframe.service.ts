import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class IframeService {

  constructor(
    private http: HttpClient,
  ) { }

  ROOT_URL: string = 'https://api.e-sign.co.uk/v3/envelopes/redirect'

  oAuthData: any = {
    id: "83aec176-c469-4c21-ab3e-ddd8a0f64679",
    name: "E-Law-Direct Demo",
    redirect_uri: "https://e-law-direct.com/redirect",
    client_id: "vxze34ES4kq-ELbkNjHIZe-lA48TrRLoYjQ6KsMrDdE",
    client_secret: "ykIywcId71MaVwMINeVM3P2NvvTXHrPG67SAZcUd2os",
    api_key: "demo7820"
  }

  GetLink(body: any){
    let headers = new HttpHeaders().set('Authorization', `Token ${this.oAuthData.api_key}`)
    return this.http.post<any>(this.ROOT_URL, body, {headers})
  }
} 
