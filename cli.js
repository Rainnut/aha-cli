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
  // 目标目录
  const destDir = process.cwd()  // 终端中执行aha-cli命令，可通过process.cwd()获取对应路径
  fs.readdir(tmplDir, (err, files) => {
    if (err) throw err

    files.forEach(filename => {
      ejs.renderFile(path.resolve(tmplDir, filename), answers, (err, result) => {
        if (err) throw err

        fs.writeFileSync(path.resolve(destDir, filename), result)
      })
    })
  })
})