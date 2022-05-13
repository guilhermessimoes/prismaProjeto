import express from 'express'

const app = express()

app.get("/", (request, response ) => {
  return response.json({
    message: "Hello World"
  })
})

app.listen(4050, () => console.log("Server is running"))