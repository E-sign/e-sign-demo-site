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
    let obj = {
      name: this.SignerDetails.value.name,
      email: this.SignerDetails.value.email
    }
    this.WorkFlow.value.signers.push(obj)
    this.SignerDetails.reset()
    console.log(this.WorkFlow.value.signers)
  }

  checkFormFields(){
    if(this.WorkFlow.value.document.title != {} 
      && this.WorkFlow.value.signers.length >= 1){
        console.log('passed')
        this.changePage()
      } else {
        console.log('error')
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
