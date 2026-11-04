# Motion and UI component guide

The site uses charcoal surfaces, neutral accents, readable typography, and a few deliberate motion treatments. Reuse the components below before introducing another animation system.

## Components in use

| Components                                                            | Purpose / location                                                                        |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `ui/Texts`, `ui/Button`                                               | Shared typography and link/button treatments. Arrows indicate links that open separately. |
| `ui/Logo`, `ui/CTA`                                                   | Site identity and contact actions. Keep decorative layers clear of links.                 |
| `ui/ascii-art`, `motion/UnfoldingText`, `motion/ParallaxText`         | Homepage signature portrait, name reveal, and role marquee.                               |
| `motion/ImageEffect`                                                  | Homepage introduction image transition.                                                   |
| `ui/tilt-card`, `ui/infinite-moving-cards`                            | Service cards and scrolling service list.                                                 |
| `motion/HeroParallax`                                                 | Project gallery with full screenshots and persistent descriptions.                        |
| `motion/Card`, `motion/ScrollReveal`, `motion/Marquee`                | About page resume, introduction reveal, and technology logos.                             |
| `motion/LinkPreview`, `ui/Images`                                     | About page external previews and portrait.                                                |
| `motion/BlurFade`                                                     | Shared viewport reveal used by text, images, cards, and footer.                           |
| `motion/PageTransition`, `motion/Preview`, `motion/ScrollProgressBar` | Route transitions, initial loading preview, and reading progress.                         |

The case study uses one local motion configuration to reveal headings, paragraphs, and lists together. Avoid nesting separate text reveals inside these blocks.

## Retained for future improvements

These components are not currently imported by a page. They are retained for specific uses, rather than being active design elements.

| Component                | Suitable use                                            | Before integrating                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ui/computer-desktop`    | Frontend development service icon                       | Support focus and reduced motion alongside hover.                                                                                                                        |
| `ui/server-stack`        | Backend development service icon                        | Same as above.                                                                                                                                                           |
| `ui/circle-stack`        | Database design service icon                            | Same as above.                                                                                                                                                           |
| `ui/cloud`               | Cloud services icon                                     | Same as above.                                                                                                                                                           |
| `ui/command-line`        | API or developer tooling icon                           | Stop repeating animation for reduced motion.                                                                                                                             |
| `ui/cog-6-tooth`         | DevOps or maintenance icon                              | Support reduced motion.                                                                                                                                                  |
| `ui/svg-shapes`          | A small static geometric accent in an editorial section | Choose one shape; keep decorative SVGs hidden from assistive technology and pointer events.                                                                              |
| `motion/CpuArchitecture` | Case study architecture illustration                    | Use unique SVG IDs per instance, readable semantic colors, and disable decorative animations for reduced motion. It is illustrative, not the actual system architecture. |
| `ui/glowing-effect`      | Subtle hover border on one featured card                | Defaults to white. Disable for reduced motion and keep the overlay clear of interactive content.                                                                         |

## Removed experiments

- Backgrounds: `geometric-blur-mesh`, `spotlight-background`, `mouse-responsive-background`, `dotted-surface`, `beams-background`, and `GridBeam`. These added competing background effects; several used continuous canvas/WebGL animation or hardcoded demo imagery.
- Alternate text treatments: `MorphingText`, `TextAnimate`, `hero-shutter-text`, `rotating-text`, `fancy-text-hover`, and `typing-text`. Existing heading, hover, and reveal components cover the current design without additional text animation styles.
- `remocn-perspective-marquee`: required a Remotion frame context and overlapped with the site's existing marquees.
- `svg-shapes-animated`: duplicated the static shape library with continuous animation. Static geometry is the retained option.
- `EvervaultCard`: an unused alternate card wrapper. Keep the current card system and the reusable glow primitive instead.
- `loadings` and the unused loading demos in `PageTransition`: the site already has its initial preview and route transition.

The files can be recovered from Git if a concrete future design calls for them. Package dependencies were left unchanged; removing source files alone does not establish that a package is unused elsewhere.

The CTA uses a bordered card with one shared reveal. Contact uses the shorter conversation variant. The unused wave divider was removed.
