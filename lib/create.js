const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const Generator = require("./Generator");
const figlet = require("figlet");

// 接收用户输入的项目名称和其他参数
module.exports = async function (name, options) {
  console.log(
    "\r\n" +
      figlet.textSync("VOILE", {
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
  );

  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetAir = path.join(cwd, name);

  // 判断是否存在相同的文件夹(项目)名
  if (fs.existsSync(targetAir)) {
    // 如果目录存在，判断是否强制覆盖
    if (options.force) {
      // 如果强制覆盖，直接删除已存在的目录
      await fs.remove(targetAir);
    } else {
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "Target directory already exists Pick an action:",
          choices: [
            {
              name: "Overwrite",
              value: "overwrite",
            },
            {
              name: "Cancel",
              value: false,
            },
          ],
        },
      ]);
      // 如果用户拒绝覆盖则停止剩余操作
      if (!action) {
        return;
      } else if (action === "overwrite") {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`);
        await fs.remove(targetAir);
      }
    }
  }

  // 新建generator类
  const generator = new Generator(name, targetAir);
  generator.create();
};
