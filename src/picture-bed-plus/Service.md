---
title: 服务接口
---
::: info 说明
为了提供更好的用户体验，我们特意为本插件开放了对外服务接口，以便更多的软件和插件能够与之兼容使用。
建议使用提供的 [互联 SDK](https://github.com/xiaou66/interconnect) 对接
:::



### 初始化链接客户端

```typescript
const { ServiceClient } = require('@xiaou66/interconnect-client');
const path = require('path');
const pipPath = path.join(utools.getPath('userData'), '.pip');
try {
  const client = new ServiceClient(require('net'),
    path.join(pipPath, 'picture-bed-plus'),
    '当前软件或插件名');
}catch (e) {
  // 链接失败, 可以做出提醒或者使用跳转「图床 Plus」插件上传
}

```

### 获取用户配置存储源

- 服务类型: service.info.getUploadWayList
- 参数
- 返回值
```typescript
// 定义子配置项类型
interface ChildItem {
  // 存储源/场景名称
  label: string;
  
  // 上传方式 id
  value: string;
}

// 定义主配置项类型
interface ConfigItem {
  // 场景/存储
  label: string;
  // 值
  value: string;
  // 用户配置的所有上传方式
  children: ChildItem[];
}
```

使用案例

```typescript
const res: ConfigItem[] = await client
  .callServiceMethod('service.info.getUploadWayList');
```
结果例子
```json
[
  {
    "label": "上传场景",
    "value": "uploadScene",
    "children": []
  },
  {
    "label": "存储源",
    "value": "storageSource",
    "children": [
      {
        "label": "16图床",
        "value": "Xn7YFEQmOYSznmZyu3zSi"
      }
    ]
  }
]

```
### 同步上传文件

::: info 使用场景
需要同步获取到上传文件 URL 时使用
:::

- 服务类型: service.upload.file.sync
- 参数
```typescript
export interface IUploadFileParams {
  // [可选] 上传方式 id 可由「用户填写」或「获取用户配置存储源」服务类型获取
  uploadWay?: string;
  // [可选] 文件路径 与 base64 参数必填一项
  filePath?: string;
  // [可选] 文件的 base64 与 filePath 参数必填一项
  base64?: string;
}
```
- 返回结果

```typescript
export interface FileUploadResult {
  // 返回文件后上传地址
  url: string;
}
```
使用案例
```typescript
const res: FileUploadResult = await client
  .callServiceMethod('service.upload.file.sync', {
    filePath: '/Users/xiaou/Downloads/文件.svg' 
});
```
结果例子
```typescript
{ 
  url: 'https://xxx.xx.xxx/xxx.svg' 
}
```
### 异步上传文件

::: info 使用场景
不需要同步获取到上传文件 URL 时使用
:::

- 服务类型: service.upload.file.async
- 参数
```typescript
export interface IUploadFileParams {
  // [可选] 上传方式 id 可由「用户填写」或「获取用户配置存储源」服务类型获取
  uploadWay?: string;
  // [可选] 文件路径 与 base64 参数必填一项
  filePath?: string;
  // [可选] 文件的 base64 与 filePath 参数必填一项
  base64?: string;
}
```
- 返回结果
无

使用案例
```typescript
const res: FileUploadResult = await client
  .callServiceMethod('service.upload.file.async', {
    filePath: '/Users/xiaou/Downloads/文件.svg' 
});
```

