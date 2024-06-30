// wav.js by Frank Force - https://github.com/KilledByAPixel/ZzFX

export function buildWavURL(sampleChannels, sampleRate = 44100)
{
    const channelCount = sampleChannels.length;
    const sampleCount = sampleChannels[0].length;
    const length = channelCount * sampleCount;
    const headerSize = 23;
    const buffer = new Int16Array(length + headerSize);
    console.assert(channelCount && sampleCount, 'No channels or samples found!');

    {    
        // wave header adapted from https://gist.github.com/asanoboy/3979747

        // RIFF (ascii)
        buffer[ 0] = 0x4952; // RF
        buffer[ 1] = 0x4646; // FF

        // RIFF size
        const dataSize = 2*length;
        const riffSize = dataSize + headerSize*2 - 8;
        buffer[ 2] = riffSize & 0x0000ffff;
        buffer[ 3] = (riffSize & 0xffff0000) >> 16;

        // WAVE (ascii)
        buffer[ 4] = 0x4157; // WA
        buffer[ 5] = 0x4556; // VE

        // fmt (ascii)
        buffer[ 6] = 0x6d66; // fm
        buffer[ 7] = 0x2074; // t

        // format chunk size: 18
        buffer[ 8] = 0x0012; 
        buffer[ 9] = 0x0000;

        // format tag: 1 (PCM format)
        buffer[10] = 0x0001;

        // channel count
        buffer[11] = channelCount;

        // samples per second
        buffer[12] = sampleRate & 0x0000ffff;
        buffer[13] = (sampleRate & 0xffff0000) >> 16;

        // bytes per second
        buffer[14] = (2*channelCount*sampleRate) & 0x0000ffff;
        buffer[15] = ((2*channelCount*sampleRate) & 0xffff0000) >> 16;

        // sample size
        buffer[16] = 0x0004; // bytes per sample: 4
        buffer[17] = 0x0010; // bit per sample: 16
        buffer[18] = 0x0000; // padding

        // DATA (ascii)
        buffer[19] = 0x6164; // DA
        buffer[20] = 0x6174; // TA

        // data size
        buffer[21] = dataSize & 0x0000ffff;
        buffer[22] = (dataSize & 0xffff0000) >> 16;
    }

    // copy samples to buffer
    for (let j = channelCount; j--;)
    for (let i = sampleCount; i--;)
    {
        const s = sampleChannels[j][i];
        buffer[i*channelCount + j + headerSize] = s<1 ? (s * (1<<15) | 0) : (1<<15) - 1;
    }

    // return the url
    const blob = new Blob([buffer], {type:'audio/wav'});
    return URL.createObjectURL(blob);
}