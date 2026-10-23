# Optional media prompts for the example template

These optional prompts describe fictional example projects. No account connection, generated files, or real project media is included. The application works with its original code-native concept visuals until you add optional media.

Save delivered assets in `public/assets/`. Set each corresponding `src` in `src/data/media-manifest.json` to its public URL, for example `/assets/hero-network.mp4`. The application does not request missing assets. Record the provider model and generation IDs here when generation completes.

## Shared art direction

High-end cinematic 3D tech editorial. Deep obsidian #080b0d, charcoal, restrained neon cyan #63e2f0, electric blue, steel silver. Glass and anodized metal. Intentional negative space, delicate illuminated edges, physically realistic materials, soft volumetric lighting. No logos, legible code, invented project UI, watermarks, people, or excessive bloom. These are conceptual backdrops, not actual product screenshots.

## A — Hero video: `hero-network.mp4`

Create a 16:9, 6–8 second seamlessly looping cinematic shot of a futuristic glassmorphic city grid formed by network server nodes. Connected obsidian glass towers rise from a fine isometric motherboard grid. Subtle neon cyan data streams travel between the nodes, with abstract code-like light marks moving across glass surfaces. Slow, subtle camera drift, stable geometry, deep obsidian lighting, fine steel silver details. Keep the left half dark and quiet for large white website typography; concentrate detailed architecture on the right half. No text, logos, people, or abrupt camera moves. Match the first and last frames for a seamless loop. Deliver 1920×1080 H.264 MP4 without audio.

Optimize the delivery copy for scroll seeking: 24–30fps, faststart, frequent keyframes (GOP 1–12), preferably under 10MB. Retain the original separately if needed. The hero uses GSAP ScrollTrigger to seek through the video; native loop is available without autoplay. Reduced motion and data-saving preferences retain the procedural scene.

## B — Feature image: `feature-terminal.webp`

Photorealistic macro image of an abstract cybernetic dashboard and a translucent terminal window floating above mechanical computer components. Restrained blue ambient glow spills onto fine anodized aluminum, black PCB traces, and glass layers. Technical precision, realistic microscopic surface texture, shallow depth of field, obsidian background, soft cyan rim lighting. Dashboard marks are abstract and nonverbal. Vertical 4:5 composition with a central focal point and room around it. No logos, readable text, humans, or watermark.

## C1 — StayFlow Demo backdrop: `project-hotel.webp`

Stylized premium 3D mockup backdrop for a fictional hospitality workspace called StayFlow Demo. An interconnected arrangement of obsidian glass panels, a small upright mobile-shaped slab, and a subtle abstract cyan device node. Fine cyan workflow connections join the forms. Wide 3:2 editorial framing. Same materials, camera elevation, lighting, and finish as the other three example project backdrops. Abstract surfaces only; no text, logos, screenshots, or invented metrics.

## C2 — Orbit Explorer Demo backdrop: `project-space.webp`

Stylized premium 3D mockup backdrop for a fictional interactive portfolio called Orbit Explorer Demo. An abstract obsidian orbital form, a suspended geometric node, fine cyan pathways, subtle blue-violet atmospheric depth. Wide 3:2 editorial framing. Same glass/metal materials, camera elevation, cyan lighting, and finish as StayFlow Demo, LinkHub Demo, and Project Desk Demo. No text, logos, humans, screenshots, or watermark.

## C3 — LinkHub Demo backdrop: `project-links.webp`

Stylized premium 3D mockup backdrop for a social links platform. A central upright frosted glass identity panel with several smaller linked glass nodes radiating outward along delicate electric-blue connections. Fine cyan edge light and obsidian surfaces. Wide 3:2 editorial framing. Same materials, camera elevation, lighting, and finish as the other three project backdrops. Abstract shapes only; no readable UI, text, logos, humans, or watermark.

## C4 — Project Desk Demo backdrop: `project-client.webp`

Stylized premium 3D mockup backdrop for a fictional operations dashboard called Project Desk Demo. A precise composition of connected obsidian glass workflow cards, thin cyan paths, and steel silver modular blocks, expressing sample project and billing workflows. Wide 3:2 editorial framing. Same materials, camera elevation, lighting, and finish as the other three example project backdrops. No money amounts, readable UI, text, logos, humans, or watermark.

## Acceptance

- Inspect every output before integration; maintain visual consistency.
- Use WebP or AVIF delivery images, roughly 1200px wide and ideally below 250KB each.
- Set manifest status to `ready` only after all six files exist and pass `node scripts/check-media.mjs --strict`.
- Test the video in desktop Chrome and mobile Safari, including smooth seeking, reduced motion, and failed network requests.
- Do not describe locally authored procedural art as Higgsfield-generated media.
