// figure out what set of credentials to return

process.env.NODE_ENV === 'production' ? module.exports = require('./prod') : module.exports = require('./dev');