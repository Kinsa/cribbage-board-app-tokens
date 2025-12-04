import { expect } from 'chai';
import { describe, it } from 'mocha';
import fs from 'fs';

const designTokens = JSON.parse(fs.readFileSync('./tokens/design-tokens.tokens.json', 'utf-8'));

/**
 * Recursively extracts all token keys from a nested object
 * @param {object} obj - The object to traverse
 * @param {string} prefix - The current key path (used for recursion)
 * @returns {Set<string>} Set of all token paths
 */
function extractTokenKeys(obj, prefix = '') {
  const keys = new Set();

  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;

    // Check if this is a token (has $type property)
    if (typeof value === 'object' && value !== null && '$type' in value) {
      keys.add(fullPath);
    } else if (typeof value === 'object' && value !== null && !('$type' in value)) {
      // Recurse into nested objects
      const nestedKeys = extractTokenKeys(value, fullPath);
      nestedKeys.forEach(k => keys.add(k));
    }
  }

  return keys;
}

describe('Design Tokens Schema', () => {
  it('should have both light and dark themes defined', () => {
    expect(designTokens).to.have.property('light');
    expect(designTokens).to.have.property('dark');
  });

  it('should have matching token structure between light and dark themes', () => {
    const lightKeys = extractTokenKeys(designTokens.light);
    const darkKeys = extractTokenKeys(designTokens.dark);

    // Check that every light token exists in dark
    const missingInDark = Array.from(lightKeys).filter(key => !darkKeys.has(key));
    expect(missingInDark, `Missing in dark theme: ${missingInDark.join(', ')}`).to.be.empty;

    // Check that every dark token exists in light
    const missingInLight = Array.from(darkKeys).filter(key => !lightKeys.has(key));
    expect(missingInLight, `Missing in light theme: ${missingInLight.join(', ')}`).to.be.empty;
  });

  it('should have no orphaned token keys without a matching theme', () => {
    // This verifies that both themes have exactly the same token paths
    const lightKeys = extractTokenKeys(designTokens.light);
    const darkKeys = extractTokenKeys(designTokens.dark);

    expect(lightKeys.size).to.equal(
      darkKeys.size,
      'Light and dark themes should have the same number of tokens'
    );
  });

  it('should have matching button tokens between player 1 and player 2 in both themes', () => {
    const themes = ['light', 'dark'];

    for (const theme of themes) {
      const player1Keys = extractTokenKeys(designTokens[theme].button['player 1']);
      const player2Keys = extractTokenKeys(designTokens[theme].button['player 2']);

      // Check that every player 1 button token exists in player 2
      const missingInPlayer2 = Array.from(player1Keys).filter(key => !player2Keys.has(key));
      expect(missingInPlayer2, `Missing in ${theme} button.player2: ${missingInPlayer2.join(', ')}`)
        .to.be.empty;

      // Check that every player 2 button token exists in player 1
      const missingInPlayer1 = Array.from(player2Keys).filter(key => !player1Keys.has(key));
      expect(missingInPlayer1, `Missing in ${theme} button.player1: ${missingInPlayer1.join(', ')}`)
        .to.be.empty;

      // Check they have the same number of tokens
      expect(player1Keys.size).to.equal(
        player2Keys.size,
        `${theme} button.player1 and button.player2 should have the same number of tokens`
      );
    }
  });
});
