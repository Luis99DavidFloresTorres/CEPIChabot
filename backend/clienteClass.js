const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const clienteSchema=new mongoose.Schema({
    flujo_actual:{
        type:ObjectId,
        ref:'Flujo'
    },
    celular:{type:String},
    estado:{type:Boolean},
    ultima_conexion:{type:Date}
})
module.exports=mongoose.model('Cliente',clienteSchema)