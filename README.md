# Patchwright demo site

A deliberately inaccessible shop ("Fernhill Goods") used to try Patchwright end to end. It is a
copy of `fixtures/broken-site/public` from the Patchwright repository, which documents exactly
30 accessibility violations across these 12 pages. Nothing here is a real shop: no form does
anything, and no data is collected.

The only change from the fixture is that links, stylesheet, script and image references were
made relative and given `.html` extensions, because GitHub Pages serves this repository under a
path (`/patchwright-demo-site/`) rather than at a domain root. Every element the fixture's
`EXPECTED.json` names is untouched, so the same 30 violations are still here.

Published at <https://nioz-15.github.io/patchwright-demo-site/>.
