## 安装
```shell
npm i use-speech-vue3
```
```shell
yarn add use-speech-vue3
```
```shell
pnpm i use-speech-vue3
```
## @Model 装饰器示例

```typescript
import {useSpeechRecognition} from "use-speech-vue3";

const onSTTResult = (result?: string) => {
    console.log(result)
}

/**
 * coiled: 是否开启连续识别
 */
const {results, speeching, speechTimer, start, stop} = useSpeechRecognition({ onresult: onSTTResult, coiled: true })

// 开始识别
await start()
// 停止识别
const content = await stop()
```