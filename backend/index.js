const express = require("express");
const qrcode = require("qrcode-terminal");
const qr = require("qrcode");
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const routes = require('./flujoRouter');
const {showOptions, reviewAndCreateCliente} = require("./flujoService");
const { Client, LocalAuth } = require("whatsapp-web.js");
const app = express();
const PORT = process.env.PORT || 3032;
const mongoString = process.env.DATABASE_URL
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
  console.log('Database Connected');
})
//app.use(cors());
const client = new Client({
  authStrategy: new LocalAuth(),
    puppeteer: {
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
        
	}
});
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});
client.on("ready", () => {
    console.log("Client is ready!");
});
client.initialize();
client.on("message", async (message) => {
    
    const mensaje =message.body.toLocaleLowerCase()
    let celular = message.from.substring(3,11)
    if(message.from=='59176122187@c.us'){//
      
      let cliente = await reviewAndCreateCliente(message.from)
      let conversar
      if(cliente!=undefined){
        conversar =await showOptions(celular,mensaje, client, message.from)
      }
     

      client.sendMessage(message.from,conversar)
    }
});
app.use('/api', routes);
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
});

client.on("disconnected", async () => {
  console.log("Cliente desconectado");
  process.exit(0);
});