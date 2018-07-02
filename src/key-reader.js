const readline = require('readline')
const chalk = require('chalk')

class KeyReader {
  constructor () {
    readline.emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true)

    console.log(`Exit with ${chalk.red('q')} or ${chalk.red('ctrl+c')}`)

    process.stdin.on('keypress', (str, key) => {
      // Exit on q or ctrl+c.
      if (key.name === 'q' || key.sequence === '\u0003') {
        console.log('\n\n', chalk.gray('Bye!'))
        process.exit()
      }

      if (typeof this.onKeyCallback === 'function') {
        this.onKeyCallback(key)
      }
    })
  }

  onKey (callback) {
    this.onKeyCallback = callback
  }
}

module.exports = KeyReader
