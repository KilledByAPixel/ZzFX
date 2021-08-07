# ZzFX - Zuper Zmall Zound Zynth

## [ZzFX Sound Designer](https://killedbyapixel.github.io/ZzFX) / [ZzFX Music](https://keithclark.github.io/ZzFXM/) / [ZzFX Sound Board Demo](https://codepen.io/KilledByAPixel/full/BaowKzv)

## ZzFX Features

- Tiny synth engine with 20 controllable parameters.
- Play sounds via code, no need for sound asset files.
- Compatible with nearly all web browsers.
- Small code footprint, the micro version is under 1 kilobyte uncompressed.
- Can produce a large variety of sound effect types.
- Sounds can be played with a short function call. zzfx(...[,,,,.1,,,,9])
- No additional libraries or dependencies are required.
- Open source with MIT license, you can use this for anything!

# How to Use

* Download from github or use `npm install zzfx`
* Import ZZFX as a module with using `import {ZZFX, zzfx} from './ZzFX.js'`
* Or paste the code from [ZzFXMicro.min.js](https://github.com/KilledByAPixel/ZzFX/blob/master/ZzFXMicro.min.js)
* To play a sound just call zzfx(), something like `zzfx(...[,,,,.1,,,,9])`
* Use [the ZzFX sound designer web app](https://killedbyapixel.github.io/ZzFX) to create new sounds.

Here are a few more examples examples...

```
zzfx(...[,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17]); // Game Over
zzfx(...[,,537,.02,.02,.22,1,1.59,-6.98,4.97]); // Heart
zzfx(...[1.5,.8,270,,.1,,1,1.5,,,,,,,,.1,.01]); // Piano
zzfx(...[,,129,.01,,.15,,,,,,,,5]); // Drum
```

![ZzFX Image](/screenshot.jpg)

## ZzFX Music

- [ZzFX now supports music via ZzFXM by Keith Clark!](https://keithclark.github.io/ZzFXM/)
- Both the player and songs are super tiny and compress well.
- [NoteCraft](https://killedbyapixel.github.io/NoteCraft/) can also export to ZzFXM.

## ZzFX UI Features

- Generates random sounds from presets.
- Sound list is automatically saved.
- Each parameter can be modified with constraints.
- Lock and mutate buttons for each parameter.
- Sounds can be renamed.
- Shortens code for zzfx sound calls.
- Displays image of sound wave when played.
- Sounds can be marked as favorites to prevent removal.
- Sounds can be loaded by pasting zzfx code for easy sharing.
- List of sounds can be exported and imported.
- Supports drag-and-drop of exported files into sound list.
- Supports saving sounds as wav files for offline playback.

## Games Using ZzFX

- [Bogus Roads](https://www.newgrounds.com/portal/view/747570)
- [Note Craft](https://js13kgames.com/entries/notecraft)
- [The Wandering Wraith](https://js13kgames.com/entries/the-wandering-wraith)
- [Bounce Back](https://www.newgrounds.com/portal/view/755171)
- [Egg Time Rewind](https://killedbyapixel.itch.io/egg-time)
- [Hue Jumper](https://killedbyapixel.itch.io/hue-jumper)
- [Bubba's Back Room](https://js13kgames.com/entries/bubbas-back-room)
- [Backstabber Hero](https://js13kgames.com/entries/backstabber-hero)
- [Spendotron: 2019](https://killedbyapixel.itch.io/currency-wars)
- [Dioretsa](https://js13kgames.com/entries/20461-dioretsa)
- [Back 2 Back](https://js13kgames.com/entries/back-2-back)
- [Quick Wins](https://js13kgames.com/entries/quick-wins)
- [Back Relax](http://js13kgames.com/entries/back-relax)
- [Back To The Island](https://js13kgames.com/entries/back-to-the-island)
- [Backspace It](http://js13kgames.com/entries/backspace-it)
- [Back To The Stars](https://js13kgames.com/entries/back-to-the-stars)
- [Can't Get Back](https://js13kgames.com/entries/cant-get-back)
- [Letchworth Village](https://js13kgames.com/entries/letchworth-village)
- [Noegnud](https://js13kgames.com/entries/noegnud)
- [Sausage Redemption](https://gogoprog.itch.io/sausage-redemption)
- [Marshmallow Sky](https://github.com/baturinsky/marshmallow-sky) 
- [Big Champ](https://js13kgames.com/entries/big-champ)
- [I want to google the game](https://js13kgames.com/entries/i-want-to-google-the-game)
- [Edge Not Found](https://js13kgames.com/entries/edge-not-found)
- [Stolen Sword](https://js13kgames.com/entries/stolen-sword)
- [Highway 404](https://js13kgames.com/entries/highway-404)
- [The Last Spartan](https://js13kgames.com/entries/the-last-spartan)
- [OS13k](https://github.com/KilledByAPixel/OS13k)

![ZzFX Image](/favicon.png) 
