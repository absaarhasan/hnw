var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

app.get('/design', function(req, res) {
    res.sendfile('./public/page_BUILDER.html');
});

app.get('/article', function(req, res) {
    res.sendfile('./views/article.html');
});

app.listen(3000);