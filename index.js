const fs = require('fs')
const path = require('path')
const logger = require('./lib/logger')('main')
const config = require('./lib/config')
const RTMPClient = require('./lib/RTMPClient')

async function main () {
  let rtmpClient = new RTMPClient(config.url, config.key)
  let fileList = fs.readdirSync(config.path)
  // for (let i = 0; i < fileList.length; i = i + 10) {
  //   try {
  //     await rtmpClient.pushFolder(config.path, i, i + 10)
  //   } catch (error) {
  //     logger.error(`Pushing the video ${config.path} failed`)
  //     logger.error(error)
  //   }
  //   break
  // }

  if (config.input) {
    try {
      await rtmpClient.copy(config.input)
    } catch (error) {
      logger.error(`Pushing the video ${config.path} failed`)
      logger.error(error)
    }
  } else {
    while (true) {
      for (let fileName of fileList) {
        logger.info(`Starting the loop of the path ${config.path}`)
        try {
          // await rtmpClient.pushFolder(config.path)
          // await rtmpClient.push(path.join(config.path, fileName))
          await rtmpClient.copy(path.join(config.path, fileName))
        } catch (error) {
          logger.error(`Pushing the video ${config.path} failed`)
          logger.error(error)
        }
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
