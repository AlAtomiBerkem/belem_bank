export function getPdfUrlFromQuery() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const file = params.get('file');
  if (!file) return null;
  return `http://localhost:3001/api/files/${file}`;
}

export function getFileBreadcrumbs() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const file = params.get('file');
  if (!file) return [];
  const parts = file.split('/');
  let acc = '';
  return parts.slice(0, -1).map((part, idx) => {
    acc += (idx === 0 ? '' : '/') + part;
    return {
      name: part,
      path: acc,
    };
  });
}

export function getFileNameFromQuery() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const file = params.get('file');
  if (!file) return '';
  const parts = file.split('/');
  return parts[parts.length - 1];
} 