/**
 * Convert props object to string
 * @param {Object} propsObj - The props object
 * @returns {string} - The props as a string
 */

export function convertPropsToString(propsObj) {
  if (!propsObj) return '';

  return Object.entries(propsObj)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? key : null;
      }
      if (typeof value === 'string') {
        const escapedValue = value.includes('"') ? `'${value}'` : `"${value}"`;
        return `${key}=${escapedValue}`;
      }
      return `${key}={${JSON.stringify(value, null, 2)}}`;
    })
    .filter(Boolean)
    .join('\n  ');
}
