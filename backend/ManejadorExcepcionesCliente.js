const flujoClienteRepository = require('./flujo_cliente_Repository.js')
const clienteRepository = require('./clienteRepository.js')
exports.controlarEstadoInicialMedio = async(cliente, opcion,flujo_actual, client, messageFrom)=>{

    if(flujo_actual.estadoInicial){
        let flujoOpcion;
        if(cliente.estado){
            flujoOpcion = await FlujoRepository.findFlujoInicial(flujo_actual,"inicial")
            let updateCliente = await clienteRepository.updateEstado(false,cliente._id)
            let stringOptions = await flujoClienteRepository.stringOptionsInicial(cliente,flujoOpcion)
            return stringOptions
        }else{
            flujoOpcion = await FlujoRepository.findByOption(flujo_actual,opcion)
            if(flujoOpcion==undefined || flujoOpcion=='volver'){
                let flujoActual = await FlujoRepository.findById(cliente.flujo_actual)
                let stringOptions = await flujoClienteRepository.stringOptionsInicial(cliente,flujoActual)
                client.sendMessage(messageFrom, stringOptions)
                return "Seleccione una de las opciones disponibles"
            }
            let updateCliente = await clienteRepository.updateEstado(true, cliente._id)
            let stringOptions = await flujoClienteRepository.stringOptions(cliente,flujoOpcion)
            return stringOptions
        }   
    }
    let flujoOpcion = await FlujoRepository.findByOption(flujo_actual,opcion)
    if(flujoOpcion==undefined){
        let flujoActual = await FlujoRepository.findById(cliente.flujo_actual)
        let stringOptions = await flujoClienteRepository.stringOptions(cliente,flujoActual)
        client.sendMessage(messageFrom, stringOptions)
        return "Seleccione una de las opciones disponibles"
    }
    if(flujoOpcion=="volver"){ 
        flujoOpcion = await FlujoRepository.findById(flujo_actual.flujo_anterior)
        if(flujoOpcion.estadoInicial){
            let stringOptions = await flujoClienteRepository.stringOptionsInicial(cliente,flujoOpcion)
            let updateCliente = await clienteRepository.updateEstado(false,cliente._id)
            return stringOptions 
        }
    }
    let stringOptions = ""
    stringOptions = await flujoClienteRepository.stringOptions(cliente,flujoOpcion)
    return stringOptions
}
exports.estadoFinal = async(string, cliente_id)=>{
    if(string[0]=='-' || string.length==0){
        let flujoInicial = await FlujoRepository.findFlujoEstadoInicial()
        console.log(flujoInicial)
        let clienteChange = await clienteRepository.updateFlujoActual(flujoInicial, cliente_id)
        return string +" \n"+ "Gracias por contactarte con nosotros!"
    }
}