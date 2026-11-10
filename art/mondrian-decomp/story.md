---
draft: true
---

## The series

Fifty compositions in the language of De Stijl: black bars on an off-white ground, and a few flat planes of red, yellow and blue. Each one is a short program. A language model wrote the code, a browser rendered it, and I kept the ones I loved.

## Process

I started from paintings rather than prompts. I gathered 914 works by nine artists I picked and went through them one by one, keeping 191 as the reference for what I was after.

The paintings are made by an open model, Qwen3.5-35B-A3B, running on my own GPU box. It doesn’t output pixels. It writes p5.js, so every painting is code: each bar and plane is a line I can read, move or recolour, and randomness can be added later to make a piece generative.

I rated the renders blind, as love, okay or nope, and wrote a note on most of the loves saying why. Those notes fed back into the prompt over several rounds. Fixing the palette to red, yellow, blue and black made the biggest difference. My notes also turned into rules: no near-equal columns, no grey planes, bars that stop short of the edge, colour weighted toward the middle.

This series is the 50 paintings I marked love in a 99-painting tagging pass. Nothing was retouched.

## Why

The question underneath is whether a small open model can learn to paint geometric abstraction, judged against paintings I love. My taste is the reward. The series is what that taste looks like when it’s the only filter.

## Inspirations

Piet Mondrian first, and around him De Stijl, Suprematism and Constructivism: Kazimir Malevich, Sophie Taeuber-Arp, Otto Freundlich, Theo van Doesburg, František Kupka, Ilya Bolotowsky, Georges Vantongerloo and El Lissitzky.

## Objectives

Train the model on these ratings so it paints closer to my taste on its own, and keep the code editable so any piece can be worked on by hand.
