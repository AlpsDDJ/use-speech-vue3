import {SpeechRecognitionOptios, StartSR, StopSR, UseSpeechRecognitionReturn} from "../types";
import {waitFor} from "../utils";
import {ref} from "vue-demi";

const defaultOptions: SpeechRecognitionOptios = {
    lang: window.navigator.language ?? 'zh-CN',
    continuous: false,
    interimResults: true
}

export const useSpeechRecognition = (options?: SpeechRecognitionOptios): UseSpeechRecognitionReturn => {
    let recognition: any = null
    const results = ref<string[]>([])
    // const content = ref<string>('')
    const speeching = ref<boolean>(false)
    const speechTimer = ref<number>(0)
    const waitStop = ref<boolean>(false)
    let speechTimerInterval: any

    const opts = {...defaultOptions, ...options}
    const tempContent = ref<string>('')
    try {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
        console.log('SpeechRecognition: ', recognition)
    } catch (error) {
        throw new Error('浏览器不支持语音识别')
    }

    if (recognition) {
        recognition.continuous = opts.continuous
        recognition.interimResults = opts.interimResults
        recognition.lang = opts.lang // 设置为语言
        // if (opts.grammars) {
        //     // ts-ignore
        //     const speechRecognitionList = new SpeechGrammarList();
        //     opts.grammars.forEach(item => {
        //         item && speechRecognitionList.addFromString(item, 1)
        //     })
        //     recognition.grammars = speechRecognitionList
        // }
        recognition.onresult = (event: any) => {
            const result = event.results[event.results.length - 1];
            const transcript = result[0].transcript;
            if (result.isFinal) {
                waitStop.value && (speeching.value = false)
                results.value.push(tempContent.value)
                tempContent.value = ''
                if (typeof opts.onresult === 'function') {
                    opts.onresult(results.value.join())
                    console.debug(`STT Result:`, results.value.join())
                }
            } else {
                tempContent.value = transcript;
                if (typeof opts.onresult === 'function') {
                    opts.onresult(results.value.join() + transcript)
                }
            }
        }
        recognition.onend = () => {
            console.log('STT end: ', waitStop.value)
            opts.coiled && !waitStop.value && recognition.start()
        }
        recognition.onerror = (event: any) => {
            console.log('STT error', event)
            speeching.value = false
            if(typeof opts.onerror === 'function') {
                opts.onerror(event)
            }
        }
    } else {
        if(typeof opts.onerror === 'function') {
            opts.onerror(new Error('浏览器不支持语音识别'))
        }
    }

    const start: StartSR = async (isNew: boolean = true) => {
        if (recognition) {
            console.log('STT Start')
            if (speeching.value) {
                return
            }
            if (isNew) {
                speechTimerInterval && clearInterval(speechTimerInterval)
                speechTimerInterval = setInterval(() => {
                    speechTimer.value += 1
                }, 1000)
                speeching.value = true
                waitStop.value = false
                speechTimer.value = 0
                results.value = []
                // content.value = ''
            }
            await recognition.start()
        }
    }


    const stop: StopSR = async (): Promise<string | undefined> => {
        if (recognition && speeching.value) {
            console.log('STT Stop')
            waitStop.value = true
            await recognition.stop()
            await waitFor(() => speeching.value, 30)
            return results.value.join()
        }
    }

    return {
        start,
        stop,
        recognition,
        speechTimer,
        speeching,
        results
    }
}