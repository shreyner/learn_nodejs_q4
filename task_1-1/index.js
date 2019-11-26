import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

async function bootstrap() {
  for await (const line of rl) {
    console.log(line.split("").reverse().join(""), "\n");
  }
}

bootstrap();
