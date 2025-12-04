Design token source repository for [Cribbage Board App](https://github.com/Kinsa/cribbage-board-app).

## Project Structure

```bash
tokens/
├── design-tokens.tokens.json # Main design token definitions
```

This repository uses [Style Dictionary](https://styledictionary.com) to transform design tokens into multiple output formats (CSS variables, JavaScript exports).

## Token Output Formats

After running `npm run build`, the following files are generated:

- **ES Module**: `build/es/variables.mjs` - ES6 module for JavaScript/TypeScript projects
- **CSS**: `build/css/_variables.css` - CSS custom properties for web applications
- **JavaScript**: `build/js/variables.js` - CSS properties as JavaScript variables for JavaScript/TypeScript projects
- **Tailwind v3**:
  - `build/tailwind/cssVarsPlugin.js` - A [Tailwind plugin](https://tailwindcss.com/docs/adding-custom-styles#functional-utilities) for registering new [base styles](https://tailwindcss.com/docs/adding-custom-styles#functional-utilities). The rgbChannels transform removes the color space function for compatability with Tailwind's [opacity modifier syntax](https://tailwindcss.com/docs/color#changing-the-opacity).
  - `build/tailwind/themeColors.js` - Tailwind theme color values that reference the plugin [css vars](https://tailwindcss.com/docs/colors#using-css-variables).
  - `build/tailwind/preset.js` - [Tailwind preset file](https://v3.tailwindcss.com/docs/presets) that imports the colors and plugin.

## Installation as a Dependency

To use these tokens in another project by installing from the main branch:

```bash
# sh
npm install github:Kinsa/cribbage-board-app-tokens
```

Then import the tokens in your project:

```
// ES Module
import variables from '@kinsa/cribbage-board-app-tokens';



/* CSS */
@import '@kinsa/cribbage-board-app-tokens/build/css/_variables.css';

// JavaScript
import {
  LightSurfaceBoardTrack,
  LightSurfacePlayer1,
  LightSurfacePlayer2,
} from '@kinsa/cribbage-board-app-tokens/build/js/variables';

// Tailwind (in your tailwind.config.js)
module.exports = {
  // content: ['./index.html'], etc. ...
  presets: [
    require('@kinsa/cribbage-board-app-tokens/build/tailwind/preset').default,
  ],
}
```

To update (this will update the local code to match the code in the repository):

```bash
# sh
npm update @kinsa/cribbage-board-app-tokens
```

## Contributing

This project is licensed under the Apache License 2.0. By contributing, you agree that your contributions will be licensed under the same license. See [LICENSE](LICENSE) for details.

To add or modify design tokens:

1. Clone the project and create a new branch
2. Install the requisite version of Node.js using [Mise](https://mise.jdx.dev): `mise install`
3. Install the project: `npm install`
4. Edit the token definitions in `tokens/design-tokens.tokens.json`
5. Create any unit tests for functionality using Mocha and Chai in the `test/` directory
   a. Run tests with `npx mocha`, `npm run test`, or `mise run test` (they all run the same thing)
6. Lint and fix code `mise run lint`
7. Format code according to the prettier rules `mise run format`
8. Run `npm run build` to regenerate outputs
9. Commit the token source and build files - linting will be ran and files formatted using prettier before you can commit
10. Push and submit a pull request to the `develop` branch - tests will be run before you can push

## Publishing

1. Create a release branch
2. Bump the version number in `package.json`
3. Test
4. Build
5. Make a PR onto `main`
6. Merge the PR
7. Create a tag with the same version number as set in step 2

## Attribution and License

Copyright 2025 Kinsa Creative Incorporated

This project includes configuration and code derived from [style-dictionary examples](https://github.com/style-dictionary/style-dictionary/tree/main/examples/advanced/tailwind-preset), which are licensed under the Apache License 2.0. Specifically, the configuration files in the `config/` directory and `config.js` are based on the Tailwind preset example from that repository.

The modifications and original content in this project remain licensed under the [Apache License 2.0](LICENSE).
