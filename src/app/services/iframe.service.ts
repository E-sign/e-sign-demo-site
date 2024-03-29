import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IframeService {

  constructor(
    private http: HttpClient,
  ) { }

  ROOT_URL: string = 'https://sandbox.e-sign.co.uk/v3/envelopes/redirect'

  oAuthData: any = {
    id: "83aec176-c469-4c21-ab3e-ddd8a0f64679",
    name: "E-Law-Direct Demo",
    redirect_uri: "http://localhost:9000/international-law",
    client_id: "vxze34ES4kq-ELbkNjHIZe-lA48TrRLoYjQ6KsMrDdE",
    client_secret: "ykIywcId71MaVwMINeVM3P2NvvTXHrPG67SAZcUd2os",
    api_key: environment.apiKey
  }

  UploadDocuments(body: any){
    let headers = new HttpHeaders().set('Authorization', `Token ${this.oAuthData.api_key}`)
    return this.http.post<any>('https://sandbox.e-sign.co.uk/v3/uploads', body, {
      headers, 
      reportProgress: true,
      observe: 'events',
    })
  }

  getMostRecentDocument(){
    let headers = new HttpHeaders().set('Authorization', `Token ${this.oAuthData.api_key}`)
    return this.http.get<any>('https://sandbox.e-sign.co.uk/v3/uploads/list/documents?page=1&per_page=1', {headers}).toPromise()
  }

  UploadDocumentsResponse(body: any){
    let headers = new HttpHeaders().set('Authorization', `Token ${this.oAuthData.api_key}`)
    return this.http.post<any>('https://sandbox.e-sign.co.uk/v3/uploads', body, {
      headers})
  }

  GetLink(body: any){
    let headers = new HttpHeaders().set('Authorization', `Token ${this.oAuthData.api_key}`)
    return this.http.post<any>(this.ROOT_URL, body, {headers})
  }
} 
