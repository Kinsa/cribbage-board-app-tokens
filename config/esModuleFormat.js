export const esModuleFormat = ({ dictionary }) => {
  const tokens = {};

  // Process each token and convert its path to camelCase
  dictionary.allTokens.forEach(token => {
    const path = token.path.map(segment =>
      segment.toLowerCase().replace(/[\s-]+(.)/g, (_, char) => char.toUpperCase())
    );
    let current = tokens;

    // For each token, take its path (which is an array like ["light", "surface", "player 1"]) and convert it to camelCase (["light", "surface", "player1"])
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }

    // Add the token value at the leaf - use $value for raw, value for transformed
    current[path[path.length - 1]] = token.$value || token.value;
  });

  const stringifyValue = (value, indent = 0) => {
    // Create two indent levels: spaces for the current level and nextSpaces for the next level (one level deeper)
    const spaces = '  '.repeat(indent);
    const nextSpaces = '  '.repeat(indent + 1);

    // If it's a string, wrap it in quotes. For null, non-objects, or arrays, use standard JSON.stringify
    if (typeof value === 'string') {
      return `"${value}"`;
    }
    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
      return JSON.stringify(value);
    }

    // Convert the object to key-value pairs. If it's empty, return {}
    const entries = Object.entries(value);
    if (entries.length === 0) {
      return '{}';
    }

    // For each key-value pair, create a string like invertedPrimary: "#faf8f8" by recursively calling stringifyValue on the value with increased indentation
    const items = entries.map(
      ([key, val]) => `${nextSpaces}${key}: ${stringifyValue(val, indent + 1)}`
    );

    // Wrap everything in curly braces with proper newlines and indentation to create nicely formatted output
    return `{\n${items.join(',\n')}\n${spaces}}`;
  };

  return `export default ${stringifyValue(tokens)};`;
};
