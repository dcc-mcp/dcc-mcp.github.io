<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

let disposeMotion = () => {}
let setupVersion = 0

async function setupHomeMotion() {
  const version = ++setupVersion
  disposeMotion()
  await nextTick()

  const home = document.querySelector<HTMLElement>('.VPHome')
  if (!home) return

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])

  if (version !== setupVersion || !document.contains(home)) return

  gsap.registerPlugin(ScrollTrigger)
  document.documentElement.classList.add('gsap-home-active')

  const media = gsap.matchMedia()
  const observerCleanups: Array<() => void> = []

  media.add('(prefers-reduced-motion: no-preference)', () => {
    const context = gsap.context(() => {
      const reveal = (
        targets: gsap.TweenTarget,
        trigger: Element,
        options: gsap.TweenVars = {},
      ) => {
        gsap.from(targets, {
          y: 36,
          autoAlpha: 0,
          duration: 0.82,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger,
            start: 'top 84%',
            once: true,
          },
          ...options,
        })
      }

      const heroItems = home.querySelectorAll(
        '.VPHero .name, .VPHero .text, .VPHero .tagline, .VPHero .actions, .VPHero .image',
      )

      gsap.from(heroItems, {
        y: 28,
        autoAlpha: 0,
        duration: 0.86,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'transform,opacity,visibility',
      })

      const hero = home.querySelector('.VPHero')
      const heroImage = home.querySelector('.VPHero .image-container')
      if (hero && heroImage) {
        gsap.to(heroImage, {
          yPercent: 16,
          rotation: 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        })
      }

      const progress = document.querySelector('.home-motion-progress')
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: home,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.15,
            },
          },
        )
      }

      const proof = home.querySelector('.home-proof')
      if (proof) reveal(proof.querySelectorAll('span'), proof, { y: 20, stagger: 0.07 })

      const install = home.querySelector('.install-intro')
      if (install) reveal(install.children, install)

      const promptBlocks = home.querySelectorAll<HTMLElement>(
        ".vp-doc.container div[class*='language-'], .install-note",
      )
      if (promptBlocks.length) reveal(promptBlocks, promptBlocks[0], { y: 24, stagger: 0.11 })

      const integrations = home.querySelector('.integrations-section')
      if (integrations) {
        const heading = integrations.querySelector('.integrations-heading')
        if (heading) reveal(heading.children, heading)

        const tiles = integrations.querySelectorAll('.dcc-grid a')
        if (tiles.length) {
          reveal(tiles, integrations.querySelector('.dcc-grid') ?? integrations, {
            y: 26,
            stagger: 0.035,
            duration: 0.62,
          })
        }

        const featured = integrations.querySelector('.dcc-tile-featured')
        if (featured) {
          gsap.from(featured, {
            boxShadow: 'inset 0 0 0 transparent',
            duration: 1.1,
            ease: 'power2.out',
            clearProps: 'box-shadow',
            scrollTrigger: {
              trigger: featured,
              start: 'top 88%',
              once: true,
            },
          })
        }
      }

      const marketplace = home.querySelector('.home-marketplace-section')
      if (marketplace) {
        const heading = marketplace.querySelector('.home-marketplace-heading')
        if (heading) reveal(heading.children, heading)

        const animateMarketplaceCards = () => {
          const cards = Array.from(
            marketplace.querySelectorAll<HTMLElement>('.marketplace-card:not([data-motion-ready])'),
          )
          if (!cards.length) return
          cards.forEach((card) => card.setAttribute('data-motion-ready', 'true'))
          reveal(cards, cards[0], { y: 28, stagger: 0.06, duration: 0.68 })
          ScrollTrigger.refresh()
        }

        animateMarketplaceCards()
        const observer = new MutationObserver(animateMarketplaceCards)
        observer.observe(marketplace, { childList: true, subtree: true })
        observerCleanups.push(() => observer.disconnect())
      }

      const showcase = home.querySelector('.showcase-section')
      if (showcase) {
        const heading = showcase.querySelector('.showcase-heading')
        if (heading) reveal(heading.children, heading)

        const cards = showcase.querySelectorAll('.showcase-card')
        if (cards.length) {
          reveal(cards, showcase.querySelector('.showcase-grid') ?? showcase, {
            y: 42,
            stagger: 0.07,
            duration: 0.76,
          })
        }
      }
    }, home)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh, { once: true })
    requestAnimationFrame(refresh)

    return () => {
      window.removeEventListener('load', refresh)
      observerCleanups.splice(0).forEach((cleanup) => cleanup())
      context.revert()
    }
  })

  disposeMotion = () => {
    media.revert()
    observerCleanups.splice(0).forEach((cleanup) => cleanup())
    document.documentElement.classList.remove('gsap-home-active')
  }
}

onMounted(() => {
  void setupHomeMotion()
})

watch(
  () => route.path,
  () => void setupHomeMotion(),
  { flush: 'post' },
)

onBeforeUnmount(() => {
  ++setupVersion
  disposeMotion()
})
</script>

<template>
  <div class="home-motion-progress" aria-hidden="true" />
</template>
