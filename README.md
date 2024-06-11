# web

## Architecture

See the documentation [here](./docs/architecture.md).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Format files

```sh
bun format
```

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

<!-- ### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
bun test-unit
``` -->

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
bun test-e2e-api-validation
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test-e2e-api-validation` before deploying (e.g. in CI environments):

```sh
bun run build
bun test-e2e-api-validation
```
