const express = require("express");

const ble = require("../controllers/ble"); 

const router = express.Router();

router.get('/getAll', ble.getAll);
router.get('/getById/:id', ble.get);
router.post('/simulateById/:id', ble.simulateById)
router.post('/cancelSimulationById/:id', ble.cancelSimulationById)
router.post('/simulateAll', ble.simulateAll)
router.post('/cancelSimulationAll', ble.cancelSimulationAll)
router.post('/create', ble.create);
router.put('/update/:id', ble.update);
router.post('/addAsset', ble.addAsset)
router.delete('/remove/:id', ble.remove);
router.delete('/removeAll', ble.removeAll);


module.exports = router;