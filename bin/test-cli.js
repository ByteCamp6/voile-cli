#! /usr/bin/env node
const program = require("commander");
const chalk = require("chalk");

// 定义create命令
program
  .command("create <app-name>") // <app-name>为必须参数
  .description(chalk.cyan("create a new project"))
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, options) => {
    // 打印执行结果
    require("../lib/create")(name, options);
  });

// package.json 中存取了项目的版本号 version
program.version(`voile-cli ${require("../package.json").version}`);

// 配置教授架的名称和命令格式
program.name("voile-cli").usage(`<command> [option]`);

// 创建指令
program.on("--help", function () {
  console.log();
  console.log(
    `Run ${chalk.cyan(
      "voile-cli <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});

// 解析用户执行命令传入参数
program.parse(process.argv);
