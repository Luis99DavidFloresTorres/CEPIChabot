const flujo = require('./flujoClass')
const flujoRepository = require('./flujoRepository.js')
const clienteRepository = require('./clienteRepository.js')
const flujoClienteRepository = require('./flujo_cliente_Repository.js')
const {controlarEstadoInicialMedio, estadoFinal} = require('./ManejadorExcepcionesCliente.js')
const excel = require('excel4node')
var path = require('path');
exports.addNewFlujoAndUpdateFlujoBefore= async(flujo, idFlujoActual)=>{
    try{
        flujo.flujo_anterior = idFlujoActual
        console.log(flujo)
        let flujoNuevo = await flujoRepository.createFlujo(flujo)
        let flujoActual = await flujoRepository.addFlujoSiguiente(flujoNuevo._id, idFlujoActual)
        if(flujoNuevo!= null && flujoActual.modifiedCount>0 ){
            return true
        }else{
            return false
        }
       
    }
    catch(error){
        res.status(500).json({message:error.message})
    }

}
exports.reviewAndCreateCliente = async(celular)=>{
    try {
        let cliente = await clienteRepository.reviewAndCreateCliente(celular)
        return cliente
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.showOptions = async(clientePhone, opcion, client,messageFrom)=>{
    let cliente = await clienteRepository.findByPhone(clientePhone)
    
    let conexion_cliente = new Date(cliente[0].ultima_conexion)
    let controlarConexion = conexion_cliente.getMinutes()+1
    conexion_cliente.setMinutes(controlarConexion)
    let hora_actual = new Date()
    if(conexion_cliente < hora_actual){
        let flujoInicial = await flujoRepository.findFlujoInicial()
        let updateClienteFlujo = await clienteRepository.updateFlujoActual(flujoInicial._id, cliente[0]._id)
    }
    let actualizarHora = await clienteRepository.updateUltimaConexion(clientePhone,hora_actual)
    cliente = await clienteRepository.findByPhone(clientePhone)
    let flujo_actual = await flujoRepository.findById(cliente[0].flujo_actual)
    let stringOptions = await controlarEstadoInicialMedio(cliente[0],opcion,flujo_actual, client, messageFrom)
    let changeEstadoFinalToStart = await estadoFinal(stringOptions,cliente[0]._id)
    if(changeEstadoFinalToStart != undefined){
        stringOptions = changeEstadoFinalToStart
    }
    return stringOptions
}
exports.buscarFlujosPosterioresById = async(id)=>{
    let flujo = await flujoRepository.findById(id)
  
    let flujosSiguientes = await flujoRepository.findFlujoSiguienteById(flujo.flujo_siguiente)
    return flujosSiguientes
}
exports.getAll = async()=>{
    let flujoAll = await flujoRepository.getFlujo()
    return flujoAll
}
exports.updateFlujo = async(flujo)=>{
    let updateFlujo = await flujoRepository.updateFlujo(flujo)
    return updateFlujo
}
exports.deleteFlujo = async(flujo)=>{
    let arrayIds= [flujo._id]
    let allIds = await flujoRepository.findAllIdsFlujosSiguientes(arrayIds)
   
    let flujoDeletes = await flujoRepository.deleteFlujos(allIds)
    return flujoDeletes
}
exports.flujoToDot= async()=>{
    let flujoInicial = await flujoRepository.findFlujoEstadoInicial()
    let stringDot = await flujoRepository.convertLenguajeDotAllFlujos(flujoInicial)
    return stringDot
}
exports.excelProgramas = async()=>{
    let flujoInicial = await flujoRepository.findFlujoInicial()
    let dtoImprimir = await flujoRepository.createDtoExcelImprimir(flujoInicial);
    let tipoClasesPosiciones = {}
    var wb = new excel.Workbook();
    var ws = wb.addWorksheet("Programas CEPI")
    let columnaArea = 0
    let ultimaColumna = 0
    dtoImprimir.forEach(dto=>{
        let area = dto.area
       
        dto.tipoProgramas.forEach(tipoP=>{
            let tipoPrograma = tipoP.tipoPrograma
            if(tipoClasesPosiciones[tipoPrograma]==undefined){
                ultimaColumna+=1
                tipoClasesPosiciones[tipoPrograma]=[1,ultimaColumna]
                ws.cell(1, ultimaColumna).string(tipoPrograma)
            }
            let posiciones = tipoClasesPosiciones[tipoPrograma]
            posiciones[0] +=1
             
            ws.cell(posiciones[0], posiciones[1]).string(area)
            tipoP.programas.forEach(programa=>{
                posiciones[0] +=1 
                let filaTP = posiciones[0]
                let columnaTP = posiciones[1]
                ws.cell(filaTP, columnaTP).string(programa)
            })
        })
    })
    const pathF = path.join(__dirname,'Programas CEPI.xlsx')
    return [pathF, wb]
}