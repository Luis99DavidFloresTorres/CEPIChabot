import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login:FormGroup|any;
  constructor(private formBuilder: FormBuilder, private route:Router){
    this.login = this.formBuilder.group({
      usuario:new FormControl(),
      contrasena: new FormControl()
  })
  }
  loginR(){
    console.log("entra")
    let usuario = this.login.get('usuario').value
    let contrasena= this.login.get('contrasena').value
    console.log(usuario)
    
    //this.serviceLogin.logear(usuario,contrasena)
    this.route.navigate(["administrador"])
  }
}
