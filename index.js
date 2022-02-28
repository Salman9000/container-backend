const bleRouter =   require("./routes/ble");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use('/api', bleRouter )

const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
