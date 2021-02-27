const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const readFile = (relativePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(resolveApp(relativePath), 'utf-8', (err, file) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(file)
            }
        })
    })
}

module.exports = { resolveApp, appDirectory, readFile }