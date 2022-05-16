var fs = require('fs');

const fileContents = `export const apiKeys = {
  apiKey: '${process.env.PROD_API_KEY}',
  clientId: '240277',
};
`;

const targetPath = `./src/environments/keys.ts`;
fs.writeFile(targetPath, fileContents, function (error) {
    if (error) {
      console.log(error);
    }
    console.log(`Output generated at ${targetPath}`);
  });
