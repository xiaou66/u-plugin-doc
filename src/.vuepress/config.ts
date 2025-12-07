import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";

import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

console.log(path.resolve(
  __dirname,
  "./components/HomePage.vue",
))
export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "文档中心",
  description: "",
  theme,
  // 和 PWA 一起启用
  // shouldPrefetch: false,
  alias: {
    // 你可以在这里覆盖或新增别名
    // 比如这里我们将 vuepress-theme-hope 主页组件改为自己主题下的 components/HomePage.vue
    "@theme-hope/components/home/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue",
    ),
  },
  // alias: {
  //   // 你可以在这里将别名定向到自己的组件
  //   // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
  //   "@theme-hope/components/home/HomePage": path.resolve(
  //     __dirname,
  //     "./components/HomePage.vue",
  //   ),
  // },
});
