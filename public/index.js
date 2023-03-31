let glossaryCache = null;

async function fetchGlossary() {
if (glossaryCache){
	return glossaryCache;
}
  const response = await fetch('/entries');
  const data = await response.json();
glossaryCache = data;
  return data;
}

async function deleteEntry(index) {

    const userConfirmed = window.confirm('Are you sure you want to delete this entry?');

  if (!userConfirmed) {
    return;
  }
  const response = await fetch(`/entries/${index}`);
  if (!response.ok) {
    console.error('Failed to fetch entry:', response.status, response.statusText);
    return;
  }

  const { id } = await response.json();
  const deleteResponse = await fetch(`/delete-entry/${id}`, {
    method: 'DELETE',
  });

  if (deleteResponse.ok) {
    console.log(`Deleted entry at index ${index}`);
    location.reload();
  } else {
    console.error('Failed to delete entry:', deleteResponse.status, deleteResponse.statusText);
  }
}

//Deninitions block
function showDefinition(index) {
  console.log(`Showing definition for entry at index ${index}`);
  document.querySelector('.definition.active')?.classList.remove('active');
  document.getElementById(`definition-${index}`).classList.add('active');
}
async function buildGlossaryUI() {
  const glossary = await fetchGlossary();
  const termsContainer = document.createElement('div');
  termsContainer.classList.add('terms');
  const definitionsContainer = document.createElement('div');
  definitionsContainer.classList.add('definitions');

  const terms = document.getElementById('terms');
  const definitions = document.getElementById('definitions');
  const buttonsContainer = document.getElementById('buttons-container');

  terms.appendChild(termsContainer);
  definitions.appendChild(definitionsContainer);

  // Create edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.disabled = true;
  buttonsContainer.appendChild(editButton);

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.disabled = true;
  buttonsContainer.appendChild(deleteButton);

  glossary.forEach((entry, index) => {
    const termButton = document.createElement('button');
    termButton.textContent = entry.term;
    termButton.id = `term-button-${index}`;
    termButton.classList.add('term-button');
    termButton.onclick = () => {
      showDefinition(index);
      editButton.disabled = false;
      editButton.onclick = () => {
        window.location.href = `/entry.html?editIndex=${index}`;
      };
      deleteButton.disabled = false;
      deleteButton.onclick = () => deleteEntry(index);
    };
    termsContainer.appendChild(termButton);

    const definition = document.createElement('div');
    definition.innerHTML = entry.definition;
    definition.id = `definition-${index}`;
    definition.classList.add('definition');
    definitionsContainer.appendChild(definition);
  });

  console.log('Finished building glossary UI');
}

buildGlossaryUI();
