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

  ROOT_URL: string = "https://api.e-sign.co.uk/v3"


  // Authorize(body: any){
  //   return this.http.post<any>(this.ROOT_URL + '/oauth​/authorize', body)
  // }

  GetToken(code: string){

    let body = {
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:9000/international-law",
      client_id: "vxze34ES4kq-ELbkNjHIZe-lA48TrRLoYjQ6KsMrDdE",
      client_secret: "ykIywcId71MaVwMINeVM3P2NvvTXHrPG67SAZcUd2os",
      code: code as string,
    }

    return this.http.post<any>(this.ROOT_URL + '/oauth/token', body)
  }

  // =======================
  // == GET ALL DOCUMENTS ==
  // =======================

  GetAllDocuments(page: string, per_page: string, date: string, search: string, token: string){
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    if(date == '' && search == ''){
      return this.http.get<any>(this.ROOT_URL + `/uploads/list/documents?page=${page}&per_page=${per_page}`, {headers})
    } else if (date != "" && search == ""){
      return this.http.get<any>(this.ROOT_URL + `/uploads/list/documents?page=${page}&per_page=${per_page}&date=${date}`, {headers}) 
    } else if (date == "" && search != "") {
      return this.http.get<any>(this.ROOT_URL + `/uploads/list/documents?page=${page}&per_page=${per_page}&search=${search}`, {headers}) 
    } else {
      return this.http.get<any>(this.ROOT_URL + `/uploads/list/documents?page=${page}&per_page=${per_page}&date=${date}&search=${search}`, {headers}) 
    }

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

