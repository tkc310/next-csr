// @see https://www.graphql-code-generator.com/docs/getting-started/programmatic-usage
const fs = require('fs');
const readline = require('readline');
const { generate } = require('@graphql-codegen/cli');

const confirm = async (msg) => {
  const answer = await question(`${msg}(y/n): `);
  return answer.trim().toLowerCase() === 'y';
};

const question = (question) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readlineInterface.question(question, (answer) => {
      resolve(answer);
      readlineInterface.close();
    });
  });
};

async function exec(page) {
  const pagePath = `./src/components/pages/${page}`;
  const generatedPath = `./src/graphql/generated`;
  const outputPath = `${generatedPath}/pages/${page}.ts`;

  if (page) {
    const pageExists = fs.existsSync(pagePath);
    if (!pageExists) {
      throw `${pagePath}は存在しません`;
    }

    const fileExists = fs.existsSync(outputPath);
    if (fileExists && !(await confirm('上書きして良いですか？'))) {
      console.log('処理を終了します');
      process.exit();
    }
  } else {
    throw 'PAGEを指定してください';
  }

  const documents = `${pagePath}/**/*.graphql`;

  const generatedFiles = await generate(
    {
      schema: `${generatedPath}/schema.graphql`,
      generates: {
        [outputPath]: {
          documents,
          plugins: [
            'typescript',
            'typescript-operations',
            'typescript-react-apollo',
          ],
          config: {
            withHooks: true,
            withHOC: false,
            withComponent: false,
            reactApolloVersion: 3,
          },
        },
      },
    },
    true
  );

  const fileNames = generatedFiles.map((file) => `- ${file.filename}`);

  console.log(`------ 処理が成功しました ------
  作成されたファイル
  ${fileNames.join('\n')}\n--------------------------------`);
}

process.on('unhandledRejection', (error) => {
  console.log(`------ 処理が失敗しました ------
  理由: ${error}\n--------------------------------`);
  process.exit(1);
});

const page = process.env.PAGE || null;
exec(page);
