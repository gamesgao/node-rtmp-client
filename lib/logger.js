const log4js = require('log4js')
log4js.configure({
  appenders: {
    debug: {
      type: 'file',
      filename: 'console.log'
    },
    error: {
      type: 'file',
      filename: 'error.log'
    },
    console: {
      type: 'console'
    },
    errorLog: {
      type: 'logLevelFilter',
      category: 'default',
      level: 'warn',
      appender: 'error'
    }
  },
  categories: {
    default: {
      appenders: ['debug', 'console', 'errorLog'],
      level: 'trace'
    }
  }
})

// Example
// const logger = log4js.getLogger('example')
// logger.trace('logger trace.')
// logger.debug('logger debug.')
// logger.info('logger info.')
// logger.warn('logger warn.')
// logger.error('logger error.')
// logger.fatal('logger fatal.')

module.exports = log4js.getLogger
