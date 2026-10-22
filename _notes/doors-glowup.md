# /doors — glow-up proposal & stylebook

_Status: **proposal only, nothing here is built.** Written 2026-10-22 against
`doors.html` at `ce941cd` (branch `easter-egg-cassette`, live at
cyrillrafael.org/doors). This file lives in `_notes/`, which Jekyll never
publishes._

How to use this document: read **§1** (where the page stands) and **§2** (the
peer critique), then go through the **plates in §3** and circle one letter per
plate on the **pick sheet in §4**. §5–§7 turn the picks into work, checks and
open questions. Each plate's option **A** is what the page does today, so
"keep A" is always a valid choice.

---

## 1. Where it stands (verified, not felt)

| Claim | Level reached | Evidence |
|---|---|---|
| Cassette plays two archive.org sides; tap / hold / drag ↑↓ / drag ←→ work | headless-tested | probe runs in this session; `tick()` `doors.html:630` |
| Glitch about 3% per play, never on the first; three slow taps always mend it | headless-tested | `GENTLE_MIN` `doors.html:578`, `maybeTrouble` `:582` |
| Tape packs follow the audio clock and the scrubbing hand | headless-tested | radius probe: rL 17.00 → 16.67 over 214 s |
| Forest renders and animates only while on screen | headless-tested | `IntersectionObserver` `doors.html:1322` |
| **Works on a real phone** | **not verified** | no device test yet |
| Haptics | Android only | `navigator.vibrate` `doors.html:510`; iOS Safari has no Vibration API |
| Lock-screen / headphone controls | absent | no `mediaSession` in the file |
| Reduced-motion users | ignored | no `prefers-reduced-motion` in the file |
| Regression tests | **folklore** | probe scripts live in a job tmp dir and aren't committed |

The page is 1,329 lines in one file with no build step. **That's a strength.
Every option below keeps it a single file.**

---

## 2. Peer critique (sharp, as requested)

Four simulated reviewers, each told to be blunt and to name a fix. Several
points disagree with each other, and the disagreements are where the client
gets to decide.

### The pixel artist
1. **Two pixel scales on one page.** `fit()` computes the cassette's integer
   scale from its own width (`doors.html:427`) and the forest's from *its*
   width (`:1315`). Worked from the formulas: 4 css px above the fold vs 5
   below at 900×1000, 1 vs 2 on a 375×812 phone; they only agree by
   coincidence (e.g. both 4 at 1440×900). Mixing pixel densities is the clearest amateur tell in pixel art.
   *Fix: one shared `k` for both canvases.*
2. **The sticker type is the weakest drawing on the page.** The 3×5 font at 1×
   makes "RIDERS ON THE STORM" read as noise in a thumbnail. The forest got
   dithering and sub-pixel care; the label didn't. *Fix: a 4×6 or 5×7
   hand-drawn alphabet just for the title line, or hand-pixel the two titles
   as images.*
3. **The dappled light is noise smeared over everything.** Real dapples are
   shaped by the canopy that casts them. *Fix: build the light mask from the
   canopy layer, shifted down and to the side with the sun angle and swaying
   with it.* Then the light and the leaves move as one system instead of two
   animations stacked.
4. **The man is the stillest thing in the frame.** The canopy, weeds, fawn,
   motes and bird all move, but the subject doesn't. Either that's deliberate
   (a still point, a portrait) or it's a hole. *Decide, and say which in the
   code.*

### The interaction designer
1. **The instructions leak onto the page.** "tap: play · hold: cue · drag ↑↓:
   scrub · drag ←→: flip" spells out every gesture before you touch anything;
   a cassette shouldn't need a manual. *Fix: teach once, in motion (plate 7),
   then get out of the way.*
2. **Status text breaks the illusion.** "the reels are sticking · three slow
   taps" appears in orange monospace *under* a pixel object. The object should
   carry its own state: a blinking LED, a scribble on the sticker, a shudder.
   DOM text should only report real errors (network, CORS), which it already
   does well.
3. **Backward scrubbing is mute.** Dragging down pauses the audio and plays a
   synthetic squeal (`tick()`), so you can't scrub back by ear. This is the
   biggest functional gap in the "physical metaphor" the client asked for.
   (Plate 9 proposes the fix.)
4. **The end of a side loops silently** (`doors.html:71`). A real deck stops
   with a clunk at the end of the tape, and that clunk is what makes you flip
   it. Looping removes the cassette's single most characteristic moment.
