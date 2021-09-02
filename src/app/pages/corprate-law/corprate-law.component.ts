import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Base64Service } from "../../services/base64.service";

@Component({
  selector: 'app-corprate-law',
  templateUrl: './corprate-law.component.html',
  styleUrls: ['./corprate-law.component.css']
})
export class CorprateLawComponent implements OnInit {
  constructor(
    private base64Service: Base64Service
  ) { }

  ngOnInit(): void {
  }

  currentPage: string = 'form'
  formNotComplete: boolean = true;

  errorText: string = ''

  fileType: any;
  fileRawData: any;
  fileName: any;

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
      console.log(this.fileName)
      let obj = {
        "title": this.fileName,
        "base64": this.fileRawData,
        "extension": arr[1],
        "type": "document" 
      }
      this.WorkFlow.value.document = obj

    }else{
      console.log("error")
    }
  }

  onAddSigner(){ 
    if(this.SignerDetails.value.name != "" && this.SignerDetails.value.email != "" && this.SignerDetails.value.name != null && this.SignerDetails.value.email != null){
      this.errorText == ""
      let obj = {
        name: this.SignerDetails.value.name,
        email: this.SignerDetails.value.email
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
        console.log('passed')
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
