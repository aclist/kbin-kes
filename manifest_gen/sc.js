const fields = {
    "Name": true,
    "Authors": true,
    "Page": true,
    "Description": true,
    "Entrypoint": true,
    "Link": false,
    "Link label": false,
}
const customFields = [
    "namespace",
    "initial",
    "key",
    "label", //only label is optional
    "type",
    "values"
    //    csv: catch_reset
    //    csv: values
]
const types = {
    "text": null,
    "radio": null,
    "reset": {"catch_reset": true},
    "color": null,
    "range": {"min": true, "max": true, "step": true},
    "number": {"min": true, "max": true, "step": true},
    "checkbox": {"checkbox_label": false},
}
//const boiler = `
//{
//"name": "${name}",
//"author": "${author}",
//"label": "${label}",
//"desc": "${desc}"
//"login": "${login}",
//"recurs": "${recurs}",
//"entrypoint": "${entrypoint}",
//"namespace": "${namespace}"
//}
//`
//TODO: validate json
const a = document.querySelector('#header')
const b = document.createElement('input')
//const la = document.createElement('label')
const submit = document.createElement('button')
submit.innerText = 'SUBMIT'
const add = document.createElement('button')
add.innerText = 'ADD CUSTOM FIELD'
a.appendChild(add)
a.appendChild(submit)
const s = document.querySelector('#buttons')
let field
const fieldHolder = document.createElement('div')
fieldHolder.id = 'entryfields'
for (let i = 0; i<Object.keys(fields).length; ++i){

    field = document.createElement('p')
    let ast
    if (fields[Object.keys(fields)[i]] === true) {
        ast = document.createElement('span')
        ast.innerText = "*"
        ast.style.color = 'orange'
    } else {
        ast = document.createElement('text')
    }
    field.innerText = Object.keys(fields)[i]
    field.appendChild(ast)
    fieldLabel = document.createElement('input')
    fieldLabel.setAttribute("type", "textarea")
    fieldLabel.className = 'COPY'
    field.appendChild(fieldLabel)
    fieldHolder.appendChild(field)

}
s.appendChild(fieldHolder)

const copyButton = document.querySelector('#copybutton')
copyButton.addEventListener('click', (e) =>{
    const tocopy = e.target.previousElementSibling.innerText
    navigator.clipboard.writeText(tocopy);
});
submit.addEventListener('click', (e) => {
    const oldHolder = document.querySelector('#HOLDER')
    if (oldHolder){
        oldHolder.remove();
    }
    const ex = document.querySelector('#box')
    ex.innerText = "";
    const h = document.createElement('div')
    h.id = 'HOLDER'
    ex.appendChild(h)
    const par = e.target.parentElement
    const ar = []
    par.querySelectorAll('.COPY').forEach((item) => {
        ar.push(item.value)
    });
    let pf
    for (let i = 0; i<ar.length; ++i) {
        pf = document.createElement('p')
        pf.innerText = ar[i]
        h.appendChild(pf)
    }

});
