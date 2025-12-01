Design token source repository for [Cribbage Board App](https://github.com/Kinsa/cribbage-board-app).

## Project Structure

```bash
tokens/ 
├── design-tokens.tokens.json # Main design token definitions
```

This repository uses [Style Dictionary](https://amzn.github.io/style-dictionary) to transform design tokens into multiple output formats (CSS variables, JavaScript exports).

## Token Output Formats

After running `npm run build`, the following files are generated:

- **CSS**: `build/css/_variables.css` - CSS custom properties for web applications
- **JavaScript**: `build/js/variables.js` - ES6 module for JavaScript/TypeScript projects

## Installation as a Dependency

To use these tokens in another project:

```bash
# sh
npm install @kinsa/cribbage-board-app-tokens
```

Then import the tokens in your project:

```
// JavaScript
import tokens from '@kinsa/cribbage-board-app-tokens';

/* CSS */
@import '@kinsa/cribbage-board-app-tokens/build/css/_variables.css';
```

## Contributing

This project is licensed under the Apache License 2.0. By contributing, you agree that your contributions will be licensed under the same license. See [LICENSE](LICENSE) for details.

To add or modify design tokens:

1. Install the requisite version of Node.js using [Mise](https://mise.jdx.dev): `mise install`
2. Install the project: `npm install`
3. Edit the token definitions in `tokens/design-tokens.tokens.json`
4. Run `npm run build` to regenerate outputs
5. Commit the token source
6. Submit a pull request

## Publishing

To publish a new version to npm:

```bash
npm version patch    # or minor, major
npm publish
```

The `prepublishOnly` script will automatically build tokens before publishing.

## License

Copyright 2025 Kinsa Creative Incorporated

Licensed under the Apache License, Version 2.0
