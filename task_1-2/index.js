import * as fs from "fs"
import { pipeline } from "stream";
import csvtojson from "csvtojson";

const sourceFilePath = "./data/node_mentoring_t1_2_input_example.csv";
const targetFilePath = "./tmp/data.json";

const sourceFileStream = fs.createReadStream(sourceFilePath);
const targetWriteStream = fs.createWriteStream(targetFilePath);

pipeline(
  sourceFileStream,
  csvtojson(),
  targetWriteStream,
  err => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Success");
  }
);

