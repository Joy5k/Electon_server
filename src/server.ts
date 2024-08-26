import express from 'express'
import mongoose from 'mongoose';
import config from './app/config';
const app = express()
const port = 3000


// getting-started.js

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(config.database_url as string);

}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })