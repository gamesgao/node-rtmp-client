const fs = require('fs')
const path = require('path')
const logger = require('./lib/logger')('main')
const config = require('./lib/config')
const RTMPClient = require('./lib/RTMPClient')

async function main () {
  let rtmpClient = new RTMPClient(config.url, config.key)
  let fileList = fs.readdirSync(config.path)
  while (true) {
    logger.info(`Starting the loop of the path ${config.path}`)
    let temp = 1
    for (let fileName of fileList) {
      if (temp === 1) {
        rtmpClient.push(path.join(config.path, fileName))
      } else {
        await rtmpClient.push(path.join(config.path, fileName))
      }
      temp = -temp
    }
  }
}

process.on('unhandledRejection', (error) => {
  logger.fatal(`UnhandledRejection: Error.\n${error.name}: ${error.message}\nStack: ${error.stack}`)
})

process.on('uncaughtException', (error) => {
  logger.fatal(`UnhandledRejection: Error.\n${error.name}: ${error.message}\nStack: ${error.stack}`)
})

main()
