import { zzfx, ZZFX } from "./ZzFX";

// Initialize the ZZFX.x with a new AudioContext to fix the issue
ZZFX.x = new AudioContext();

describe("ZzFX Sound Synthesis", () => {
  // Removed the beforeEach block as it is no longer needed

  test("play sound with default parameters", () => {
    const sound = zzfx();
    expect(sound).toBeDefined();
  });

  test("play sound with custom parameters", () => {
    const sound = zzfx(
      1,
      0.1,
      440,
      0.1,
      0.2,
      0.3,
      1,
      1.5,
      0.05,
      0.001,
      0.2,
      0.1,
      0.3,
      0.1,
      0.2,
      0.01,
      0.05,
      0.7,
      0.6,
      0.05
    );
    expect(sound).toBeDefined();
  });

  test("get frequency of a musical note", () => {
    const frequency = ZZFX.getNote(12);
    expect(frequency).toBeCloseTo(880, 5);
  });

  // Added missing test case for various parameters
  test("zzfx function with various parameters for sound synthesis", () => {
    // Test various parameter combinations
    expect(zzfx(1.0)).toBeDefined();
    expect(zzfx(0.5, 0.05, 523.25)).toBeDefined(); // C5 note
    expect(zzfx(0.5, 0.1, 659.25, 0.1, 0.2, 0.3, 2)).toBeDefined(); // E5 note with custom shape
  });

  // Added test case for negative values
  test("sound synthesis with negative values for parameters", () => {
    const sound = zzfx(
      -1,
      -0.1,
      -440,
      -0.1,
      -0.2,
      -0.3,
      -1,
      -1.5,
      -0.05,
      -0.001,
      -0.2,
      -0.1,
      -0.3,
      -0.1,
      -0.2,
      -0.01,
      -0.05,
      -0.7,
      -0.6,
      -0.05
    );
    expect(sound).toBeDefined();
  });
});
