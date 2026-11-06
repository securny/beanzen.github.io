(() => {
  const input = document.querySelector('#scaleSearch');
  if (!input) return;
  const entries = [...document.querySelectorAll('.scaleEntry')];
  const indexLinks = [...document.querySelectorAll('.scaleIndex a')];
  const searchable = entries.map(entry => entry.dataset.search.normalize('NFKC').toLocaleLowerCase());
  document.querySelector('.scaleSearch').hidden = false;
  input.addEventListener('input', () => {
    const query = input.value.trim().normalize('NFKC').toLocaleLowerCase();
    let count = 0;
    entries.forEach((entry, index) => {
      const matches = searchable[index].includes(query);
      entry.hidden = !matches;
      indexLinks[index].hidden = !matches;
      if (matches) count++;
    });
    document.querySelector('#scaleCount').textContent = String(count);
    document.querySelector('#noScaleResults').hidden = count !== 0;
  });
})();
