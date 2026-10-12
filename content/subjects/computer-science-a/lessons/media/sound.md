---
{
  "key": "media.sound",
  "title": "Sound: sampling, sampling rate and resolution",
  "summary": "Explain how sound is sampled and stored in binary, calculate sound file sizes, and describe the effect of changing sampling rate and resolution on accuracy and file size.",
  "concepts": [
    "acs.media.sound"
  ],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

When a presenter at a radio station in Mutare speaks into a microphone, the sound is a wave of air pressure that varies smoothly. A computer cannot store a smooth wave; it can only store numbers. Digital recording therefore measures the wave at regular intervals and stores each measurement in binary. How often it measures and how precisely it measures decide how accurate the recording is and how large the file will be. This lesson shows how sound is sampled and how to calculate the size of a sound file.

You should be able to convert bits to bytes, KiB and MiB, and to work with powers of 2.

## Key definitions

:::definition{term="Analogue signal"}
A signal that varies continuously, so that it can take any value in a range, such as the pressure wave of sound.
:::

:::definition{term="Digital signal"}
A signal stored as a sequence of binary numbers; it can only take a limited set of values.
:::

:::definition{term="Sampling"}
Measuring the amplitude (height) of an analogue sound wave at regular time intervals and storing each measurement as a binary number.
:::

:::definition{term="Sampling rate"}
The number of samples taken each second, measured in hertz (Hz). A rate of 8000 Hz means 8000 samples every second.
:::

:::definition{term="Sampling resolution"}
The number of bits used to store each sample. With n bits each sample can take one of 2^n values.
:::

## Sampling a sound

An analogue-to-digital converter measures the height of the wave at each sampling instant. The measurement is rounded to the nearest of the values that the resolution allows, then stored in binary. When the sound is played back, a digital-to-analogue converter turns the numbers into a varying voltage which drives a loudspeaker.

| Resolution (bits) | Number of possible sample values |
|:-:|:-:|
| 8 | 256 |
| 16 | 65536 |

A higher **sampling rate** records the wave at more points, so the shape of the wave is followed more closely and higher pitches are captured. A higher **sampling resolution** gives more possible values, so each measurement is closer to the real height of the wave and quiet detail is better preserved. Both make the recording closer to the original, which means more accurate or higher quality, but each also increases the file size.

If the sampling rate is too low, sounds with a high frequency change faster than the samples can follow, and they are lost or are heard as the wrong pitch. This effect is called aliasing, and here it is only an outline: a low rate loses the high frequencies.

## Calculating the file size

File size (bits) = sampling rate (Hz) × sampling resolution (bits) × time (seconds) × number of channels. A stereo recording has two channels; a mono recording has one.

:::worked-solution{title="Size of a 3-minute stereo recording sampled at 44100 Hz with 16-bit samples"}
1. Time = 3 × 60 = 180 seconds.
2. Bits = 44100 × 16 × 180 × 2 = 254016000.
3. Bytes = 254016000 ÷ 8 = 31752000.
4. In MiB = 31752000 ÷ 1024 ÷ 1024 = **30.28 MiB**.
:::

:::worked-solution{title="Size of a 90-second mono recording at 8000 Hz with 8-bit samples"}
1. Bits = 8000 × 8 × 90 × 1 = 5760000.
2. Bytes = 5760000 ÷ 8 = 720000.
3. In KiB = 720000 ÷ 1024 = **703.125 KiB**.
4. If the sampling rate is halved to 4000 Hz, the file is **360000 bytes**, exactly half the size, but high frequencies are lost.
:::

The file size is proportional to each of the four quantities. Doubling the rate, the resolution, the time or the number of channels doubles the file.

## Why the size matters

A large file takes more storage space and more time to send. The time to transfer a file is the number of bits divided by the transfer rate in bits per second.

:::example{title="Sending a voice recording over a slow link"}
A reporter in Chinhoyi sends the 90-second mono recording from the example above, 5760000 bits, over a mobile link that carries 64000 bits per second. The transfer takes 5760000 ÷ 64000 = 90 seconds. If the reporter had recorded at double the sampling rate, the file would be twice as large and the transfer would take 180 seconds. Compression (a later lesson) reduces file sizes further without recording at a lower rate.
:::

Each sample is rounded to the nearest value that the resolution allows. The difference between the real height of the wave and the stored value is small when there are many possible values (16 bits) and noticeable when there are few (8 bits), which is why quiet music recorded at a low resolution sounds rough.

## Choosing the sampling settings

| Situation | Suitable settings | Reason |
|:-:|:-:|:-:|
| A telephone call | Low rate, low resolution, mono | Speech needs only a limited range of frequencies; small data uses less bandwidth |
| A music track for a streaming service | High rate, 16-bit or more, stereo | Higher accuracy; both channels are needed |
| A voice memo on a phone | Medium rate, mono | Speech is clear and files are small |

:::keyfact{title="Cambridge and ZIMSEC"}
Sound sampling, rate, resolution and file-size calculations are Cambridge AS Level (Paper 1). They are not named in the ZIMSEC A Level syllabus, so these items are not tagged to ZIMSEC. Cambridge uses the terms sampling rate and sampling resolution (not "bit depth" for sound).
:::

## Common mistakes

:::mistake{title="Forgetting the number of channels"}
Stereo has two channels, so the file is twice the size of mono. Always check whether the recording is mono or stereo.
:::

:::mistake{title="Mixing minutes and seconds"}
The rate is in samples per second, so the time must be in seconds. Convert minutes to seconds before multiplying.
:::

:::mistake{title="Saying a higher rate makes the sound louder"}
Rate affects how accurately the shape of the wave is captured, not the volume. Loudness is the amplitude of the wave.
:::

:::mistake{title="Confusing rate and resolution"}
Sampling rate is how often the wave is measured (per second). Sampling resolution is how many bits each measurement uses.
:::

## Exam tips

:::exam-tip{title="Which papers test this"}
Cambridge Paper 1 asks for a file-size calculation, the effect of changing the rate or resolution on accuracy and file size, and reasons for compression. For **calculate**, write the multiplication in full and convert to the unit asked. For **explain the effect**, give both the quality effect and the file-size effect.
:::

:::exam-tip{title="Write the formula first"}
Start with "rate × resolution × time × channels". It earns the method mark even if the arithmetic goes wrong.
:::

:::exam-tip{title="Use the word accurate"}
A higher rate or resolution makes the recording a more accurate representation of the original sound. Use this wording rather than "better".
:::

## Summary

:::summary
- Sound is sampled: the amplitude is measured at regular intervals and stored in binary.
- Sampling rate is samples per second (Hz); sampling resolution is bits per sample.
- File size (bits) = rate × resolution × time in seconds × channels.
- Raising the rate or resolution gives a more accurate recording and a bigger file.
- A rate that is too low loses high frequencies.
:::
