const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


let usersList = [{ _id: 'l32vR4DB3mMJ3mMmAgBnUgoq',
  username: '123dawdaw',}]
app.post('/api/users', (req, res) => {
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
  let userId = makeid(24)
  usersList.push({_id: userId, username: req.body.username})
  res.json({username: req.body.username, _id: userId})
})

app.get('/api/users', (req, res) => {
  res.json(usersList)
})

let exercises=[  {
  _id: 'l32vR4DB3mMJ3mMmAgBnUgoq',
  username: '123dawdaw',
  date: 'Sat, 31 May 2025 ',
  duration: '32',
  description: '1'
}, {
  _id: 'l32vR4DB3mMJ3mMmAgBnUgoq',
  username: '123dawdaw',
  date: 'Sat, 31 May 2025 ',
  duration: '123',
  description: '123'
}]

app.post("/api/users/:_id/exercises", (req, res) => {

  const getIndex = usersList.findIndex(function(index) {
    return index._id == req.params._id
  })

  let date;
  console.log("date", req.body.date)
  if(req.body.date == undefined || req.body.date == null || req.body.date == "") {
    console.log("puste")
    date = new Date().toUTCString().substring(0, 17).trim()
  } else {
    console.log("nie puste")
    date = req.body.date
  }

  exercises.push({
    _id: usersList[getIndex]._id,
    username: usersList[getIndex].username,
    date: date,
    duration: req.body.duration,
    description: req.body.description
  })
  console.log(exercises, date)
  res.json({
    _id: usersList[getIndex]._id,
    username: usersList[getIndex].username,
    date: date,
    duration: req.body.duration,
    description: req.body.description
  })
})

app.get("/api/users/:_id/logs", (req, res) => {
  console.log(req.query.limit)
  const getIndex = exercises.findIndex(function(index) {
    return index._id == req.params._id
  })
  let listOfLogs={_id: usersList[getIndex]._id, username: usersList[getIndex].username, count: "", log: ""}
  let uuhList = []
  
  exercises.forEach(function(element, i) {
    element._id == req.params._id
    uuhList.push({description: element.description,duration: Number(element.duration), date: element.date})
    i += 1
    listOfLogs.log = uuhList
    if(req.query.limit === undefined || req.query.limit === null ) {
      listOfLogs.log.length = i;
      listOfLogs.count = i

    } else {
      listOfLogs.count = req.query.limit
      listOfLogs.log.length = req.query.limit
    }
    console.log(element, i)
  });
  res.json(listOfLogs)

})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
