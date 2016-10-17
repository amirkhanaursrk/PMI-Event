var http = require('http');
var app = require('express')();
var server = http.createServer(app);
var io = require('socket.io')(server);
const fs = require('fs');
//app.use(express.bodyParser());

app.get('/post/:id', function (req, res) {
  // print to console
  console.log(req.params.id);
  fs.readFile('ncpmi.csv', function (err, data) {

    if (err) {
      return console.log(err);
    }

    //Convert and store csv information into a buffer. 
    bufferString = data.toString();
    arr = bufferString.split('\n');
    //Store information for each individual person in an array index. Split it by every newline in the csv file. 
    // arr = bufferString.split('\n'); 

    var jsonObj = [];
    var headers = arr[0].split(',');
    for (var i = 1; i < arr.length; i++) {
      var data = arr[i].split(',');
      var obj = {};
      for (var j = 0; j < data.length; j++) {
        obj[headers[j].trim()] = data[j].trim();
      }
      jsonObj.push(obj);
    }
    JSON.stringify(jsonObj);
    //console.log(jsonObj, req.params.id);
    function objectFindByKey(array, key, value) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
          return array[i];
        }
      }
      return null;
    }
    var result_obj = objectFindByKey(jsonObj, 'PMIMemberNum', req.params.id);
    console.log(result_obj['Registered']);
    result_obj['Registered'] === 'Yes' ? (io.emit('registered', result_obj), res.send(result_obj['FirstName'] + " " + result_obj['LastName'] + " Registration: Yes")) : (io.emit('nonregistered', result_obj), res.send(result_obj['FirstName'] + " " + result_obj['LastName'] + " Registration: No"));

  });




  // just call res.end(), or show as string on web
  //  res.send(JSON.stringify(req.body, null, 4));
});

var first_value = process.argv[2];

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', first_value);
});
server.listen(80, first_value, function () {
  console.log('Listening to port:  ' + 80);
});