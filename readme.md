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

```typescript
import {useSpeechRecognition} from "use-speech-vue3";

const onSTTResult = (result?: string) => {
    console.log(result)
}

/**
 * autoRestart: 识别意外中断后是否自动重新开始识别
 */
const {results, speeching, speechTimer, start, stop} = useSpeechRecognition({ onresult: onSTTResult, autoRestart: true })

// 开始识别
await start()
// 停止识别
const content = await stop()
```