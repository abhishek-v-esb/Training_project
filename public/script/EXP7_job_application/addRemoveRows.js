function addCompRow() {
  const tr = document.createElement("tr");
  const body = document.querySelector("#compTable tbody");
  const id = parseInt(body.lastElementChild.id.slice(-1));

  tr.id = id + 1;
  tr.innerHTML = `<td><label for="company">Company:</label></td>
    <td>
      <input
        type="text"
        name="company"
        id="company${id + 1}"
        onkeyup="enableComp(this)"
      />
      <span class="error"><p id="company${id + 1}_error"></p></span>
    </td>
    <td><label for="companydesignation">Designation:</label></td>
    <td>
      <input
        type="text"
        name="companydesignation"
        id="company${id + 1}designation"
        class="disabledClass"
        disabled
      />
      <span class="error"
        ><p id="company${id + 1}designation_error"></p
      ></span>
    </td>
    <td><label for="companyfrom">From:</label></td>
  
    <td>
      <input
        type="date"
        name="companyfrom"
        id="company${id + 1}from"
        placeholder="dd-mm-yyyy"
        class="disabledClass"
        disabled
      />
      <span class="error"><p id="company${id + 1}from_error"></p></span>
    </td>
    <td><label for="companyto">To:</label></td>
    <td>
      <input
        type="date"
        name="companyto"
        id="company${id + 1}to"
        placeholder="dd-mm-yyyy"
        class="disabledClass"
        disabled
      />
      <span class="error"><p id="company${id + 1}to_error"></p></span>
    </td>`;

  body.appendChild(tr);
}

function removeCompRow() {
  const element = document.querySelector("#compTable tbody").lastElementChild;

  if (parseInt(element.id.slice(-1)) > 2) {
    element.remove();
  }
}

function addRefRow() {
  const tr = document.createElement("tr");
  const body = document.querySelector("#refTable tbody");
  const id = parseInt(body.lastElementChild.id.slice(-1));

  const newId = `ref${id + 1}`;
  tr.id = `ref${id + 1}`;

  tr.innerHTML = `<td><label for="ref">Name:</label></td>
    <td>
      <input
        type="text"
        name="ref"
        id="${newId}"
        onkeyup="enableRef(this)"
      />
      <span class="error"><p id="${newId}_error"></p></span>
    </td>
  
    <td><label for="refcontact">Contact:</label></td>
    <td>
      <input
        type="text"
        name="refcontact"
        id="${newId}contact"
        class="disabledClass"
        disabled
      />
      <span class="error"><p id="${newId}contact_error"></p></span>
    </td>
    <td><label for="refrelation">Relation:</label></td>
    <td>
      <input
        type="text"
        name="refrelation"
        id="${newId}relation"
        class="disabledClass"
        disabled
      />
      <span class="error"><p id="${newId}relation_error"></p></span>
    </td>`;

  body.appendChild(tr);
}

function removeRefRow() {
  const element = document.querySelector("#refTable tbody").lastElementChild;
  const id = parseInt(element.id.slice(-1));
  if (id > 2) {
    element.remove();
  }
}
