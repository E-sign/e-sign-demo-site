import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { HttpEvent, HttpEventType } from "@angular/common/http";

import { Base64Service } from "../../services/base64.service";
import { IframeService } from "../../services/iframe.service";

import { SignerData } from "./signer-data";
import { DocumentData } from "./document-data";

@Component({
  selector: 'app-corprate-law',
  templateUrl: './corprate-law.component.html',
  styleUrls: ['./corprate-law.component.css']
})
export class CorprateLawComponent implements OnInit {
  constructor(
    private base64Service: Base64Service,
    private iframeservice: IframeService
  ) { }

  ngOnInit(): void {
  }

  currentPage: string = 'form'
  formNotComplete: boolean = true;

  errorText: string = ''

  fileType: any;
  fileRawData: any;
  fileName: any;

  iframeUrl: any;

  uploadDocArray: any = [];
  progress: number = 0;
  hideSpinner: boolean = true
  loadingDocument: boolean = false;
  documentUploaded: boolean = false;

  envelopeData: any = {
    envelope: {
      title: "string",
      subject: "You have a document to sign!",
      description: "Please sign the following document",
      language: "english",
      signer_redirect_url: "string",
      documents: [],
      signers: [],
      envelope_options: {
        dont_send_signing_emails: false,
        sign_in_seqential_order: false,
        days_envelope_expires: 10
      },
      carbon_copies: [],
      tags: [
        { name: "contracts" }
      ],
      redirect_url: 'http://localhost:55650/corporate-law'
    }
  }
  


  WorkFlow = new FormGroup({
    document: new FormControl({}),
    signers: new FormControl([])
  })

  SignerDetails = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  })

  onFileSelected = async (e: any) => {
    
    let file = e.target.files[0]
    if (file) {
      this.fileType = file.type;
      let data: string = await this.base64Service.getBase64(file) as string
      let dataArr = data.split("base64,")
      this.fileRawData = dataArr[1]
      let arr = file.name.split('.')
      this.fileName = arr[0]
      let obj = {
        "title": this.fileName,
        "base64": this.fileRawData,
        "extension": arr[1],
        "type": "document" 
      }
      this.uploadDocArray.push(obj)
      await this.makeReq()
    }else{
      console.log("error")
    }
  }

  async makeReq(){
    let body = { "uploads": this.uploadDocArray }
    this.loadingDocument = true
    this.hideSpinner = false
    await this.iframeservice.UploadDocuments(body).subscribe((event: HttpEvent<any>) => {
      console.log(event)
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
          case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total! * 98);
          break;
        case HttpEventType.Response:
          console.log('Document successfully uploaded!', event.body);
          console.log(event.status)
          this.progress = 100;
          this.loadingDocument = false;
          this.documentUploaded = true;

          if(event.body.uploads[0].id == undefined){
            alert('error with document upload, please refresh page')
          }

          let documentData: DocumentData = {
            title: event.body.uploads[0].title,
            upload_file: {
              id: event.body.uploads[0].id
            },
            attachment_files: [],
            carbon_copies: []
          }

          let docArray = []
          docArray.push(documentData)
          this.envelopeData.envelope.documents = docArray
          this.envelopeData.envelope.title = event.body.uploads[0].title
          setTimeout(() => {
            this.documentUploaded = false;
            this.hideSpinner = true
          }, 3000);
        }
      })
    }

  onAddSigner(){ 
    if(this.SignerDetails.value.name != "" && this.SignerDetails.value.email != "" && this.SignerDetails.value.name != null && this.SignerDetails.value.email != null){
      this.errorText == ""
      let obj: SignerData = {
        name: this.SignerDetails.value.name,
        email: this.SignerDetails.value.email,
        document_authentication: {
          country_code: "44",
          phone: "12345678910",
          passcode: "test"
      },
        signer_options: {
          auto_reminder_frequncy: 7,
          id_check_required: false
      },
        signer_details: {
          primary_sequential_email: this.SignerDetails.value.email
        }
      }
      this.WorkFlow.value.signers.push(obj)
      this.SignerDetails.reset()
      console.log(this.WorkFlow.value.signers)
    } else if(this.SignerDetails.value.name == "" && this.SignerDetails.value.email == ""){
      this.errorText = "Please add the signers name and email"
    } else if (this.SignerDetails.value.name == ""){
      this.errorText = "Please add the signers name"
    } else if (this.SignerDetails.value.email == ""){
      this.errorText = "Please add the signers email"
    } else {
      this.errorText = "Unknown error adding signer"
    }
  }

  checkFormFields(){
    if(this.WorkFlow.value.document != {} 
      && this.WorkFlow.value.signers.length >= 1){
        this.envelopeData.envelope.signers = this.WorkFlow.value.signers
        console.log(this.envelopeData)
        this.iframeservice.GetLink(this.envelopeData).subscribe(res => {
          console.log(res)
          let url = res.redirect_url
          let noProtocol = url.replace(/^https?\:\/\//i, "");
          console.log(noProtocol)
          this.iframeUrl = res.redirect_url
        })
        this.changePage()
      } else {
        if(this.WorkFlow.value.document.title == undefined
          && this.WorkFlow.value.signers.length == 0){
            this.errorText = "Please select a document to sign and add at least one signer"
        } else if(this.WorkFlow.value.document.title == undefined){
          this.errorText = "Please select a document to sign"
        } else if (this.WorkFlow.value.signers.length == 0){
          this.errorText = "Please add at least one signer"
        } else {
          this.errorText = "Unknown Error"
        }
      }
  }


  changePage(){
    if(this.currentPage == 'form'){
      this.currentPage = 'iframe'
    } else if (this.currentPage == 'iframe'){
      this.currentPage = 'form'
    }
  }
}
