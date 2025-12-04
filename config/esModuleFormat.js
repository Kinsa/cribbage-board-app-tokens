export const esModuleFormat = ({ dictionary }) => {
  const tokens = {};

  dictionary.allTokens.forEach(token => {
    const path = token.path;
    let current = tokens;

    // Navigate/create nested structure
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }

    // Add the token value at the leaf
    current[path[path.length - 1]] = {
      value: token.value,
    };
  });

  return `export default ${JSON.stringify(tokens, null, 2)};`;
};
