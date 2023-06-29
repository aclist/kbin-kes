// ==UserScript==
// @name         megamod-kbin-code-highlighting
// @namespace    https://github.com/Oricul
// @version      0.4.2
// @description  Use HLJS to add code highlighting to kbin. Hopefully adds some legibility as well.
// @author       0rito
// @license      MIT
// @match        https://kbin.social/*
// @match        https://fedia.io/*
// @match        https://karab.in/*
// @match        https://readit.buzz/*
// @match        https://forum.fail/*
// @match        https://fedi196.gay/*
// @match        https://feddit.online/*
// @match        https://kbin.run/*
// @match        https://nadajnik.org/*
// @match        https://kbin.cafe/*
// @match        https://kbin.lol/*
// @match        https://nerdbin.social/*
// @match        https://kbin.lgbt/*
// @match        https://kbin.place/*
// @match        https://kopnij.in/*
// @match        https://kbin.sh/*
// @match        https://kayb.ee/*
// @match        https://wiku.hu/*
// @match        https://kbin.chat/*
// @match        https://fediverse.boo/*
// @match        https://tuna.cat/*
// @match        https://kbin.dk/*
// @match        https://kbin.projectsegau.lt/*
// @match        https://bin.pol.social/*
// @match        https://kbin.fedi.cr/*
// @match        https://baguette.pub/*
// @match        https://kbin.tech/*
// @match        https://teacup.social/*
// @match        https://thebrainbin.org/*
// @match        https://fr3diver.se/*
// @match        https://kbin.rocks/*
// @match        https://remy.city/*
// @match        https://community.yshi.org/*
// @match        https://kbin.buzz/*
// @match        https://kilioa.org/*
// @match        https://kbin.melroy.org/*
// @match        https://gehimeimer.de/*
// @match        https://champserver.net/*
// @match        https://k.fe.derate.me/*
// @match        https://the.coolest.zone/*
// @match        https://streetbikes.club/*
// @match        https://kbin.korgen.xyz/*
// @match        https://kbin.donar.dev/*
// @match        https://nolani.academy/*
// @match        https://kbin.dentora.social/*
// @match        https://kbin.cocopoops.com/*
// @match        https://thekittysays.icu/*
// @match        https://dev-kbin.korako.me/*
// @icon         https://kbin.social/favicon.svg
// @connect      github.com
// @connect      raw.githubusercontent.com
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        GM_info
// ==/UserScript==

