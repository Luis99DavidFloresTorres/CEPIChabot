import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flujo } from './flujoClase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Esto significa que el servicio se proporciona en el nivel raíz de la aplicación
})

export class FlujoServicio {
  private url = 'http://localhost:3032/api/'
  private flujosAll= new Subject<Flujo[]>();
  private flujosSiguientesOfFlujoActual =  new Subject<Flujo[]>();
  private flujoAdd =  new Subject<Boolean>();
  constructor(private http: HttpClient) { }

  // Método de ejemplo en el servicio
  flujoById(id:String) {
    var flujo;
    this.http.get<any[]>(this.url+'byId'+'/id');
    return 'Estos son datos desde el servicio.';
  }
  addFlujo(flujo:any, idFlujoActual:String) {
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const mandar={descripcion:flujo.descripcion,
      opcion:flujo.opcion,
      flujo_siguiente:flujo.flujo_siguiente,
      _id:'',
      flujoAnterior:flujo.flujoAnterior
    }
    this.http.post<any>(this.url+'addNewFlujoAndUpdateFlujoBefore/'+idFlujoActual,mandar).subscribe(data=>{
        let response = data
        this.flujoAdd.next(response)
    });
  }
  getAll() {
    console.log("entra")
    this.http.get<Flujo[]>(this.url+'getAll').subscribe(data=>{
        let flujos:Flujo[] = data
        console.log(flujos)
        this.flujosAll.next(flujos)
    });
  }
  getFlujosSiguientesOfFlujoActual(idFlujoActual:any){
    
    this.http.get<any[]>(this.url+'findFlujosSiguientesOfFlujoActual/'+idFlujoActual).subscribe((data)=>{
      var flujo:Flujo[] = data
      this.flujosSiguientesOfFlujoActual.next(flujo)
    });
  }
  updateFlujo(flujo:Flujo){
    this.http.post<Boolean>(this.url+'updateFlujo',flujo).subscribe(data=>{
      if(data)
      window.location.reload()
      else{
        alert("No se pudo actualizar los cambios")
      }
  });
  }
  deleteFlujo(flujo:Flujo){
    this.http.post<Boolean>(this.url+'deleteFlujo',flujo).subscribe(data=>{
      if(data)
      window.location.reload()
      else{
        alert("No se pudo actualizar los cambios")
      }
  });
  }
  listenerFlujoAll(){
    return this.flujosAll.asObservable();
  }
  listenerFlujoSiguienteOfFlujoActual(){
    return this.flujosSiguientesOfFlujoActual.asObservable();
  }
  listenerAddFlujo(){
    return this.flujoAdd.asObservable();
  }
}