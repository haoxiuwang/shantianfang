
import fs from "fs"
import path from "path"
const pagesDir = path.resolve('src/pages')
const outputFile = path.resolve('src/routeMap.js')

// 转换文件名为路由路径
function filenameToPath(filename) {
  const name = filename.replace(/\.(js|jsx|tsx)$/, '')
  if (name.toLowerCase() === 'home' || name.toLowerCase() === 'index') return '/'
  return '/' + name.toLowerCase()
}

const files = fs.readdirSync(pagesDir).filter(f => /\.(js|jsx|tsx)$/.test(f))

let content = 'export const routeMap = {\n'

for (const file of files) {
  const routePath = filenameToPath(file)
  content += `  '${routePath}': () => import('./pages/${file}'),\n`
}

content += '}\n'

fs.writeFileSync(outputFile, content, 'utf-8')
console.log(`Route map generated at ${outputFile}`)
