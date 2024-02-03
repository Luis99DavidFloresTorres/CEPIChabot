export interface Flujo{
    opcion:String;
    descripcion:String
    flujo_siguiente:Flujo[]
    flujoAnterior:String
    _id:String
}