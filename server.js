const express = require('express')
const app = express()
const cors = require('cors')
const port = 4001
const canvasAPI = require('node-canvas-api')
const { getDiscussions, flattenTopicAndReplies } = require('./canvasDiscussions')
const readCSV = require('./readCSV')

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

// Make API call to Canvas API here
canvasAPI.getSelf()
  .then(self => console.log(self))


// Make endpoint for getSelf here
app.get('/getSelf', async (req, res) => {
    // we need to now make a call to the Canvas API,
    // wait for the response, then send the result to the frontend
    const self = await canvasAPI.getSelf()
    res.json(self)
  })

app.get('/getCourses', async (req, res) => {
    const self = await canvasAPI.getSelf()
    const id = self.id
    const courses = await canvasAPI.getCoursesByUser(id)
    res.json(courses)
})

app.get('/getDiscussions/:id', async (req, res)  => {
    const courseID = req.params.id
    // what should I do now?
    const discussion = await getDiscussions(parseInt(courseID))
    res.send(flattenTopicAndReplies(discussion))
  })

// Make endpoint for getDiscussions here
app.get('/getDiscussions', async (req, res) => {
    // we need to now make a call to the Canvas API,
    // wait for the response, then send the result to the frontend
    const discussion = await getDiscussions(69306)
    res.send(flattenTopicAndReplies(discussion))
  })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