5. **Unsupported on iOS:** no haptics, no lock-screen controls. On a phone the
   page is most of what someone experiences, so these matter more than any
   visual polish.

### The sound designer
1. **Every click is the same noise burst through a different filter.** That
   reads as "UI sound", not "plastic". Real handling has at least four
   distinct transients: the shell knocking against the hand, the pinch roller
   engaging, the reel hubs clicking, and the shell seating in the deck.
   *Fix: a small, distinct set of sounds (plate 8).*
2. **Nothing connects the two halves in sound.** You scroll into a forest and
   the tape keeps playing at full presence, as if the forest were on
   headphones. *Fix: as you descend, low-pass and quiet the tape slightly so
   it sounds like music from the deck up the path, and fade in a very quiet
   forest bed.* This is the one addition that ties the halves together; see
   plate 6.
3. The hiss is now about right. Leave it alone.

### The subtractor (argues against everyone above)
1. The page has been through three upgrades in a week. **The next upgrade
   should remove more than it adds.** Candidates: the meter (the packs already
   show progress), the hint line, the orange status line, the `flip` button
   (keep it for keyboard and screen-reader users, but visually hidden).
2. The forest's hint line ("tap the fawn · tap the trees · tap the ground")
   is a menu of tricks. Remove it and let people discover them.
3. Don't add a third scene, a day/night cycle, weather or a playlist UI.
   The page works because it's two things done thoroughly.

---

## 3. Plates

Each plate is one decision. The ASCII mock-ups show composition and character,
not final pixels. Hex values are the palettes that would actually ship.

### Plate 1 — The shell

```
 A  SMOKE (now)            B  CLEAR                 C  CREAM
 ┌────────────────┐       ┌────────────────┐       ┌────────────────┐
 │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│       │░·░·░·░·░·░·░·░·│       │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 │▓ ┌──────────┐ ▓│       │░ ┌──────────┐ ░│       │▒ ┌──────────┐ ▒│
 │▓ │ (o)  (o) │ ▓│       │· │ (o)⚙⚙(o) │ ·│       │▒ │ (o)  (o) │ ▒│
 │▓ └──────────┘ ▓│       │░ └──────────┘ ░│       │▒ └──────────┘ ▒│
 │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│       │·░ springs, screws visible│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 └────────────────┘       └────────────────┘       └────────────────┘
 #2b2926 #3d3a35 #1c1a18  #c9d3d6@40% #8fa0a6 #e8eef0  #e9e2d0 #cfc6b0 #a89f88
 grave, 70s bootleg       90s, mechanical, busy    office tape, quiet, warm
```
- **Peer:** B shows the mechanism, which suits the "physical" brief, but it
  competes with the sticker. C is the most legible next to the cream wall.
  **A is the right tone for The Doors.**
- **Recommended:** A, with one change: give the plastic a faint sheen that
  follows the pointer (a 2-pixel highlight band on the top edge).

### Plate 2 — The sticker

```
 A  KRAFT + 3×5 (now)       B  KRAFT + DRAWN TITLE     C  TYPEWRITER LABEL
 ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
 │[A] RIDERS ON THE STO…│  │[A] Riders on         │  │ A ▏RIDERS ON THE STORM│
 │    THE DOORS  FELT 70│  │    the Storm  ~felt70│  │   ▏The Doors · 1970   │
 │▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬│  │▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬│  │━━━━━━━━━━━━━━━━━━━━━━│
 └──────────────────────┘  └──────────────────────┘  └──────────────────────┘
 grid font, uniform         5×7 hand-lettered pen,     ruled label, red margin
                            slight baseline wobble     line, clean caps
 ink #2a241c on #e6dabd     ink #1f2a4a (biro blue)    ink #222 on #f4f1e8, rule #c0392b
```
- **Peer:** A is the weakest drawing on the page (see the pixel artist's
  point 2). B makes it a *particular person's* tape, which is what a bootleg
  is. C looks shop-bought.
- **Recommended:** B. Side B gets the same pen in a different hurry.

### Plate 3 — The flip

```
 A  SQUASH (now)          B  PERSPECTIVE              C  LIFT · TURN · SET
 [██████] → [███] → |     [██████] → /████\ → |     [██████] ↑ /████\ → | ↓
 width scales,            rows skew into a           rises 6px, casts a longer
 spine appears            trapezoid; near edge        shadow, turns, sets down
                          grows                       with a 1-frame squash
 ~0 new lines             ~40 lines                   ~70 lines
```
- **Peer:** A reads as a playing card. B is the honest 3D. C is the most
  *felt*, because the lift tells your hand the object left the surface.
