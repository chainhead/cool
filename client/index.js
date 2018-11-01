const fs = require('fs');
const mqtt = require('async-mqtt')
const util = require('util');
//
var mqttClient
//
exports.launchClient = async function launchClient(configFile) {
    const readFile = util.promisify(fs.readFile)
    await readFile(configFile).then((config) => {
        const brokerConfig = JSON.parse(config)
        mqttClient = mqtt.connect(brokerConfig.mqttUrl)
        mqttClient.on('connect', async () => {
            await mqttClient.subscribe('topic').then(() => {
            }).catch((e) => {
                console.log(e.code + ' - ' + e.message)
                process.exit(16)
            })
        })
        //
        mqttClient.on('error', () => {
    
        })
        //
        mqttClient.on('reconnect', () => {
    
        })
        //
        mqttClient.on('close', () => {
    
        })
        //
        mqttClient.on('offline', () => {
    
        })
        //
        mqttClient.on('message', (topic, message) => {
            console.log(topic + '<>' + message.toString())
        })
    }).catch((e) => {
        console.log(e.code + ' - ' + e.message)
        process.exit(16)
    })
}