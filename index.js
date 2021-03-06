const fs = require('fs')
const path = require('path')
const logger = require('./lib/logger')('main')
const config = require('./lib/config')
const RTMPClient = require('./lib/RTMPClient')

const MaxErrorCount = 100

async function main () {
  let rtmpClient = new RTMPClient(config.url, config.key)
  let fileList = fs.readdirSync(config.path)

  let errorCount = 0

  logger.info(`Starting the loop of the path ${config.path}`)
  while (errorCount <= MaxErrorCount) {
    let fileName = sample(fileList)
    try {
      await rtmpClient.copy(path.join(config.path, fileName))
      errorCount = 0
    } catch (error) {
      logger.error(`Pushing the video ${path.join(config.path, fileName)} failed`)
      logger.error(error)
      errorCount += 1
    }
  }
}

function sample (array) {
  return array[Math.floor(Math.random() * array.length)]
}

process.on('unhandledRejection', (error) => {
  logger.fatal(`UnhandledRejection: Error.\n${error.name}: ${error.message}\nStack: ${error.stack}`)
})

process.on('uncaughtException', (error) => {
  logger.fatal(`UnhandledRejection: Error.\n${error.name}: ${error.message}\nStack: ${error.stack}`)
})

main()