// Declare all styles
const kchStyles = [
    {name: "3024", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/3024.css"},
    {name: "apathy", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/apathy.css"},
    {name: "apprentice", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/apprentice.css"},
    {name: "ashes", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/ashes.css"},
    {name: "atelier-cave-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-cave-light.css"},
    {name: "atelier-cave", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-cave.css"},
    {name: "atelier-dune-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-dune-light.css"},
    {name: "atelier-dune", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-dune.css"},
    {name: "atelier-estuary-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-estuary-light.css"},
    {name: "atelier-estuary", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-estuary.css"},
    {name: "atelier-forest-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-forest-light.css"},
    {name: "atelier-forest", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-forest.css"},
    {name: "atelier-heath-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-heath-light.css"},
    {name: "atelier-heath", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-heath.css"},
    {name: "atelier-lakeside-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-lakeside-light.css"},
    {name: "atelier-lakeside", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-lakeside.css"},
    {name: "atelier-plateau-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-plateau-light.css"},
    {name: "atelier-plateau", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-plateau.css"},
    {name: "atelier-savanna-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-savanna-light.css"},
    {name: "atelier-savanna", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-savanna.css"},
    {name: "atelier-seaside-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-seaside-light.css"},
    {name: "atelier-seaside", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-seaside.css"},
    {name: "atelier-sulphurpool-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-sulphurpool-light.css"},
    {name: "atelier-sulphurpool", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atelier-sulphurpool.css"},
    {name: "atlas", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/atlas.css"},
    {name: "bespin", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/bespin.css"},
    {name: "black-metal-bathory", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/black-metal-bathory.css"},
    {name: "black-metal-burzum", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/black-metal-burzum.css"},
    {name: "black-metal-dark-funeral", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/black-metal-dark-funeral.css"},
    {name: "black-metal-gorgoroth", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/black-metal-gorgoroth.css"},
    {name: "black-metal-immortal", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/black-metal-immortal.css"},
    {name: "black-metal-khold", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/black-metal-khold.css"},
    {name: "black-metal-marduk", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/black-metal-marduk.css"},
    {name: "black-metal-mayhem", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/black-metal-mayhem.css"},
    {name: "black-metal-nile", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/black-metal-nile.css"},
    {name: "black-metal-venom", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/black-metal-venom.css"},
    {name: "black-metal", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/black-metal.css"},
    {name: "brewer", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/brewer.css"},
    {name: "bright", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/bright.css"},
    {name: "brogrammer", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/brogrammer.css"},
    {name: "brush-trees-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/brush-trees-dark.css"},
    {name: "brush-trees", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/brush-trees.css"},
    {name: "chalk", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/chalk.css"},
    {name: "circus", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/circus.css"},
    {name: "classic-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/classic-dark.css"},
    {name: "classic-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/classic-light.css"},
    {name: "codeschool", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/codeschool.css"},
    {name: "colors", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/colors.css"},
    {name: "cupcake", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/cupcake.css"},
    {name: "cupertino", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/cupertino.css"},
    {name: "danqing", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/danqing.css"},
    {name: "darcula", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/darcula.css"},
    {name: "dark-violet", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/dark-violet.css"},
    {name: "darkmoss", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/darkmoss.css"},
    {name: "darktooth", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/darktooth.css"},
    {name: "decaf", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/decaf.css"},
    {name: "default-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/default-dark.css"},
    {name: "default-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/default-light.css"},
    {name: "dirtysea", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/dirtysea.css"},
    {name: "dracula", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/dracula.css"},
    {name: "edge-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/edge-dark.css"},
    {name: "edge-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/edge-light.css"},
    {name: "eighties", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/eighties.css"},
    {name: "embers", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/embers.css"},
    {name: "equilibrium-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/equilibrium-dark.css"},
    {name: "equilibrium-gray-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/equilibrium-gray-dark.css"},
    {name: "equilibrium-gray-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/equilibrium-gray-light.css"},
    {name: "equilibrium-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/equilibrium-light.css"},
    {name: "espresso", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/espresso.css"},
    {name: "eva-dim", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/eva-dim.css"},
    {name: "eva", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/eva.css"},
    {name: "flat", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/flat.css"},
    {name: "framer", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/framer.css"},
    {name: "fruit-soda", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/fruit-soda.css"},
    {name: "gigavolt", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/gigavolt.css"},
    {name: "github", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/github.css"},
    {name: "google-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/google-dark.css"},
    {name: "google-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/google-light.css"},
    {name: "grayscale-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/grayscale-dark.css"},
    {name: "grayscale-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/grayscale-light.css"},
    {name: "green-screen", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/green-screen.css"},
    {name: "gruvbox-dark-hard", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/gruvbox-dark-hard.css"},
    {name: "gruvbox-dark-medium", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/gruvbox-dark-medium.css"},
    {name: "gruvbox-dark-pale", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/gruvbox-dark-pale.css"},
    {name: "gruvbox-dark-soft", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/gruvbox-dark-soft.css"},
    {name: "gruvbox-light-hard", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/gruvbox-light-hard.css"},
    {name: "gruvbox-light-medium", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/gruvbox-light-medium.css"},
    {name: "gruvbox-light-soft", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/gruvbox-light-soft.css"},
    {name: "hardcore", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/hardcore.css"},
    {name: "harmonic16-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/harmonic16-dark.css"},
    {name: "harmonic16-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/harmonic16-light.css"},
    {name: "heetch-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/heetch-dark.css"},
    {name: "heetch-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/heetch-light.css"},
    {name: "helios", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/helios.css"},
    {name: "hopscotch", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/hopscotch.css"},
    {name: "horizon-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/horizon-dark.css"},
    {name: "horizon-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/horizon-light.css"},
    {name: "humanoid-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/humanoid-dark.css"},
    {name: "humanoid-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/humanoid-light.css"},
    {name: "ia-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/ia-dark.css"},
    {name: "ia-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/ia-light.css"},
    {name: "icy-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/icy-dark.css"},
    {name: "ir-black", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/ir-black.css"},
    {name: "isotope", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/isotope.css"},
    {name: "kimber", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/kimber.css"},
    {name: "london-tube", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/london-tube.css"},
    {name: "macintosh", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/macintosh.css"},
    {name: "marrakesh", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/marrakesh.css"},
    {name: "materia", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/materia.css"},
    {name: "material-darker", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/material-darker.css"},
    {name: "material-lighter", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/material-lighter.css"},
    {name: "material-palenight", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/material-palenight.css"},
    {name: "material-vivid", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/material-vivid.css"},
    {name: "material", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/material.css"},
    {name: "mellow-purple", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/mellow-purple.css"},
    {name: "mexico-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/mexico-light.css"},
    {name: "mocha", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/mocha.css"},
    {name: "monokai", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/monokai.css"},
    {name: "nebula", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/nebula.css"},
    {name: "nord", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/nord.css"},
    {name: "nova", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/nova.css"},
    {name: "ocean", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/ocean.css"},
    {name: "oceanicnext", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/oceanicnext.css"},
    {name: "one-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/one-light.css"},
    {name: "onedark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/onedark.css"},
    {name: "outrun-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/outrun-dark.css"},
    {name: "papercolor-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/papercolor-dark.css"},
    {name: "papercolor-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/papercolor-light.css"},
    {name: "paraiso", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/paraiso.css"},
    {name: "pasque", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/pasque.css"},
    {name: "phd", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/phd.css"},
    {name: "pico", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/pico.css"},
    {name: "pop", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/pop.css"},
    {name: "porple", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/porple.css"},
    {name: "qualia", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/qualia.css"},
    {name: "railscasts", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/railscasts.css"},
    {name: "rebecca", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/rebecca.css"},
    {name: "ros-pine-dawn", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/ros-pine-dawn.css"},
    {name: "ros-pine-moon", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/ros-pine-moon.css"},
    {name: "ros-pine", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/ros-pine.css"},
    {name: "sagelight", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/sagelight.css"},
    {name: "sandcastle", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/sandcastle.css"},
    {name: "seti-ui", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/seti-ui.css"},
    {name: "shapeshifter", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/shapeshifter.css"},
    {name: "silk-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/silk-dark.css"},
    {name: "silk-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/silk-light.css"},
    {name: "snazzy", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/snazzy.css"},
    {name: "solar-flare-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/solar-flare-light.css"},
    {name: "solar-flare", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/solar-flare.css"},
    {name: "solarized-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/solarized-dark.css"},
    {name: "solarized-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/solarized-light.css"},
    {name: "spacemacs", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/spacemacs.css"},
    {name: "summercamp", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/summercamp.css"},
    {name: "summerfruit-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/summerfruit-dark.css"},
    {name: "summerfruit-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/summerfruit-light.css"},
    {name: "synth-midnight-terminal-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/synth-midnight-terminal-dark.css"},
    {name: "synth-midnight-terminal-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/synth-midnight-terminal-light.css"},
    {name: "tango", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/tango.css"},
    {name: "tender", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/tender.css"},
    {name: "tomorrow-night", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/tomorrow-night.css"},
    {name: "tomorrow", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/tomorrow.css"},
    {name: "twilight", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/twilight.css"},
    {name: "unikitty-dark", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/unikitty-dark.css"},
    {name: "unikitty-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/unikitty-light.css"},
    {name: "vulcan", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/vulcan.css"},
    {name: "windows-10-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/windows-10-light.css"},
    {name: "windows-10", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/windows-10.css"},
    {name: "windows-95-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/windows-95-light.css"},
    {name: "windows-95", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/windows-95.css"},
    {name: "windows-high-contrast-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/windows-high-contrast-light.css"},
    {name: "windows-high-contrast", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/windows-high-contrast.css"},
    {name: "windows-nt-light", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/windows-nt-light.css"},
    {name: "windows-nt", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/windows-nt.css"},
    {name: "woodland", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/woodland.css"},
    {name: "xcode-dusk", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/xcode-dusk.css"},
    {name: "zenburn", url: "https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/zenburn.css"}
];
GM_addStyle(`
    .collapsed {
        display: none !important;
    }
`);
function initCodeHighlights(toggle) {
    console.log('toggle: ' + toggle + '; settingsEnabled: ' + settingsEnabled);
    if (toggle && settingsEnabled) {
        startup();
    } else {
        shutdown();
    }
}
function startup(firstBoot = false) {
    setCss(cssUrl);
    if (firstBoot) {
        getCodeTags('code');
    } else {
        addHeaders('code');
    }
}
function shutdown() {
    injectedCss.remove();
    document.querySelectorAll('.kch_header').forEach(header => {
        header.remove();
    });
}
function addTags(item) {
    // Creates the top bar for code section displaying name, copy button - and maybe collapse later.
    const orig_code = item.textContent;
    let lang;
    for (let name of item.className.split(' ')) {
        if (name.includes('-')) {
            lang = name.split('-')[1];
            break;
        }
    }
    const parent_html = item.parentElement.innerHTML;
    const header = document.createElement('div');
    header.className = 'hljs kch_header';
    header.setAttribute('style', 'padding-top: 10px; padding-bottom: 10px; border-bottom-style: dashed;');
    const span = document.createElement('span');
    span.setAttribute('class', 'hljs-keyword');
    span.setAttribute('style', 'margin-left: 20px;');
    span.innerHTML = lang;
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-copy hljs-section';
    icon.setAttribute('aria-hidden', 'true');
    icon.style = 'margin-left: 10px; cursor: pointer;';
    icon.onclick = function() {
        document.execCommand('copy');
    }
    icon.addEventListener('copy', function(event) {
        event.preventDefault();
        if (event.clipboardData) {
            event.clipboardData.setData('text/plain', orig_code);
            tooltip.style.display = 'inline';
            setTimeout(function() {
                tooltip.style.display = 'none';
            }, 1000);
        }
    });
    const span_copied = document.createElement('span');
    span_copied.id = 'copied-tooltip';
    span_copied.innerHTML = 'COPIED!';
    span_copied.style = 'display: none; margin-left: 10px;';
    const hide_icon = document.createElement('i');
    hide_icon.className = 'fa-solid fa-chevron-up hljs-section';
    hide_icon.setAttribute('aria-hidden', 'true');
    hide_icon.style = 'float: right; margin-right: 20px; cursor: pointer;';
    hide_icon.addEventListener('click', function() {
        hide_icon.classList.toggle('fa-chevron-up');
        hide_icon.classList.toggle('fa-chevron-down');
        item.classList.toggle('collapsed');
    });
    header.appendChild(span);
    header.appendChild(icon);
    let tooltip = header.appendChild(span_copied);
    header.appendChild(hide_icon);
    item.parentElement.prepend(header);
}
function addPreTag(parent, placement, code) {
    // For some reason, sometimes code isn't wrapped in pre. Let's fix that.
    const pre = document.createElement('pre');
    parent.replaceChild(pre, code);
    pre.appendChild(code);
    hljs.highlightElement(code);
}
function getCodeTags(selector) {
    // Gets all the code sections and starts adding top bars.
    window.addEventListener("load", function () {
        addHeaders(selector);
    });
}
function setCss(url) {
    // Downloads css files and sets them on page.
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        headers: {
            "Content-Type": "text/css"
        },
        onload: function(response) {
            injectedCss = GM_addStyle(response.responseText);
        }
    });
}
function addHeaders(selector) {
    document.querySelectorAll('code').forEach(item => {
        const parent = item.parentElement;
        if (parent.nodeName !== 'PRE') {
            const placement = item.nextSibling;
            addPreTag(parent, placement, item);
        }
        addTags(item);
    });
}
function createSettings() {
    let license = (GM_info).script.header.split('\n').find(header => header.includes('license'));
    license = license.replace('//','').replace('@license','').trim();
    const settingHeader = kmoAddHeader('kbin-code-highlighting', { author: (GM_info).script.author, version: (GM_info).script.version, license: license, url: 'https://github.com/Oricul/kbin-scripts/' });
    settingsToggle = kmoAddToggle(settingHeader, 'Enabled', settingsEnabled, 'Toggle kbin-code-highlighting on or off.');
    settingsToggle.addEventListener("click", () => {
        const enabledState = kmoGetToggle(settingsToggle);
        GM_setValue(settingPrefix + 'enabled', enabledState);
        if (enabledState === true) {
            startup();
        } else {
            shutdown();
        }
    });
    let configStyles = [];
    kchStyles.forEach(style => {
        configStyles.push({ name: style.name, value: style.name });
    });
    cssDropdown = kmoAddDropDown(settingHeader, 'Style', configStyles, kchcss, 'Changes your code stylesheet.');
    cssDropdown.addEventListener("change", () => {
        const newStyle = kmoGetDropDown(cssDropdown);
        const newStyleUrl = (kchStyles.find(style => style.name === newStyle)).url;
        injectedCss.remove();
        GM_setValue(settingPrefix + 'css', newStyle);
        setCss(newStyleUrl);
    });
}
// Load settings
const settingPrefix = 'kbin-code-highlighting-'
let kchcss = GM_getValue(settingPrefix + 'css', "windows-10");
let settingsEnabled = GM_getValue(settingPrefix + 'enabled', true);
let settingsToggle;
let cssDropdown;
let cssUrl;
// Correct previous var from version 0.3
if (kchcss.includes("http")) {
    kchcss = "windows-10";
    GM_setValue(settingPrefix + 'css', kchcss);
}
// Set initial/saved style.
let injectedCss;
for (let style of kchStyles) {
    if (kchcss === style.name) {
        cssUrl = style.url;
        break;
    }
}
/*if (settingsEnabled) {
    startup(true);
}*/
createSettings();
// Configure HLJS and enable.
hljs.configure({
    ignoreUnescapedHTML: true
});
hljs.highlightAll();
