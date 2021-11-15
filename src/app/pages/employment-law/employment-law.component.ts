import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClickToSignService } from "../../services/click-to-sign.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-employment-law',
  templateUrl: './employment-law.component.html',
  styleUrls: ['./employment-law.component.css']
})
export class EmploymentLawComponent implements OnInit {

  constructor(
    private clickToSignService: ClickToSignService
  ) { }

  ngOnInit(): void {
    this.loadDocument()
  }

  displaySignature: boolean = true
  currentPage: string = "status"
  templateData: any;
  documentImage: any;
  documentFields: any;
  signatureSet: boolean = false;
  signatureData: any;
  signatureMethod: any;
  envelopeCompleted: boolean = false;
  hideButton: boolean = false;
  hideSpinner: boolean = true;
  loadingDocument:boolean = false;


  errorText: string = ""
  errorHidden: boolean = true

  toSignFields: any;

  envelopeData: any = {
    envelope: {
      title: "Contract Signing Pack",
      subject: "You have a envelope to sign",
      description: "Please sign the documents",
      language: "english",
      signer_redirect_uri: null,
      documents: [
      ],
      signers: [],
      envelope_options: {
        dont_send_signing_emails: true,
        sign_in_sequential_order: false,
        days_envelope_expires: "10"
      },
      carbon_copies: [ ],
      tags: [
        {
          name: "contracts"
        }
      ]
    }
  }


  loadDocument = async () => {
    await this.clickToSignService.GetTemplate().subscribe((res: any) => {
      this.templateData = res
      this.documentImage = res.template.documents[0].upload_file.images[0].uri
      this.documentFields = res.template.documents[0].document_fields
      return res
    })
  }

  openDocument(){
    this.currentPage = "sign"
  }

  goBack(){
    this.currentPage = "status"
  }

  SignerDetails = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    signature: new FormControl('')
  })

  validateFields(){
    if(this.SignerDetails.value.name == "" ||
    this.SignerDetails.value.email == "" ||
    this.signatureData == ""
    ){
      return false
    } else {
      this.errorHidden = true
      return true
    }
  }

  signDocument = async () =>{
    this.hideSpinner = false
    this.loadingDocument = true
    this.hideButton = true
    let bool = await this.validateFields()
    if(bool){

      let document: any = {
        title: this.templateData.template.documents[0].title,
        upload_file: {
          id: this.templateData.template.documents[0].id
        },
        attachment_files: [],
        document_fields: [],
        carbon_copies: []
      }

      for (let i = 0; i < this.templateData.template.documents[0].document_fields.length; i++){
        let fieldData: any = {
          signer_email: this.SignerDetails.value.email,
          signer_idx: "0",
          field_type: this.templateData.template.documents[0].document_fields[i].field_type,
          field_required: true,
          field_placeholder: this.templateData.template.documents[0].document_fields[i].field_placeholder,
          field_amount: this.templateData.template.documents[0].document_fields[i].field_amount,
          field_value: this.templateData.template.documents[0].document_fields[i].field_value,
          field_dropdown_options: null,
          document_position: this.templateData.template.documents[0].document_fields[i].document_position
        }
        document.document_fields.push(fieldData)
      }

      let signer = {
          name: this.SignerDetails.value.name,
          email: this.SignerDetails.value.email,
          document_authentication: {
            country_code: "44",
            phone: "12345678910",
            passcode: "test"
          },
          signer_options: {
            auto_reminder_frequency: 7,
            id_check_required: false
          },
          signer_details: {
            primary_sequential_email: this.SignerDetails.value.email
          }
        }

      this.envelopeData.envelope.documents.push(document)
      this.envelopeData.envelope.signers.push(signer)

      this.clickToSignService.CreateEnvelope(this.envelopeData).subscribe(res => {
        this.toSignFields = res.envelope.documents[0].document_fields
        this.sendSignReq(res.envelope.documents[0].id, res.envelope.signers[0].id)
      })

    } else {
      console.log('failed')
      this.errorText = "There was an error with the fields, make sure they have all been completed correctly"
      this.errorHidden = false
      this.hideSpinner = true
      this.loadingDocument = false
      this.hideButton = false
    }
    
  }

  detectedOS = "Unknown OS";
  getUserOS(){
    if (navigator.appVersion.indexOf("Mac") != -1){ 
        return "MacOS";
    } else if (navigator.appVersion.indexOf("Win") != -1){
      return "Windows";
    } else if (navigator.appVersion.indexOf("Linux") != -1) {
      return "Linux";
    } else {
      return "other"
    }


  }

  sendSignReq(docId: string, signerId: string){
    let data: any = {
      sign: {
        agree: "confirm",
        system: {
          operating_system: this.detectedOS,
          browser: "chrome",
          browser_version: "17.3",
          remote_ip: "0.0.0.0"
        },
        field_values: [],
        passcode: "test"
      }
    }

    for (let i = 0; i < this.toSignFields.length; i++){
      let fieldValue: any = {}
      fieldValue.field_id = this.toSignFields[i].id
      if(this.toSignFields[i].field_type == "signature"){
        fieldValue.field_value = "1"
      } else if (this.toSignFields[i].field_placeholder == "Name"){
        fieldValue.field_value = this.SignerDetails.value.name
      } else if (this.toSignFields[i].field_placeholder == "Email"){
        fieldValue.field_value = this.SignerDetails.value.email
      } else {
        console.log('error')
      }
      data.sign.field_values.push(fieldValue)
    }

    if(data.sign.field_values.length == 3){
      
      this.clickToSignService.SignDocument(signerId, docId, data).subscribe(res => {
        console.log(res)
        console.log(res.status)

        if(res.status == 200){
          this.envelopeCompleted = true;
          this.currentPage = 'complete'
        } else {
          this.currentPage = 'failed'
        }
      })
    } else {
      console.log('error', data.sign.field_values.length)
    }
  }

  changeView(){
    this.displaySignature = !this.displaySignature
  }

  // setSignature(event: any){
  //   this.SignerDetails.controls['signature'].setValue(event)
  //   this.signatureData = event.data
  //   this.signatureMethod = event.method
  //   console.log(event)
  //   this.signatureSet = true
    
  // }

  setSignature(event: any){
    this.signatureData = event.target.value
    this.signatureSet = true
  }

  refresh(){
    window.location.reload();
  }

}
