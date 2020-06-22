// flags
var 
sticky  = 2**0, // always save position and if open
reload  = 2**1, // show reload button
awake   = 2**2, // prevent dim and pause when not active
full    = 2**3, // show full screen button
resize  = 2**4, // show resize buttons (apect ratio maintained)
code    = 2**5, // show code button (cant show code if help is set)

// defaults
defaultFlags = full|reload|resize,
defaultWidth = 720, defaultHeight = 405, // 16:9 aspect

// program format
//[src, icon, width, height, flags, name, help, folder]

programs = 
[
[,'❌',,,,'Close All'],
['help.html','<b><span style=color:#0f0>?',380,400,sticky|full|resize,,'Check here to see help when available.\nSome programs have a option to show code instead.\n\nHave fun! ✌️😄'],
['moreInfo.html','👨‍💻'],
[,'⚙️',,,,'System',,
[
    ['system/settings.html','🎚️',470,160,sticky],
    ['system/trophyCase.html','🏆',,,full|resize|sticky],
    ['system/clock.dweet.js','🕰️',200,200,sticky|code|awake],
    ['system/systemTest.html',,,,full|resize|code],
    [,'📁',,,,'Test',,
    [
        ['index.html','✌️😄',,,,'Meta OS13k'],
    ]],
]],
[,'🛠️',,,,'Apps',,
[
    ['apps/console.html','<span style=color:#0f0;background:#000;font-family:monospace>JS>'],
    ['apps/stickyNote.html','✍️',300,263,sticky|reload,,'Ctrl+B - Bold\nCtrl+I - Italic\nCtrl+U - Underline\n\Reload to clear'],
    ['apps/photoBooth.html','📸',1400,550],
    ['apps/unicodeToys.html','𝖀',500,800],
    ['apps/miniShadertoy.html','𝓢',340,400],
    ['apps/textEditor.html','📝'],
]],
[,'🎮',,,,'Games',,
[
    ['games/lavaRush.html','🌋',640,400],
    ['games/swatch.html','🌈',320,340,reload],
    ['games/sn1ke.html','👀',400,280],
    ['games/tetris.html','<span style=font-size:10>▀█▀',210,380,reload],
    ['games/queensGambit.html','<span style=color:#f0f>♛'],
    ['games/freeCell.html','♠️',800,900,full|reload],
    ['games/hueJumper.html','🌲'],
    ['dweets/bogusRoads.dweet.js','🛣️'],
]],
[,'🎶',,,,'Music',,
[
    ['music/soundSeeds.html','🔊',550,480,full],
    ['music/minBytes.html','<span style=color:#f00>𝓜',450,450],
    ['music/piano.html','🎹',520,480,full],
    ['music/bach.dweet.js','♫'],
]],
[,'🤖',,,,'Toys',,
[
    ['toys/zzfxSoundBoard.html','𝐙𝐙',700,420,,'ZzFX Sound Board'],
    ['toys/zzartLandscape.shader.txt','𝓩',,,,'ZzFX Landscape'],
    ['toys/infiniteYinYangs.shader.txt','<span style=color:#f00>☯'],
    ['toys/vogelSpiral.shader.txt','🌀'],
]],
[,'<b>III',,,,'Dweets',,
[
    ['dweets/blackHole.dweet.js','🌌'],
    ['dweets/underwaterCavern.dweet.js','🌊'],
    ['dweets/cityTraffic.dweet.js','🚌'],
    ['dweets/trainSet.dweet.js','🚂'],
    ['dweets/automaticBreakout.dweet.js','■'],
    ['dweets/colorZoom.dweet.js','❤️'],
    ['dweets/triFractal.dweet.js','🔺'],
]],
]; // programs