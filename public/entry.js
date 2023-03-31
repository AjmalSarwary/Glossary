const entryForm = document.getElementById('entry-form');

async function termExists(termToCheck) {
  const entriesResponse = await fetch('/entries');
  const entries = await entriesResponse.json();
  return entries.some(entry => entry.term.toLowerCase() === termToCheck.toLowerCase());
}

async function saveEntry(event) {
  event.preventDefault();
  const formData = new FormData(entryForm);
  const term = formData.get('term');
  const definition = formData.get('definition');

  if (await termExists(term)) {
    alert(`Entry request denied. The term "${term}" already exists. Search "${term}" in Glossary.`);
    return;
  }

  const response = await fetch('/save-entry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ term, definition }),
  });

  if (response.ok) {
    window.location.href = '/index.html';
  } else {
    console.error('Failed to save entry:', response.status, response.statusText);
  }
}

entryForm.addEventListener('submit', saveEntry);

(async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const editIndex = urlParams.get('editIndex');

  if (editIndex !== null) {
    const response = await fetch(`/entries/${editIndex}`);
    const { term, definition } = await response.json();

    document.getElementById('term').value = term;
    document.getElementById('definition').value = definition;

    entryForm.removeEventListener('submit', saveEntry);
    entryForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(entryForm);
      const updatedTerm = formData.get('term');
      const updatedDefinition = formData.get('definition');

      const response = await fetch(`/entries/${editIndex}`);
      const { id, term, definition } = await response.json();

      if (term.toLowerCase() !== updatedTerm.toLowerCase() && await termExists(updatedTerm)) {
        alert(`Update request denied. The term "${updatedTerm}" already exists. Search "${updatedTerm}" in Glossary and select Edit.`);
        return;
      }

      const updateResponse = await fetch(`/update-entry/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term: updatedTerm, definition: updatedDefinition }),
      });

      if (updateResponse.ok) {
        console.log('Entry updated successfully:', updateResponse);
        window.location.href = '/index.html';
      } else {
        console.error('Failed to update entry:', updateResponse.status, updateResponse.statusText);
      }
    });
  }
})();
