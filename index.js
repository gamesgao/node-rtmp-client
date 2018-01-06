const fs = require('fs')
const path = require('path')
const logger = require('./lib/logger')('main')
const config = require('./lib/config')
const RTMPClient = require('./lib/RTMPClient')

function main () {
  let rtmpClient = new RTMPClient(config.url, config.key)
  let fileList = fs.readdirSync(config.path)
  while (true) {
    logger.info(`Starting the loop of the path ${config.path}`)
    for (let fileName of fileList) {
      rtmpClient.push(path.join(config.path, fileName))
    }
  }
}

main()
