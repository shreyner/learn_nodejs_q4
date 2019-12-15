import * as fs from "fs"
import { pipeline } from "stream";
import csvtojson from "csvtojson";

const logError = (...arg) => console.error(arg);

const sourceFilePath = "./cvs/node_mentoring_t1_2_input_example.csv";
const targetFilePath = "./data.txt";

const sourceFileStream = fs.createReadStream(sourceFilePath);
const targetWriteStream = fs.createWriteStream(targetFilePath);

pipeline(
  sourceFileStream,
  csvtojson(),
  targetWriteStream,
  err => {
    if (err) {
      logError(err);
      return;
    }

    console.log("Success");
  }
);