- **Recommended:** C, built on top of B. Use the springs already in the code
  (`spring()`). Don't tune them to feel cute.

### Plate 4 — Counter and meter

```
 A  COUNTER + LED (now)     B  ROLLING COUNTER + NEEDLES   C  ROLLING COUNTER ONLY
 ┌───┬───────────────┐      ┌───┬──╮ ╭──┐                 ┌─────┐
 │072│▮▮▮▮▮▮▯▯▯▯▯▯▯▯▯│      │0̲7̲2̲│ ╲ │ │ ╱ │                 │ 0̲7̲2̲ │
 └───┴───────────────┘      └───┴──╯ ╰──┘                 └─────┘
 digits jump                digits roll mechanically,      the packs already show
                            needles with ballistics        progress; meter removed
```
- **Peer:** The LED bars are the only digital-looking thing on an analog
  object. The subtractor says to remove them (C). The interaction designer
  says the meter is what proves "sound is happening" when the volume is down
  (B).
- **Recommended:** C if the client wants calm, B if the meter matters. Either
  way, **the counter digits should roll**: a 3-pixel slide between digits.

### Plate 5 — Light in the wood

```
 A  LATE AFTERNOON (now)   B  GOLDEN HOUR            C  OVERCAST (photo 2 textures)
 sky   #d9e9f4 #a9cbe8     sky   #f2e3c4 #e8c890     sky   #dfe3e2 #c6ccca
 sun   #cfa86f #ad8753     sun   #e6b46a #c98f4a     sun   #a99779 #8a7a60
 shade #3e2c1e #5e4430     shade #4a2a18 #6e4026     shade #4a4036 #5f5446
 rim on deer #ffd27a       rim on deer #ffc070       no rim; texture from litter
```
- **Peer:** A matches the first photo, and the client already chose that
  composition. B is gorgeous and a cliché. C would make the gravel, litter and
  bark textures from the second photo the main event, which suits pixel art.
- **Recommended:** keep A's light, and take the *textures* from C: denser
  gravel at the path edge, bark plates instead of flat bark, leaf litter in
  2-pixel clusters.

### Plate 6 — The hinge between the two halves

```
 A  DITHER DISSOLVE (now)  B  LEADER RIBBON              C  DESCENT IN SOUND
 wall ░░▒▒▓▓ wood          a strand of tape leader        dissolve as now, plus:
                           unspools from the cassette     tape low-passes 9.5k→2.5k
                           and trails down the page       and drops 6 dB as you
                           into the canopy                scroll; forest bed fades in
```
- **Peer:** B is charming once and kitsch by the third visit. C costs nothing
  to look at and fixes the "forest on headphones" problem.
- **Recommended:** A + C.

### Plate 7 — Teaching the gestures

```
 A  HINT LINE (now)                 B  GHOST HAND, ONCE              C  NOTHING
 tap: play · hold: cue · drag ↑↓…    first visit only: a faint 1px    a single "?" that
                                     outline hand taps, then drags   expands the hint
                                     ↑, then ←; never again          on tap
                                     (stored in localStorage)
```
- **Peer:** A is a manual. B teaches in motion and then gets out of the way.
  C is the subtractor's choice.
- **Recommended:** B, with C's "?" as the fallback for repeat visitors and
  for anyone with reduced motion.

### Plate 8 — The sound set

```
 A  ONE GRAIN, FOUR FILTERS (now)   B  FOUR DISTINCT SOUNDS            C  SILENT + HAPTIC
 tick / clack / clunk                grip    — soft plastic knock        clicks only on
 = the same noise burst through      reel    — dry hub tick, pitch       Android, nothing
 different filters                     follows reel speed                on iOS
                                     roller  — damped thunk + 50ms hum
                                     seat    — two-part clack
```
- **Peer:** B is what "tactile" means. Synthesize it from a modal model (a
  few damped sine partials per sound), not from samples, to keep the single
  file with no assets.
- **Recommended:** B.

### Plate 9 — Scrubbing by ear (functional, no aesthetic choice)

