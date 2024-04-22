const express = require("express")

const app = express()

app.get("/", (req, res)=>{
    res.send("Server is running.")
})

const PORT = 8000
app.listen(PORT, () => console.log(`Listening on ${PORT}`))