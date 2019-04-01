# ZzFX - A zuper zmall open zource zound fx zynth for java zcript gamez
By Frank Force - 2019

ZzFX Features
- Micro synth engine with 6 controllable parameters, you can add more.
- Seeded sounds can also be played using as few as 4 bytes, ex: z(3)
- Able to produce a wide variety of sound effect types.
- Tiny footprint, after being minified with closure ZzFX lib is 429 bytes.
- Compresses well with JSCrush (alongside the rest of your game)
- You can include just the Z function by itself if you don't want seeds.

ZzFX UI Features
- This entry is mostly just a wrapper around ZzFX.
- When the page loads it is filled with cards each corresponding to a seed.
- Just click on a card to play the sound for that seed.
- Each card also has a unique visual apearance tied to that seed.
- You can click on the ZzFX logo to copy the last played seed or change it!
- There is a section in code to set up a preset custom card layout.

Additional notes...
- Be careful of variable name collisions! vars used are ZzFfXRr, don't use them.
- If you use closure compiler, it will shorten the internal variable names.
- You can use R() instead of Math.Random() to save space.
- Feel free to completely modify any of this code!
- Try playing multiple sounds at once for unique effects.
- You can also use negative seeds.
- Try using any repeated numbers in your code as seeds, maybe you'll get lucky.
- There is built in 5% frequency randomness in z(), you can change it.
- You can also add parameters to z(), like a float to scale volume by, etc.
