# Noiseless Orange Signal Motion Plan

## Motion thesis

The landing page behaves like a printed poster coming alive. The first viewport assembles itself, then the rest of the story appears as the visitor moves through it.

## GSAP sequence

The hero timeline reveals navigation, copy, artwork, orbital geometry, source markers, and status metadata. The sequence uses `power4.out`, staggered transforms, and opacity. It never animates layout dimensions.

The hero keeps two contained ambient loops: slow ring rotation and a scan line moving through the signal scene. Small orbs float with a sine ease. These loops are removed for reduced motion.

## Scroll behavior

Each section reveal starts at `top 84%` and plays once. Parallax is limited to the final organic circle and uses a bounded ScrollTrigger range. There is no scroll hijacking.

## Cleanup

`useGSAP` owns the animation context and reverts all timelines and triggers on unmount. The page does not keep manual animation frames or untracked listeners.

