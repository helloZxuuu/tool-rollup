import commonjs from "@rollup/plugin-commonjs";
import strip from "@rollup/plugin-strip";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve"
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import path from 'path'
import pkg from './package.json'

export default [
  {
    input: "./src/index.ts", // 入口文件
    output: [
      {
        // 出口文件
        dir: path.dirname(pkg.module),
        format: "es", // es模块导出，支持按需加载
        name: pkg.name,
        exports: "named", // 指定导出模式（自动、默认、命名、无）
        preserveModules: true, // 保留模块结构
        preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
      },
    ],
    plugins: [
      nodeResolve({
        extensions: ["tsx", "ts", "jsx", "js"]
      }),
      // 处理外部依赖
      // resolve(),
      // 支持基于 CommonJS 模块引入
      commonjs(),
      // 支持 typescript，并导出声明文件
      typescript({
        outDir: "es",
        declaration: true,
        declarationDir: "es",
      }),
      // 支持 scss，并添加前缀
      postcss({
        plugins: [autoprefixer()],
      }),
      // 清除调试代码
      strip(),
    ],
  },
];