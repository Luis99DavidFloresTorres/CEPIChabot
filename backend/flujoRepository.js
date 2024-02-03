const { ImprimirExcelDto } = require('./ImprimirExcelDto.js');

flujoClase = require('./flujoClass.js');
class FlujoRepository {
  async createFlujo(flujoData) {
    const newFlujo = new flujoClase({
        flujo_anterior: flujoData.flujo_anterior,
        descripcion:flujoData.descripcion,
        opcion: flujoData.opcion,
        estadoInicial:flujoData.estadoInicial
    })

    const flujoSave=await newFlujo.save()
    return flujoSave;
  }
  async getFlujo() {
    let flujos = await flujoClase.find()
    return flujos;
  }
  async findById(id) {
    let flujoId = await flujoClase.findById(id)
   
    return flujoId;
  }
  async findFlujoBehindAndUpdateFlujoSiguiente(flujoActual){
        
        let flujoAnterior = flujoClase.findById(flujoActual.flujo_anterior)
        flujoAnterior.flujo_siguiente.push(flujoActual._id)
        let respuesta = await flujoClase.updateOne({_id:flujoAnterior_id},
          {$set: {flujo_siguiente:flujoAnterior.flujo_siguiente}})
        
  }
  async crearFlujoAndUpdateFlujoAnterior(flujoActual) {
    let flujoSave= createFlujo(flujoActual)  
    await findFlujoBehindAndUpdateFlujoSiguiente(flujoSave)
  }
  async findByOption(flujo_actual, opcion){
    let maximo 
    for(let flujoS=0; flujoS<flujo_actual.flujo_siguiente.length;flujoS++){
      let flujoSiguiente = await flujoClase.findById(flujo_actual.flujo_siguiente[flujoS])
      if(flujoS==0){
        maximo = parseInt(flujoSiguiente.opcion)
      }else if(maximo < parseInt(flujoSiguiente.opcion)){
        maximo = parseInt(flujoSiguiente.opcion)
      }
      if(flujoSiguiente.opcion==opcion){
        return flujoSiguiente
      }
    }
    if( maximo+1 == parseInt(opcion)){
      return "volver"
    }
  }
  async findByOptionInicial(flujo_actual, opcion){
    
    for(let flujoS=0; flujoS<flujo_actual.flujo_siguiente.length;flujoS++){
      let flujoSiguiente = await flujoClase.findById(flujo_actual.flujo_siguiente[flujoS])
      if(flujoSiguiente.opcion==opcion){
        return flujoSiguiente
      }
    }
   
  }

  async findFlujoSiguienteById(arraysIds){
    var flujosSiguientes = await flujoClase.find({_id: {$in: arraysIds}});
    return flujosSiguientes
  }
  async findFlujosSiguiente(flujo_actual){
   
    let flujosSiguiente=[]
    for(let flujoS=0; flujoS<flujo_actual.flujo_siguiente.length;flujoS++){

      let flujoSiguiente =await flujoClase.findById(flujo_actual.flujo_siguiente[flujoS])
      flujosSiguiente.push(flujoSiguiente)
    }
    flujosSiguiente.sort((a,b)=>{
       if(a.opcion<b.opcion){
        return -1
       }
       return 1
    })
    return flujosSiguiente
  }
  async findFlujoEstadoInicial(){
    let flujo = await flujoClase.find({estadoInicial:true})
    if(flujo!=undefined)return flujo[0]
    return 0
  }
  async findFlujoInicial(){
    let flujo = await flujoClase.find({opcion:"inicial"})
    if(flujo!=undefined)return flujo[0]
    return 0
  }
  
  async getFlujoById(id) {
    return await flujo.findById(id);
  }

