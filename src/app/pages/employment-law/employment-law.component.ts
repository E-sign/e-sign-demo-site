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

  loadDocument = async () => {
    await this.clickToSignService.GetTemplate().subscribe((res: any) => {
      this.templateData = res
      this.documentImage = res.template.documents[0].upload_file.images[0].uri
      this.documentFields = res.template.documents[0].document_fields
      console.log(this.documentFields)
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
    this.SignerDetails.value.signature == ""
    ){
      return false
    } else {
      return true
    }
  }

  signDocument = async () =>{

    let bool = await this.validateFields()

    if(bool){
      console.log('all fields complete')
    } else {
      console.log('failed')
    }
    
    console.log(this.SignerDetails.value)
  }

  changeView(){
    this.displaySignature = !this.displaySignature
  }

  setSignature(event: any){
    this.SignerDetails.controls['signature'].setValue(event)
  }

}
