var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')
var mime = require('./mime').types
var config = require('./config')
var server = http.createServer(function(req, res){
    var pathname = url.parse(req.url).pathname
    var realPath = 'assets' + pathname
    var ext = path.extname(realPath)
    ext = ext ? ext.slice(1) : 'unknown'
    var contentType = mime[ext] || 'text/plain'
    if(ext.match(config.Expires.fileMatch)){
        var expires = new Date()
        expires.setTime(expires.getTime() + config.Expires.maxAge * 1000)
        res.setHeader('Expires', expires.toUTCString())
        res.setHeader('Cache-Control', 'max-age='+ config.Expires.maxAge)
    }

    fs.stat(realPath, function(err, stat){
        var lastModified = stat.mtime.toUTCString()
        res.setHeader('Last-Modified', lastModified)
        if(req.headers['if-modified-since'] && lastModified === req.headers['if-modified-since']){
            res.writeHead(304, 'Not Modified')
            res.end()
        }else{
            fs.exists(realPath, function(exists){
                if(!exists){
                    res.writeHead(404, {'Content-Type':'text/plain'})
                    res.write('This req URL'+ pathname + 'is not find')
                    res.end()
                }else{
                    fs.readFile(realPath, 'binary', function(err, file){
                        if(err){
                            res.writeHead(500, {'Content-Type':'text/plain'})
                            res.end()
                        }else{
                            res.writeHead(200, {'Content-Type': contentType})
                            res.write(file, 'binary')
                            res.end()
                        }
                    })
                }
            })
        }
     })
})
server.listen('8888')
console.log('Server running at port 8888')