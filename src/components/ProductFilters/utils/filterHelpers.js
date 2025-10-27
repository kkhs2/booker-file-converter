/**
 * Updates the filter state by toggling the `checked` property of a filter item
 * based on the provided value. Handles both flat and grouped filter structures,
 * as well as toggle filters with boolean values.
 *
 * @param {Object} prevFilters - The previous state of the filters.
 * @param {string} value - The value of the filter item to toggle, or filter key for toggle filters.
 * @returns {Object} The updated filters with the toggled `checked` property.
 */
export const filterChange = (prevFilters, value) => {
  const updatedFilters = { ...prevFilters };

  // Check if the value matches a toggle filter key directly
  if (
    updatedFilters[value] &&
    updatedFilters[value].hasOwnProperty('value') &&
    typeof updatedFilters[value].value === 'boolean'
  ) {
    // Handle toggle filter
    updatedFilters[value] = {
      ...updatedFilters[value],
      value: !updatedFilters[value].value,
    };
    return updatedFilters;
  }

  Object.keys(updatedFilters).forEach((filterKey) => {
    const filter = updatedFilters[filterKey];

    if (filter.items) {
      // Handle flat options
      updatedFilters[filterKey] = {
        ...filter,
        items: filter.items.map((item) =>
          item.value === value ? { ...item, checked: !item.checked } : item,
        ),
      };
    } else {
      // Handle grouped options
      Object.keys(filter).forEach((groupKey) => {
        if (filter[groupKey]?.items) {
          updatedFilters[filterKey][groupKey] = {
            ...filter[groupKey],
            items: filter[groupKey].items.map((item) =>
              item.value === value ? { ...item, checked: !item.checked } : item,
            ),
          };
        }
      });
    }
  });

  return updatedFilters;
};

/**
 * Updates the filter state for single selection mode (radio button behavior).
 * Unchecks all other items and checks only the selected one.
 *
 * @param {Object} prevFilters - The previous state of the filters.
 * @param {string} filterKey - The key of the filter to update.
 * @param {string} value - The value of the filter item to select.
 * @returns {Object} The updated filters with the selected item checked and others unchecked.
 */
export const filterSingleChange = (prevFilters, filterKey, value) => {
  const updatedFilters = { ...prevFilters };
  const filter = updatedFilters[filterKey];

  if (!filter) {
    return updatedFilters;
  }

  if (filter.items) {
    // Handle flat options
    updatedFilters[filterKey] = {
      ...filter,
      items: filter.items.map((item) => ({
        ...item,
        checked: item.value === value,
      })),
    };
  } else {
    // Handle grouped options
    Object.keys(filter).forEach((groupKey) => {
      if (filter[groupKey]?.items) {
        updatedFilters[filterKey][groupKey] = {
          ...filter[groupKey],
          items: filter[groupKey].items.map((item) => ({
            ...item,
            checked: item.value === value,
          })),
        };
      }
    });
  }

  return updatedFilters;
};
