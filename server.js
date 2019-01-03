const express = require('express')
const serveStatic = require("serve-static")
const path = require('path')
const middleware = require('http-proxy-middleware')

app = express()
const options = {
	target: 'https://hart-rest-api.herokuapp.com', // target host
	changeOrigin: true, // needed for virtual hosted sites
	ws: true, // proxy websockets
	pathRewrite: {
		'^/v[1-9]': '/v1' // remove base path
	},
	router: {}
}
app.use(serveStatic(path.join(__dirname, 'dist')), middleware(options))

const port = process.env.PORT || 8080

app.listen(port)

console.log("start hart port :: " + port)

