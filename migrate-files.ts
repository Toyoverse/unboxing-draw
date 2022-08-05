import env from "dotenv";
import fs from "fs";
import { Client } from "node-scp";

env.config();

const host = process.env.FILE_SERVER_HOST;
const port = process.env.FILE_SERVER_PORT;
const username = process.env.FILE_SERVER_USERNAME;
const password = process.env.FILE_SERVER_PASSWORD;
const folder = process.env.FILE_SERVER_FOLDER || "/tmp/scp";
const localFolder = process.env.LOCAL_FILES_FOLDER || "./files";

const main = async () => {
  try {
    const scpClient = await Client({
      host,
      port,
      username,
      password,
    });
    await scpClient.uploadDir(localFolder, folder);
    scpClient.close();

    fs.rmdirSync(localFolder, { recursive: true });
  } catch (e) {
    console.log(e);
  }
};

main();
