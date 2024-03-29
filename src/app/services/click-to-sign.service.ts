import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClickToSignService {

  constructor(
    private http: HttpClient,
  ) { }

  ROOT_URL: string = 'https://api.e-sign.co.uk/v3'

  oAuthData: any = {
    id: "83aec176-c469-4c21-ab3e-ddd8a0f64679",
    name: "E-Law-Direct Demo",
    redirect_uri: "http://localhost:9000/international-law",
    client_id: "vxze34ES4kq-ELbkNjHIZe-lA48TrRLoYjQ6KsMrDdE",
    client_secret: "ykIywcId71MaVwMINeVM3P2NvvTXHrPG67SAZcUd2os",
    api_key: environment.apiKey
  }

  templateID: string = "0JtBeGBlsqsxomnxTHqXRFMtKvcVPQ";
  // templateID: string = "3aefbba2-4dbc-4044-b160-f492ca2915c3";

  GetTemplate(){
    let headers = new HttpHeaders().set('Authorization', `Token ${this.oAuthData.api_key}`)
    return this.http.get<any>(this.ROOT_URL + `/templates/${this.templateID}`, {headers})
  }

  CreateEnvelope(data: any){
    let headers = new HttpHeaders().set('Authorization', `Token ${this.oAuthData.api_key}`)
    return this.http.post<any>(this.ROOT_URL + '/envelopes', data, {headers})
  }

  SignDocument(signerID: string, documentID: string, data: any){
    let headers = new HttpHeaders().set('Authorization', `Token ${this.oAuthData.api_key}`)
    return this.http.post<any>(this.ROOT_URL + `/signers/${signerID}/documents/${documentID}`, data, {headers, observe: 'response'})
  }


}
