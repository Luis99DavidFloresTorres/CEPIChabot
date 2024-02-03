const flujoService= require('./flujoService')
exports.findFlujosSiguientesOfFlujoActual =  async(req,res)=>{
    try{
      
        const data= await flujoService.buscarFlujosPosterioresById(req.params.id)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
exports.getAll =  async(req,res)=>{
    try{
        const data= await flujoService.getAll()
        res.json(data)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
exports.addNewFlujoAndUpdateFlujoBefore =  async(req,res)=>{
    try{
      
        const data= await flujoService.addNewFlujoAndUpdateFlujoBefore(req.body, req.params.id)
        if(!data){
            res.json(false)
        }else{
            res.json(true)
        }
        
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
exports.updateFlujo =  async(req,res)=>{
    try{
        console.log(req.body)
        const data= await flujoService.updateFlujo(req.body)
        if(data.matchedCount>0){
            res.status(200).json(true)
        }else{
            res.status(500).json(false)
        }
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
exports.deleteFlujo = async(req,res)=>{
    try{
        const data= await flujoService.deleteFlujo(req.body)
        if(data.deletedCount>0){
            res.status(200).json(true)
        }else{
            res.status(500).json(false)
        }
    }catch(error){
        res.status(500).json({message:error.message})

    }
}
exports.flujoToDot= async(req, res)=>{
    try{
       
        let dotString = await flujoService.flujoToDot()
        res.json(dotString)
    }catch(error){
        res.status(500).json({message:error.message})   
    }
}
exports.imprimirExcel = async(req,res)=>{
    try{
        let vect = await flujoService.excelProgramas();
        let wb = vect[1]
        wb.write(vect[0],function(err, stats){
            if(err){
                console.log(err)
            }else{
                function downloadFile(){
                    res.download(vect[0])
                }
                downloadFile()
                return false
            }
        })
    }catch(error){
        res.status(500).json({message:error.message}) 
    }
}