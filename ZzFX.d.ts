export type ZzfxParams = [
    volume?: number,
    randomness?: number,
    frequency?: number,
    attack?: number,
    sustain?: number,
    release?: number,
    shape?: number,
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

export function zzfx(
    ...parameters: ZzfxParams
): AudioBufferSourceNode

export const ZZFX: {
    volume: number
    sampleRate: number
    audioContext: AudioContext
    play: (
        ...parameters: ZzfxParams
    ) => AudioBufferSourceNode
    playSamples: (
        sampleChannels: number[][],
        volumeScale?: number,
        rate?: number,
        pan?: number,
        loop?: boolean
    ) => AudioBufferSourceNode
    buildSamples: (
        ...parameters: ZzfxParams
    ) => number[]
    getNote: (
        semitoneOffset: number,
        rootNoteFrequency: number
    ) => number
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
