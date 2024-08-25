import express from 'express'
import mongoose from 'mongoose';
const app = express()
const port = 3000


// getting-started.js

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process);

}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })