// wav.js by Frank Force 2020 - https://github.com/KilledByAPixel/ZzFX

export function GetWavBlob(sampleChannels, sampleRate = 44100)
{
    // adapted from https://gist.github.com/asanoboy/3979747
    const channelCount = sampleChannels.length;
    const sampleCount = sampleChannels[0].length;
    const length = channelCount * sampleCount;
    const buffer = new Int16Array(length + 23);

    console.assert(channelCount && sampleCount, 'No channels or samples found!');
    
    // wave header
    buffer[ 0] = 0x4952; // RI
    buffer[ 1] = 0x4646; // FF
    buffer[ 2] = (2*length + 15) & 0x0000ffff; // RIFF size
    buffer[ 3] = ((2*length + 15) & 0xffff0000) >> 16; // RIFF size
    buffer[ 4] = 0x4157; // WA
    buffer[ 5] = 0x4556; // VE
    buffer[ 6] = 0x6d66; // fm
    buffer[ 7] = 0x2074; // t
    buffer[ 8] = 0x0012; // fmt chunksize: 18
    buffer[ 9] = 0x0000; //
    buffer[10] = 0x0001; // format tag : 1 
    buffer[11] = channelCount; // channelCount
    buffer[12] = sampleRate & 0x0000ffff; // sample per sec
    buffer[13] = (sampleRate & 0xffff0000) >> 16; // sample per sec
    buffer[14] = (2*channelCount*sampleRate) & 0x0000ffff; // byte per sec
    buffer[15] = ((2*channelCount*sampleRate) & 0xffff0000) >> 16; // byte per sec
    buffer[16] = 0x0004; // block align
    buffer[17] = 0x0010; // bit per sample
    buffer[18] = 0x0000; // cb size
    buffer[19] = 0x6164; // da
    buffer[20] = 0x6174; // ta
    buffer[21] = (2*length) & 0x0000ffff; // data size[byte]
    buffer[22] = ((2*length) & 0xffff0000) >> 16; // data size[byte]	

    // copy samples to buffer
    for (let i = 0; i < sampleCount; i++)
    for (let j = 0; j < channelCount; j++)
    {
        const s = sampleChannels[j][i];
        buffer[i*channelCount + j + 23] = s>=1 ? (1<<15) - 1 : (s * (1<<15) | 0);
    }

    // build the blob
    let end = 0;
    let bufferNeedle = 0;
    const blobData = [];
    const GetBuffer = (length) =>
    {
        end = bufferNeedle + length >= buffer.length;
        const rt = new Int16Array(end? buffer.length - bufferNeedle : length);
        for(let i = 0; i < rt.length; i++)
            rt[i] = buffer[i + bufferNeedle];
        bufferNeedle += rt.length;
        return rt.buffer;
    }
    while ( !end ) blobData.push(GetBuffer(1e3));
    
    return new Blob(blobData, {type:'audio/wav'});
}