  async addFlujoSiguiente(idFlujoSiguiente, idFlujoActual) {
    let flujoActualizado = await flujoClase.updateOne({_id:idFlujoActual},{$push:{flujo_siguiente:idFlujoSiguiente}})
    return flujoActualizado;
  }
  async updateFlujo(flujo) {
    let flujoActualizado = await flujoClase.updateOne({_id:flujo._id},{$set:{descripcion:flujo.descripcion, opcion:flujo.opcion}})
    return flujoActualizado;
  }
  async findAllIdsFlujosSiguientes(flujoArray){
    let idsEncontrados = []

    while(flujoArray.length>0){
      let flujoFind = await flujoClase.findById(flujoArray[0])
      
      idsEncontrados.push(flujoArray.shift())

      flujoArray = flujoArray.concat(flujoFind.flujo_siguiente)
    }
    return idsEncontrados
  }
  async convertLenguajeDotAllFlujos(flujo){
   
    let stringDot =``;
    let flujoArray = []
    flujoArray.push(flujo)
    while(flujoArray.length>0){
      let flujosSiguiente = await flujoClase.find({"_id":{$in:flujo.flujo_siguiente}})
      if(flujo.descripcion!=undefined){
        let flujoActualDescripcion = flujo.descripcion
        if(flujoActualDescripcion.length > 20){
          flujoActualDescripcion = flujoActualDescripcion.substring(0,20)
        }
        for(var i = 0 ;i<flujosSiguiente.length;i++){
          let flujoSiguienteDescripcion = flujosSiguiente[i].descripcion
          if(flujoSiguienteDescripcion.length>20){
            flujoSiguienteDescripcion = flujoSiguienteDescripcion.substring(0,20)
          }
          stringDot +=`"`+flujoActualDescripcion+`"`+ ` -- `+`"`+flujoSiguienteDescripcion+`"`+`;\n`
          console.log(stringDot)
        }
      }
      flujoArray = flujoArray.concat(flujosSiguiente)
      flujoArray.shift()
      flujo = flujoArray[0]
    }
    return stringDot
  }
  async createDtoExcelImprimir(flujo){
    let flujoArray = []
    let flujosSiguiente = await flujoClase.find({"_id":{$in:flujo.flujo_siguiente}})
    flujosSiguiente = flujosSiguiente.filter(x=>{if (x.opcion=='1') return x})[0]
    flujosSiguiente = await flujoClase.find({"_id":{$in:flujosSiguiente.flujo_siguiente}})
    flujoArray = flujosSiguiente
    let arrayDto = []
    let imprimirExcelDto
   
    while(flujoArray.length>0){

      let flujoArea = flujosSiguiente[0] 
       
      let flujoSiguienteAreas = flujoArea.flujo_siguiente
      
      imprimirExcelDto= new ImprimirExcelDto()
      
      imprimirExcelDto.setArea(flujoArea.descripcion)
      let arrayTipoProgramas = []
      imprimirExcelDto.setTipoProgramas(arrayTipoProgramas)
      let lengthFlujoSiguienteArea = flujoSiguienteAreas.length
      for(let i = 0; i<lengthFlujoSiguienteArea;i++){
        let flujoTipoPrograma = await flujoClase.findById(flujoSiguienteAreas[0])
        let flujoSiguienteTipoProgramas = flujoTipoPrograma.flujo_siguiente
        let programas = []
        let tipoFlujo = {'tipoPrograma':flujoTipoPrograma.descripcion, 'programas':programas}
        arrayTipoProgramas.push(tipoFlujo)
        
          if(flujoSiguienteTipoProgramas!=undefined){
            let fSL = flujoSiguienteTipoProgramas.length
            for(let j = 0;j<fSL;j++){
              let programa = await flujoClase.findById(flujoSiguienteTipoProgramas[0]._id)
              console.log(programa)
              programas.push(programa.descripcion)
              flujoSiguienteTipoProgramas.shift()
            }
          }
         
        flujoSiguienteAreas.shift()
      }
      arrayDto.push(imprimirExcelDto)
      flujoArray.shift()
    }
    return arrayDto
  }
  async deleteFlujos(arrayIds) {
    let flujosEliminados = await flujoClase.deleteMany({"_id": {$in: arrayIds}});
    let flujoAnterior = await flujoClase.updateOne({flujo_siguiente:arrayIds[0]},{$pull:{flujo_siguiente:arrayIds[0]}})
    return flujosEliminados
  }
}

module.exports = new FlujoRepository();