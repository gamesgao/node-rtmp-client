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
    for (let fileName of fileList) {
      try {
        await rtmpClient.push(path.join(config.path, fileName))
      } catch (error) {
        logger.error(`Pushing file ${fileName} Error!`)
      }
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
