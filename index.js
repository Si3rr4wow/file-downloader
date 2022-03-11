const fs = require('fs')
const https = require('https')

const download = (url, { filename }) => new Promise((resolve) => {
  https.get(url, (response) => {
    if (response.statusCode !== 200) { 
      return resolve({
        success: false,
        message: `download encountered a ${response.statusCode} status code from the remote service ${url}`
      })
    }
    
    const writeStream = response.pipe(fs.createWriteStream(`${filename}`))
    writeStream.on('close', () => {
      resolve({ message: `${filename} written successfully`, success: true })
    })
    writeStream.on('error', (err) => {
      resolve({
        success: false,
        message: `${err.name} \n download encountered an error while writing to disk \n message: ${err.message}`
      })
    })
  })
})

const runDownloads = async (url, [bottom, top]) => {
  const state = {
    directoryIndex: 0,
    isOnHitStreak: false,
    successfulDownloads: 0
  }
  
  for(let i = bottom; i < top; i++) {
    console.log(state)
    try {
      const { success, message } = download(url, {
        filename: `${i}.jpg`
      });
  
      // if (success) {
      //   console.log('success!')
      //   state.successfulDownloads = state.successfulDownloads + 1
      // } else {
      //   state.isOnHitStreak = false
      //   state.directoryIndex = state.directoryIndex + 1
      //   console.log(message)
      //   continue
      // }
  
      // if(state.isOnHitStreak !== true) {
      //   console.log('setting in the zone')
      //   state.isOnHitStreak = true
      // }
  
      // if(i % 100) {
      //   console.log(`Attempts: ~ ${i} \n Successes: ${state.successfulDownloads}`)
      // }
    } catch(err) {
      console.log(err)
    }
  }
}

// runDownloads([your url], [0,10000])