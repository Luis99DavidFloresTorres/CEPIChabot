const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const flujoSchema=new mongoose.Schema({
    opcion:{type:String},
    descripcion:{type:String},
    flujo_siguiente:[{
        type:ObjectId,
        ref:'Flujo'
    }],
    flujo_anterior:{
        type:ObjectId,
        ref:'Flujo'
    },
    estadoInicial:{type:Boolean}
})
module.exports=mongoose.model('Flujo',flujoSchema)