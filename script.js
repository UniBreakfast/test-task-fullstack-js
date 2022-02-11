getReadmeMD().then(cleanUp)
  .then(replaceHeaders).then(makeRulers)
  .then(addCheckBoxes).then(insertHTML)
  .then(updateCheckboxes).then(assignHandlers)


let checked = JSON.parse(localStorage.poc_faboj_checked || '[]')


function getReadmeMD() {
  return fetch('README.md').then(resp => resp.text())
}

function cleanUp(md) {
  return md.replace(/\r/g, '').replace(/^\s*(\(|- \[).*$|^$/mg, '')
}

function replaceHeaders(md) {
  return md.replace(
    /^(#+) (.*)$/mg,
    (_, hashes, title) => `<h${hashes.length}>${title}</h${hashes.length}>`
  )
}

function makeRulers(md) {
  return md.replace(/^\s*---+.*$/mg, '\n<hr>')
}

function addCheckBoxes(md) {
  return md.replace(/^(?:- |\d+\. )?([^<\n]+)$/mg, (_, label) => `<label><input type="checkbox"> ${label}</label>`)
}

function insertHTML(html) {
  wrapper.innerHTML = html
}

function assignHandlers() {
  wrapper.onchange = handleCheck
}

function updateCheckboxes() {
  wrapper.querySelectorAll('input').forEach(box => box.checked = checked.includes(box.nextSibling.textContent))
}

function handleCheck(e) {
  const box = e.target
  const label = box.nextSibling.textContent
  if (box.checked && !checked.includes(label)) checked.push(label)
  else if (!box.checked && checked.includes(label))
    checked = ckecked.filter(l => l != label)
  else return
  localStorage.poc_faboj_checked = JSON.stringify(checked)
}
