const ffmpeg = require('fluent-ffmpeg')
const logger = require('./logger')('rtmp-client')
const path = require('path')

class RTMPClient {
  constructor (streamURL, streamKey) {
    this.streamURL = streamURL
    this.streamKey = streamKey
  }

  async push (videoFilePath) {
    let outputPath = (this.streamURL + this.streamKey)
    let ffmpegCLI = ffmpeg().addInput(videoFilePath)
    // It is useful for real-time output. This option will slow down the reading of the input(s) to the native frame rate of the input(s)
    ffmpegCLI = ffmpegCLI.native() // .inputOptions('-re')
    // Set the number of audio channels
    ffmpegCLI = ffmpegCLI.audioChannels(2) // .inputOptions('-ac 2')
    // Rescale the video to 720p, auto padding the remaining parts
    ffmpegCLI = ffmpegCLI.size('1280x720').autoPad()
    // Set the video/audio codec
    ffmpegCLI = ffmpegCLI.videoCodec('libx264')
    ffmpegCLI = ffmpegCLI.audioCodec('libmp3lame')
    // Set the audio frequency
    ffmpegCLI = ffmpegCLI.audioFrequency(44100)
    // Output format fiv for streaming
    ffmpegCLI = ffmpegCLI.format('flv')
    // Additional Video Option
    ffmpegCLI = ffmpegCLI.addOptions([
      // x264 option
      '-preset veryfast',
      '-crf 23',
      '-maxrate 2500k',
      '-bufsize 2500k'
    ])
    ffmpegCLI = ffmpegCLI.videoFilters([{
      filter: 'drawtext',
      options: `fontfile=${path.join(__dirname, './unicode.ttf')}:text=${path.basename(videoFilePath)}:fontcolor=black:fontsize=16:box=1:boxcolor=white@0.2:boxborderw=5:x=5:y=5`
    }])
    ffmpegCLI = ffmpegCLI.output(outputPath, {end: true})
    return new Promise((resolve, reject) => {
      ffmpegCLI.on('start', (commandLine) => {
        logger.info(`Spawned Ffmpeg with command: ${commandLine}`)
        logger.info(`Video ${videoFilePath} is Pushing `)
      })
      .on('error', (err, stdout, stderr) => {
        logger.error('error: ' + err.message)
        logger.error('stdout: ' + stdout)
        logger.error('stderr: ' + stderr)
        reject(err)
      })
      .on('stderr', (stderrLine) => {
        logger.trace(stderrLine)
      })
      .on('end', () => {
        logger.info(`Video ${videoFilePath}  Pushing is Finished !`)
        resolve()
      })
      .run()
    })
  }
}

module.exports = RTMPClient
