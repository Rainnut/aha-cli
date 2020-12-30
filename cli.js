#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'title name?'
  },
  {
    type: 'input',
    name: 'desc',
    message: 'desc name?'
  }
]).then(answers => {
  // answers: { name: '', desc: ''} 
  /* 根据用户回答的结果生成文件 */
  // 模板目录
  const tmplDir = path.resolve(__dirname, 'templates')
  // 目标目录：终端中执行aha-cli命令，可通过process.cwd()获取对应路径
  const destDir = process.cwd()  
  fs.readdir(tmplDir, (err, files) => {
    if (err) throw err
    // fs.readdir得到文件命名（files）
    files.forEach(filename => {
      // answers 对应配置信息通过参数传给ejs渲染模板文件
      ejs.renderFile(path.resolve(tmplDir, filename), answers, (err, result) => {
        if (err) throw err
        // ejs解析完成的文本，通过fs模块生成文件
        fs.writeFileSync(path.resolve(destDir, filename), result)
      })
    })
  })
})