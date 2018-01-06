# node-rtmp-client
This is a rtmp-client that can push stream to the live platform. Based on [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

## Installation 
```sh
$ npm install
```
## Usage
To show the help information
```sh
$ node index.js -h
```

Here are the introduction of these configuration.

### -u, --url
The Stream URL, the live platform will provide this when you open the liveroom.

### -k, --key
The Stream Key, the live platform will provide this when you open the liveroom.

### -p, --path
The input video file path, usually this should be a folder containing videos.

## Development
Add the Bilibili danmu reader/writer.