Today, dragging forward seeks the stream every 90 ms, and dragging back pauses
it and plays a synthetic squeal. Proposed: when the stream allows CORS
(already probed by `probeCors`, `doors.html:464`), fetch a byte range of about
±8 s around the playhead. That's roughly 256 KB of MP3, since all 13 tracks are
`.mp3`, and MP3 frames decode from an arbitrary offset. Decode it, keep a
reversed copy, and drive both from the finger's velocity. Forward and backward
then sound like a real cue/review, pitch-shifted. Refetch the window when the
finger leaves it. Without CORS, fall back to today's behavior.
**Cost:** about 120 lines. **Risk:** the first window takes about 300 ms to
arrive on a slow connection. Today's sound fills that gap.

---

## 4. Pick sheet

| Plate | A (now) | B | C | Recommended |
|---|---|---|---|---|
| 1 Shell | smoke | clear | cream | **A + sheen** |
| 2 Sticker | 3×5 grid | drawn title | typewriter | **B** |
| 3 Flip | squash | perspective | lift·turn·set | **C** |
| 4 Meter | LED | needles | counter only | **C** (or B) |
| 5 Light | afternoon | golden | overcast | **A light + C textures** |
| 6 Hinge | dissolve | leader ribbon | descent in sound | **A + C** |
| 7 Teaching | hint line | ghost hand | "?" | **B + C** |
| 8 Sound | one grain | four sounds | silent | **B** |
| 9 Scrub by ear | — | — | — | **yes** |

Not on the pick sheet, because they're simply fixes: one shared pixel scale;
the end of a side stops with a clunk and the tape waits to be flipped (if the
client wants looping, that's a question, §7); state shown on the object
instead of in orange text; dapples derived from the canopy.

---

## 5. Work, in order (each phase is shippable and leaves it working)

**Phase 0 — Floor (do this regardless of picks).** About 150 lines.
- One shared pixel scale for both canvases. *Done when* a screenshot at 375,
  768 and 1440 px width shows identical pixel size above and below the fold.
- `prefers-reduced-motion`: the canopy, weeds, light, motes and glint stop;
  the reels still turn (they're function, not decoration). *Done when* the
  emulated media feature shows a still forest and turning reels.
- Media Session: title, artist, side, artwork rendered from the sticker
  canvas; play/pause/seek from the lock screen. *Done when* an iPhone lock
  screen shows the sticker and its pause button pauses the page.
- Commit the probes as `tests/doors/` (already excluded by `_config.yml`)
  with one command that runs them headless. The contract "three slow taps
  always mend it" becomes a test, not a promise.

**Phase 1 — The object.** Plates 2, 3, 4, 8, 9 and the end-of-side stop.
About 400 lines.

**Phase 2 — The wood.** Plate 5 textures, dapples from the canopy, plate 6C,
and a decision on the man (still point or breathing). About 150 lines.

**Phase 3 — Subtract.** Plate 7. Remove the orange status line (state moves
onto the object), the forest hint line, and the visible `flip` button (kept
for screen readers). Add a small provenance footer (repo · commit) in the
wall's ink-soft color. Net line count should go *down*.

---

## 6. How each phase gets verified

- Headless: the committed probes in `tests/doors/` and screenshot fixtures at
  three widths.
- **On real devices, before anything is called done:** an iPhone with Safari
  and an Android phone with Chrome. Check the gestures, the lock screen,
  haptics (Android), audio starting from the first tap, and scrubbing on a
  throttled connection.
- From outside: after each deploy, fetch the live URL and grep for one token
  from that phase. The deploys so far were checked this way.

---

## 7. Open questions for the client

1. **End of side:** stop and wait to be flipped (like a deck), or keep
   looping (like a playlist)?
2. **The man:** a deliberate still point, or a living figure (breathing, the
   hand offering a leaf that shrinks as the fawn eats)?
3. **Meter:** keep it (plate 4B) or let the packs carry it (4C)?
4. **A forest sound bed** (plate 6C) adds about 40 lines of synthesis
   code and no assets. Is ambient sound welcome, or should the forest be silent apart
   from the tape?
5. **Provenance footer:** does a visible repo/commit line on an unlisted
   easter egg feel right, or should it be an HTML comment only (as now)?

_Not proposed, and argued against: a third scene, day/night, weather, a
playlist UI, user uploads, and splitting the file into modules._

_source: cyrillrafael/cyrillrafael.github.io · `_notes/doors-glowup.md` ·
written against `ce941cd` · Claude Code background job 0440ef7b_
