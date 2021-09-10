import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SignaturePad } from "./SignatureControl/signature_pad";
import { FormGroup, FormControl } from "@angular/forms";
import { Base64Service } from "../../services/base64.service";

@Component({
  selector: 'app-signature-modal',
  templateUrl: './signature-modal.component.html',
  styleUrls: ['./signature-modal.component.css']
})
export class SignatureModalComponent implements OnInit {

  @Output() viewEvent = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<boolean>();

  closeView() {
    this.viewEvent.emit(false);
  }


  signaturePad: any;
  method: string = 'type';

  draw: boolean = true;
  upload: boolean = true;
  type: boolean = false;
  uploadPreview: any;

  localeDate = new Date().toLocaleString();

  constructor( 
    private base64Service: Base64Service,
   ) {
    
  }
  
  ngOnInit(): void {
  }

  TypeSignatureForm = new FormGroup({
    input: new FormControl('')
  })


  setCanvas(){
    let canvas = document.getElementById('signaturePadCanvas') as HTMLCanvasElement
    this.signaturePad = new SignaturePad(canvas, {
      minWidth: 1,
      maxWidth: 3,
      throttle: 5,
      minDistance: 2,
      velocityFilterWeight: 0.5,
    });
    
  }

  selectMethod(option:string){
    if(option == 'type'){
      this.type = false
      this.draw = true
     } else if (option == 'draw'){
      this.type = true
      this.draw = false
      this.setCanvas()
     } else {
      this.type = false
      this.draw = true
     }
  }


  onTypeSubmit(){    
    let sigObj = {
      method: 'type',
      data: this.TypeSignatureForm.value.input
    }

    this.submitSignature(sigObj)
  }


  clearCanvas(){
    this.signaturePad.clear()
  }

  undoClick(){
    var data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }

  submitCanvas(){
    if(this.signaturePad.isEmpty()){
      alert('signature field empty')
    } else {
      let data_uri = this.signaturePad.toDataURL()
      let encoded_image = data_uri.split(",")[1]
      let sigObj = {
        method: 'draw',
        data: encoded_image
      }
      this.submitSignature(sigObj)
    }
  }

  submitSignature(data: any){
    this.submitEvent.emit(data)
    this.viewEvent.emit(false)
  }

}
