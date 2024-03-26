const { zzfx, zzfxG, zzfxP } = require("./ZzFXMicro");

describe("ZzFXMicro sound generation", () => {
  test("sound generation with default parameters", () => {
    // Generate sound with default parameters
    const samples = zzfxG();
    expect(samples).toBeInstanceOf(Array);
    expect(samples.length).toBeGreaterThan(0);

    // Play generated sound
    const source = zzfxP(samples);
    expect(source).toBeDefined();
    expect(source.start).toBeDefined();
  });

  test("sound generation with specific non-default parameters", () => {
    // Generate sound with specific non-default parameters
    const samples = zzfxG(
      0.5,
      0.1,
      440,
      0.1,
      0.2,
      0.3,
      1,
      2,
      0.01,
      0.02,
      0.5,
      0.1,
      0.2,
      0.3,
      0.4,
      0.5,
      0.6,
      0.7,
      0.8,
      0.9
    );
    expect(samples).toBeInstanceOf(Array);
    expect(samples.length).toBeGreaterThan(0);

    // Play generated sound
    const source = zzfxP(samples);
    expect(source).toBeDefined();
    expect(source.start).toBeDefined();
  });

  test("sound generation with extreme parameter values", () => {
    // Generate sound with extreme parameter values
    const samples = zzfxG(
      1,
      1,
      20000,
      0.1,
      0.1,
      0.1,
      3,
      2,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    );
    expect(samples).toBeInstanceOf(Array);
    expect(samples.length).toBeGreaterThan(0);

    // Play generated sound
    const source = zzfxP(samples);
    expect(source).toBeDefined();
    expect(source.start).toBeDefined();
  });

  // Test case to verify the effect of each parameter individually
  test("sound generation verifying the effect of each parameter individually", () => {
    // Test each parameter individually by varying one parameter while keeping others default
    const defaultSamples = zzfxG();
    const volumeChangedSamples = zzfxG(0.5);
    const randomnessChangedSamples = zzfxG(1, 0.1);
    const frequencyChangedSamples = zzfxG(1, 0.05, 440);
    // Add tests for other parameters as needed

    // Expect the samples to be different when a parameter is changed
    expect(volumeChangedSamples).not.toEqual(defaultSamples);
    expect(randomnessChangedSamples).not.toEqual(defaultSamples);
    expect(frequencyChangedSamples).not.toEqual(defaultSamples);
    // Add expects for other parameters as tested
  });
});
