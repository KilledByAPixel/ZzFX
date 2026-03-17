export type ZzfxWaveShape = 0 | 1 | 2 | 3 | 4 | 5

export type ZzfxParams = [
    volume?: number,
    randomness?: number,
    frequency?: number,
    attack?: number,
    sustain?: number,
    release?: number,
    shape?: ZzfxWaveShape,
    shapeCurve?: number,
    slide?: number,
    deltaSlide?: number,
    pitchJump?: number,
    pitchJumpTime?: number,
    repeatTime?: number,
    noise?: number,
    modulation?: number,
    bitCrush?: number,
    delay?: number,
    sustainVolume?: number,
    decay?: number,
    tremolo?: number,
    filter?: number
]

export type ZzfxReturn = AudioBufferSourceNode

export function zzfx(...parameters: ZzfxParams): ZzfxReturn

export const ZZFX: {
    volume: number
    sampleRate: number
    audioContext: AudioContext
    play: (...parameters: ZzfxParams) => ZzfxReturn
    playSamples: (
        sampleChannels: number[][],
        volumeScale?: number,
        rate?: number,
        pan?: number,
        loop?: boolean
    ) => ZzfxReturn
    buildSamples: (...parameters: ZzfxParams) => number[]
    getNote: (semitoneOffset: number, rootNoteFrequency: number) => number
}

export class ZZFXSound {
    constructor(zzfxSound?: ZzfxParams)
    play(
        volume?: number,
        pitch?: number,
        randomnessScale?: number,
        pan?: number,
        loop?: boolean
    ): AudioBufferSourceNode | undefined
}
