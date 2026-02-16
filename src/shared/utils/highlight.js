const escapeHtml = (unsafeStr) => {
  return unsafeStr
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const escapeRegexp = (unsafeStr) => {
  return unsafeStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const highlightCaseInsensitive = (text, query) => {
  const safeText = escapeHtml(text);
  const queryFormatted = query.trim();
  const safeQuery = escapeHtml(queryFormatted);

  if (queryFormatted.length === 0) {
    return safeText
  }

  const pattern = new RegExp(escapeRegexp(safeQuery), 'ig');

  return safeText.replace(
    pattern,
    `<mark>$&</mark>`
  )
};
