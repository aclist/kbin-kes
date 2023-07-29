const fields = {
    "Name": true,
    "Authors": true,
    "Page": true,
    "Desc": true,
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
const vals = {
    name: "",
    authors: "",
    label: "",
    desc: "",
    login: "",
    recurs: "",
    entrypoint: "",
    namespace: ""
}
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
    fieldLabel = document.createElement('textarea')
    fieldLabel.className = 'COPY'
    fieldLabel.setAttribute("key",Object.keys(fields)[i].toLowerCase())
    if (Object.keys(fields)[i] === "Desc") {
        fieldLabel.setAttribute("rows", "8")
    }
    const sep = document.createElement('br')
    field.appendChild(sep)
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
    const par = document.querySelector('#entryfields')
    const ar = []
    par.querySelectorAll('.COPY').forEach((item) => {
        ar.push(item.value)
        let elKey = item.getAttribute("key")
        console.log(elKey)
        vals[elKey] = item.value
    });
    const boiler = `{
    "name": "${vals["name"]}",
    "authors": "${vals["authors"]}",
    "label": "${vals["label"]}",
    "desc": "${vals["desc"]}"
    "login": "${vals["login"]}",
    "recurs": "${vals["recurs"]}",
    "entrypoint": "${vals["entrypoint"]}",
    "namespace": "${vals["namespace"]}"
    }
    `
    const pre = document.querySelector('#textpreview')
    pre.innerText = boiler
    console.log(boiler)
    let pf
    for (let i = 0; i<ar.length; ++i) {
        pf = document.createElement('p')
        pf.innerText = ar[i]
        h.appendChild(pf)
    }

});
