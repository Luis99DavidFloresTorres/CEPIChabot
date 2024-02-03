import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlujoServicio } from './flujoService.component';
import { Subject, Subscription, window } from 'rxjs';
import { Flujo } from './flujoClase';

@Component({
  selector: 'app-flujos',
  templateUrl: './flujos.component.html',
  styleUrls: ['./flujos.component.css']
})
export class FlujosComponent implements OnDestroy, OnInit{
  flujosArray:Flujo[]=[]
  banderaFormularioMostrar:Boolean= false
  mostrarFlujoList:Boolean= true
  flujosArrayAgregar:Flujo[]=[];
  idAnterior:String=""
  agregarForm:FormGroup|any;
  subscribtorFlujoAll:Subscription|any;
  subscribtorFlujosSiguienteOfFlujoActual:Subscription|any;
  subscriptionAddFlujo:Subscription|any;
  constructor(private formBuilder: FormBuilder, private flujoService:FlujoServicio) {
    this.agregarForm = this.formBuilder.group({
        descripcion:new FormControl(),
        opcion: new FormControl()
    })
  }
  ngOnDestroy(): void {
   this.desubscribe()
  }
  ngOnInit(): void {
    this.desubscribe()
    this.flujoService.getAll()
    this.subscribtorFlujoAll=this.flujoService.listenerFlujoAll().subscribe(datos=>{
      this.flujosArray = datos
    })
  }
  editarFlujo(index:number){
    this.flujoService.updateFlujo(this.flujosArray[index])
  }
  eliminarFlujo(flujo:Flujo){
    //this.flujoService.deleteFlujo(flujo)
    let respuesta = confirm("Estas seguro que quieres eliminar el flujo?")
    if(respuesta) this.flujoService.deleteFlujo(flujo)
    
  }
  mostrarFlujosSiguientes(id:String){
    this.banderaFormularioMostrar= true
    this.mostrarFlujoList = false
    this.desubscribe()
    this.flujoService.getFlujosSiguientesOfFlujoActual(id)
    this.subscribtorFlujosSiguienteOfFlujoActual=this.flujoService.listenerFlujoSiguienteOfFlujoActual().subscribe(data=>{
      console.log(data)
      this.flujosArrayAgregar=data
    })
    this.idAnterior=id
  }
  agregarFlujo(){
    
    let idPost:Flujo[]=[]
    let flujoNuevo:any={descripcion:this.agregarForm.get('descripcion').value,
      opcion:this.agregarForm.get('opcion').value,
      flujo_siguiente:idPost,
      _id:'',
      flujoAnterior:this.idAnterior,
      estadoInicial:false
    }
   this.desubscribe()
    this.flujoService.addFlujo(flujoNuevo, this.idAnterior)
    
    this.subscriptionAddFlujo = this.flujoService.listenerAddFlujo().subscribe(data=>{
        if(data){
          this.banderaFormularioMostrar= false
          this.mostrarFlujoList = true
          this.idAnterior=''
          this.desubscribe()
          this.flujoService.getAll()
          this.subscribtorFlujoAll=this.flujoService.listenerFlujoAll().subscribe(datos=>{
          this.flujosArray = datos
    })
        }
    })
    
    this.formatearFormulario();
  }
  formatearFormulario(){
    this.agregarForm.get('descripcion').setValue('')
    this.agregarForm.get('opcion').setValue('')
  }
  desubscribe(){
    if(this.subscribtorFlujoAll!=undefined){
      this.subscribtorFlujoAll.unsubscribe();
    }
    if(this.subscribtorFlujosSiguienteOfFlujoActual!=undefined){
      this.subscribtorFlujosSiguienteOfFlujoActual.unsubscribe();
    }
    if(this.subscriptionAddFlujo!=undefined){
      this.subscriptionAddFlujo.unsubscribe();
    }
  }
}
