
FlujoRepository = require('./flujoRepository');
Cliente_Repository= require('./clienteRepository')
class flujo_cliente_Repository {
    async findByPhone(cel) {
      console.log(cel)
      let cliente = await Cliente.find({celular:cel})
      return cliente;
    }
    async stringOptionsInicial(cliente, flujoOpcion){
      
      let clienteActualizado = await Cliente_Repository.updateFlujoActual(flujoOpcion._id,cliente._id)
      let flujos_opciones = await FlujoRepository.findFlujosSiguiente(flujoOpcion)
      let string_print= ""
      for(let i=0; i< flujos_opciones.length;i++){
          string_print +=flujos_opciones[i].opcion+" : "+flujos_opciones[i].descripcion+"\n"
      }
      return string_print
  }
    async stringOptions(cliente, flujoOpcion){
   
        let clienteActualizado = await Cliente_Repository.updateFlujoActual(flujoOpcion._id,cliente._id)
        let flujos_opciones = await FlujoRepository.findFlujosSiguiente(flujoOpcion)
        let string_print= ""
        let mayor
        if(flujos_opciones.length >0 && flujos_opciones[flujos_opciones.length-1].opcion != '-'){
           mayor = parseInt(flujos_opciones[flujos_opciones.length-1].opcion) + 1
        }
        for(let i=0; i< flujos_opciones.length;i++){
            string_print +=flujos_opciones[i].opcion+" : "+flujos_opciones[i].descripcion+"\n"
        }
        if(flujos_opciones.length >0 && flujos_opciones[flujos_opciones.length-1].opcion != '-'){
          string_print +=mayor+" : "+"volver"
        }
        return string_print
    }
    async getFlujoById(id) {
      return await flujoClase.findById(id);
    }
  
    async deleteFlujo(id) {
      return await flujoClase.findByIdAndRemove(id);
    }
  }
  
  module.exports = new flujo_cliente_Repository();