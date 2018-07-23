const commander = require('commander')
let version = process.env.npm_package_version ? process.env.npm_package_version : '0.0.0'
commander
.version(version)
.option('-u, --url <url>', 'Stream URL')
.option('-k, --key <key>', 'Stream Key')
.option('-p, --path <path>', 'Video File Path')
.option('-i, --input <input>', 'Input Stream')
.parse(process.argv)

module.exports = commander
