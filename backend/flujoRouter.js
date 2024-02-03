const express = require('express');
const router = express.Router()
const FlujoController=require('./flujoController')
//router.get('/byId/:id',FlujoController.getById)
router.get('/getAll/',FlujoController.getAll)
router.post('/addNewFlujoAndUpdateFlujoBefore/:id',FlujoController.addNewFlujoAndUpdateFlujoBefore)
router.post('/updateFlujo',FlujoController.updateFlujo)
router.post('/deleteFlujo',FlujoController.deleteFlujo)
router.get('/findFlujosSiguientesOfFlujoActual/:id',FlujoController.findFlujosSiguientesOfFlujoActual)
router.get('/flujoToDot/',FlujoController.flujoToDot)
router.get('/imprimirExcel',FlujoController.imprimirExcel)
module.exports = router