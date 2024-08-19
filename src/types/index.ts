import {Ref} from "vue-demi";

export interface SpeechRecognitionOptios {
    coiled?: boolean
    lang?: string
    continuous?: boolean
    interimResults?: boolean
    onresult?: (content?: string) => void
    onerror?: (error: any) => void
    grammars?: string[]
}

export interface StartSR {
    (isNew?: boolean): Promise<void>
}

export interface StopSR {
    (): Promise<string | undefined>
}

export interface UseSpeechRecognitionReturn {
    start: StartSR
    stop: StopSR
    recognition: Ref<any>
    speechTimer: Ref<number>
    speeching: Ref<boolean>
    results: Ref<string[]>
}