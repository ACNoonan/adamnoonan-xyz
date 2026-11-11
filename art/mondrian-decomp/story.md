---
draft: true
---

## The series

Seventy-five compositions inspired by Neoplasticism, in the language of De Stijl: black bars on an off-white ground, and a few flat planes of red, yellow and blue. I provided specific rules and instructions to a local language model, who wrote the programs to generate each painting individually.

## Why

As a student, from elementary to high school, I always loved to doodle. I'd fill whole pages with intricate patterns while listening to the teacher; it helped me pay attention in class. My teachers hated it at first but realized I was always able to answer any questions they asked about the content, and did well on assignments and exams.

Once I got to college, I found it required my full attention - I began taking notes instead of drawing. As I transitioned into my professional career in technology and software, I never really found the time and space to have any sort of similarly creative outlet.

Then, in 2022, OpenAI released GPT 3.5. I was one of the first 0.1% of users (according to OpenAI's "Your Year with ChatGPT" campaign, launched December 22, 2025). Since then LLMs have dramatically transformed how I work, and what I'm capable of achieving.

With this series, I was hoping to accomplish two things: 1) re-engage with an artistic and creative process and practice, to start making art I enjoy looking and am proud to have produced & 2) to reflect and demonstrate the methods I use while working with the tool that is artificial intelligence in my day job as a developer and researcher.

I've seen first hand just how powerful these models are, and continue to become at an accelerating rate. I also experience, every single day, what simple mistakes they can make and how desperately they need human direction to accomplish work of any real value.

These synergies are what I hope to communicate in this work.

## Why Mondrian

I first heard the name "Mondrian" while working on my first research paper, "[Coverage Inversion: Calibration-Transparent Fair-Value Oracles for Closed-Market Hours](https://zenodo.org/records/22094769)". I thought he was a mathematician. That same summer, I was backpacking across Europe. I came across Piet Mondrian's artwork for the first time in Museum Ludwig, Cologne and immediately became obsessed. Something about his style just felt right, it scratched a part of my brain that craves order but variety, character but correctness.

## Process

Piet Mondrian spoke strongly of the role of human intuition in his work. He would tape colored squares and black lines to a blank canvas, intuiting the correct formation, before painting each component by hand.

With this series, I work with AI to train a smaller neural network to output code. These code files generate the art, which I then review based off my immediate response and intuition of the work. Based on these results, we derive specific rules, guidelines and parameters for the smaller neural networks to obey. Sometimes we fine-tune the code-generating model, training it to meet my aesthetic objective based on successful examples.

Through these iterations, the model itself becomes a part of the art; a new sort of canvas and brush. My colored squares and black lines taped to a canvas.

## How it's made

Initially, I started from paintings rather than prompts. I gathered 914 works by nine artists I picked and went through them one by one, keeping 191 as the reference for what I was after.

The paintings are made by an open model, Qwen3.5-35B-A3B, running on my own GPU box. It doesn’t output pixels. It writes Javascript, using the common p5.js library, so every painting is code: the language of machines, intuitively evaluated and interpreted by human beings.

I judged the renders blind, rating each either as "love", "okay" or "nope", and wrote a note on most of the loves saying why. Those notes fed back into the prompt over several rounds. Fixing the palette to red, yellow, blue and black made the biggest difference. My notes also turned into rules: no near-equal columns, no grey planes, bars that stop short of the edge, colour weighted toward the middle.

Every piece is exactly as the model output, nothing was retouched or edited.

## Where it's going

This current publication of the series is 75 outputs that were among my absolute favorites, selected by hand from thousands of generations. It is not a static collection and will continue to change and evolve as I continue perfecting the model, its instructions, and myself.

## Inspirations

Piet Mondrian first, and around him De Stijl, Suprematism and Constructivism: Kazimir Malevich, Sophie Taeuber-Arp, Otto Freundlich, Theo van Doesburg, František Kupka, Ilya Bolotowsky, Georges Vantongerloo and El Lissitzky.

## Objectives

Train the model on these ratings so it paints closer to my taste on its own, and keep the code editable so any piece can be worked on by hand.
