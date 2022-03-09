const axios = require("axios");

let simulateByIdFlag = false
let simulateAllFlag = false
let defaultData = [];

const getAll = async (req, res) => {
  try {
    console.log(defaultData);
    return res.status(200).send(defaultData);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const get = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  // console.log(defaultData);
  try {
    return res
      .status(200)
      .send(defaultData.filter((item) => id == item.uuid)[0]);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const create = async (req, res) => {
  const name = req.body;
  
  const {
    batteryCountMax,
    // name,
    batteryCountMin,
    powerLevel,
    intervalTime,
    range,
    nanoid,
    measuredPower,
    anglePitchMax,
    anglePitchMin,
    angleRollMax,
    angleRollMin,
    movementCountMax,
    movementCountMin,
  } = data;
  try {
    let newData = {
      // name,
      intervalTime,
      range,
      measuredPower,
      anglePitchMax,
      anglePitchMin,
      angleRollMax,
      angleRollMin,
      movementCountMax,
      movementCountMin,
      batteryCountMax,
      batteryCountMin,
      anglePitch: 0,
      angleRoll: 0,
      movementCount: 0,
      batteryVoltage: 0,
    };
    // defaultData = [...defaultData, newData];
    // console.log(newData)
    const res = await axios
      .post("https://at-backend1.herokuapp.com/sensor/add", {name}
      )

      // axios
      // .post("https://at-backend1.herokuapp.com/sensor/add", 
      //   newData,
      // )
      // .then(function (response) {
      //   console.log(response)
      // })
      // .catch(function (error) {
      //   console.log("error11");
      // });

    // execute();

    //Add entry to db
    // console.log(newData)
    return res.status(200).send(newData);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const updateData = async (ble) => {
  // const dataCopy = defaultData;
  // let element = dataCopy.filter((value) => ble.uuid == value.uuid)[0];
  
  let newData = {
    ...ble,
    anglePitch: Math.floor(
      Math.random() * (ble.anglePitchMax - ble.anglePitchMin) +
        ble.anglePitchMin
    ),
    angleRoll: Math.floor(
      Math.random() * (ble.angleRollMax - ble.angleRollMin) + ble.angleRollMin
    ),
    movementCount: Math.floor(
      Math.random() * (ble.movementCountMax - ble.movementCountMin) +
        ble.movementCountMin
    ),
    batteryVoltage: Math.floor(
      Math.random() * (ble.batteryCountMax - ble.batteryCountMin) +
        ble.batteryCountMin
    ),
  };
  const res2 = await axios.patch(`https://at-backend1.herokuapp.com/sensor/update/${ble.uid}`, newData)
  console.log(res2.data)
  return newData;
  // execute()
};
const execute = async () => {
  try {
    const res = await axios.get('https://at-backend1.herokuapp.com/sensor/all')
    res.data.map((ble) => {
      setTimeout(() => {
       updateData(ble);
      }, ble.intervalTime);
      // setTimeout(updateData, ble.intervalTime)
    });
  } catch(e) {
console.log("error")
  }
 

  setTimeout(execute, 6000);
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    defaultData = defaultData.filter((value) => id != value.id);
    return res.status(200).send(defaultData);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const {
      name,
      version,
      powerLevel,
      intervalTime,
      range,
      status,
      description,
      measuredPower,
      password,
    } = data;
    const dataCopy = defaultData;
    const element = dataCopy.filter((value) => id == value.uuid)[0];
    (element.name = name),
      (element.description = description),
      (element.version = version),
      (element.powerLevel = powerLevel),
      (element.intervalTime = intervalTime),
      (element.range = range),
      (element.status = status),
      (element.measuredPower = measuredPower),
      (element.password = password);
    // defaultData = dataCopy;
    return res.status(200).send(dataCopy);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const removeAll = async (req, res) => {
  try {
    defaultData = [];
    return res.status(200).send(defaultData);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const addAsset = async (req, res) => {
  const data = req.body
  const response = await axios.post("https://at-backend1.herokuapp.com/asset/add", data)

  console.log(response.data)
}

const repeatFunction = async (id, data, token, intervalTimer) => {
  if (!simulateByIdFlag){
    clearInterval(intervalTimer)
    return 
   } 
  const config = {
    headers: { Authorization: token }
};
let date = new Date();
date.setHours(date.getHours() - 5);

// now you can get the string
let isodate = date.toISOString();
let lngMin = 62.342519825122000;
let lngMax = 62.342519825122999;
let lng = Math.random()*(lngMax - lngMin) + lngMin

let ltdMin = 25.109895082618000;
let ltdMax = 25.109895082618999;
let ltd = Math.random()*(ltdMax - ltdMin) + ltdMin
  try {
    const res = await axios.patch("https://at-backend1.herokuapp.com/sensor/update/data", {
      sensor: id,
      anglePitch: Math.floor(
        Math.random() * (data.anglePitchMax - data.anglePitchMin) +
          data.anglePitchMin
      ),
      // anglePitch: lng,
      angleRoll: Math.floor(
        Math.random() * (data.angleRollMax - data.angleRollMin) + data.angleRollMin
      ).toString(),
      // angleRoll: ltd,
      movementCount: Math.floor(
        Math.random() * (data.movementCountMax - data.movementCountMin) +
          data.movementCountMin
      ),
      batteryVoltage: Math.floor(
        Math.random() * (data.batteryCountMax - data.batteryCountMin) +
          data.batteryCountMin
      ),
      intervalTime: data.intervalTime,
      range: Math.floor(Math.random() * 3) + 1 + data.range,
      measuredPower: data.measuredPower,
      anglePitchMax: data.anglePitchMax,
      anglePitchMin: data.anglePitchMin,
      angleRollMax: data.angleRollMax,
      angleRollMin: data.angleRollMin,
      movementCountMax: data.movementCountMax,
      movementCountMin: data.movementCountMin,
      batteryCountMax: data.batteryCountMax,
      batteryCountMin: data.batteryCountMin,
      timestamp: isodate
    }, config)
    console.log(res.data);
    return
  } catch (e) {
    console.log(e);
    return 
  }
};

const simulateById = async (req, res) => {
  const id = req.params.id
  const token = req.header('authorization')
  try {
    const res2 = await axios.get(`https://at-backend1.herokuapp.com/sensor/get/data/${id}`, {headers: { Authorization: token }});
    const data = res2.data[res2.data.length-1]
   
    simulateByIdFlag = true
  
      console.log(simulateByIdFlag)
      const intervalTimer  =  setInterval(async () => {
        console.log(simulateByIdFlag, "inside setinterval")
        console.log("insied loop")
        await repeatFunction(id, data, token, intervalTimer)
      }, data.intervalTime)
      setTimeout(() => {
        simulateByIdFlag = false
        
      }, 1000*60) //stop after 1 min;
      return res.sendStatus(200)
  } catch (e) {
    return res.status(404).json({message: "Data not found", status: 404})
  }

    
}

const cancelSimulationById = async (req, res) => {
  console.log("Cancelled Simulation of ID")
  simulateByIdFlag = false
  return res.status(200).send("Cancelled Simulation of ID")
}

const repeatFunctionAll = async (checkedData, token, intervalTimer) => {
  if (!simulateAllFlag){
    clearInterval(intervalTimer)
    return 
   } 
  let date = new Date();
date.setHours(date.getHours() - 5);
const config = {
  headers: { Authorization: token }
};
// now you can get the string
let isodate = date.toISOString();
  checkedData.map(async ble => {
    const res = await axios.get(`https://at-backend1.herokuapp.com/sensor/get/data/${ble.uid}`, config)
    const data = res.data[res.data.length-1]
    const res2 = await axios.patch("https://at-backend1.herokuapp.com/sensor/update/data", {
      sensor: ble.uid,
      anglePitch: Math.floor(
        Math.random() * (data.anglePitchMax - data.anglePitchMin) +
          data.anglePitchMin
      ),
      angleRoll: Math.floor(
        Math.random() * (data.angleRollMax - data.angleRollMin) + data.angleRollMin
      ),
      movementCount: Math.floor(
        Math.random() * (data.movementCountMax - data.movementCountMin) +
          data.movementCountMin
      ),
      batteryVoltage: Math.floor(
        Math.random() * (data.batteryCountMax - data.batteryCountMin) +
          data.batteryCountMin
      ),
      intervalTime: data.intervalTime,
      range: data.range,
      measuredPower: data.measuredPower,
      anglePitchMax: data.anglePitchMax,
      anglePitchMin: data.anglePitchMin,
      angleRollMax: data.angleRollMax,
      angleRollMin: data.angleRollMin,
      movementCountMax: data.movementCountMax,
      movementCountMin: data.movementCountMin,
      batteryCountMax: data.batteryCountMax,
      batteryCountMin: data.batteryCountMin,
      timestamp: isodate
    }, config)
    console.log(res2.data)
  })
  
}

const simulateAll = async (req, res) => {
  const checkedData = req.body
  // console.log(req.body)
  const token = req.header('authorization')
  try {   
    simulateAllFlag = true
      const intervalTimer  =  setInterval(async () => {
        console.log(simulateByIdFlag, "inside simulateAll Loop")
        await repeatFunctionAll(checkedData, token, intervalTimer)
      }, 5000)
      setTimeout(() => {
        simulateAllFlag = false
        
      }, 1000*60) //stop after 1 min;
      return res.sendStatus(200)
  } catch (e) {
    return res.status(404).json({message: "Data not found", status: 404})
  }
}

const cancelSimulationAll = async (req, res) => {
  console.log("cancelled all simulation")
  simulateAllFlag = false
  return res.status(200).send("cancelled all simulation")
}
module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.addAsset = addAsset;
module.exports.removeAll = removeAll;
module.exports.simulateById = simulateById;
module.exports.cancelSimulationById = cancelSimulationById;
module.exports.simulateAll = simulateAll;
module.exports.cancelSimulationAll = cancelSimulationAll;


