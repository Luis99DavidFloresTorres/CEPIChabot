import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-ia',
  templateUrl: './form-ia.component.html',
  styleUrls: ['./form-ia.component.css']
})
export class FormIAComponent {
  iaForm:FormGroup|any;
  constructor(private formBuilder: FormBuilder){
    this.iaForm = this.formBuilder.group({
      usuario:new FormControl(),
      contrasena: new FormControl()
  })
  }
  iaSend(){
    let usuario = this.iaForm.get('usuario').value
    let contrasena= this.iaForm.get('contrasena').value
    //this.serviceLogin.logear(usuario,contrasena)
  }
}
