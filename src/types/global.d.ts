export {}

declare global {
    declare interface Window {
        SpeechRecognition?: any;
        webkitSpeechRecognition?: any;
        SpeechGrammarList?: any;
    }
    declare type SpeechGrammarList = any
}
