Cliente = require('./clienteClass');
const flujoRepository = require('./flujoRepository.js')
class ClienteRepository {
    async updateOption(celular, opcion) {
      let cliente = this.findByPhone(celular)
      if(cliente!=undefined){
        let option = buscarOpcionFlujo(opcion, cliente.flujo_actual)
        cliente.flujo_actual= option
        await Cliente.save(cliente)
      }else{
        await createCliente(celular)
      }
      
     
      return clienteSave;
    }

    async updateEstado(estado, cliente_id){
      let cliente = await Cliente.findOneAndUpdate({'_id':cliente_id},{'estado':estado})
 
    }
    async updateUltimaConexion(cel_user, date){
      let cliente = await Cliente.findOneAndUpdate({'celular':cel_user},{'ultima_conexion':date})
    }
    async updateFlujoActual(flujo_id,cliente_id){
      let cliente = await Cliente.findOneAndUpdate({'_id':cliente_id},{'flujo_actual':flujo_id})
    }
    async findByPhone(cel) {
      let cliente = await Cliente.find({celular:cel})
      return cliente;
    }
    async createCliente(cel){
        let flujoInicial = await flujoRepository.findFlujoInicial()
        const newCliente = new Cliente({
            celular:cel,
            estado:true,
            ultima_conexion:new Date(),
            flujo_actual: flujoInicial._id
        })
        const clienteSave=await newCliente.save()
        return clienteSave
    }
    async reviewAndCreateCliente(cel){
      const celular = cel.substring(3,11)
      const clienteFind = await this.findByPhone(celular)
      if(clienteFind.length==0){
        const nuevoCliente = await this.createCliente(celular)
        return 1
      }
        return 0
    }
  }
  
  module.exports = new ClienteRepository();