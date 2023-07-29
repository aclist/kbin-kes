const fields = {
    "Name": true,
    "Authors": true,
    "Page": true,
    "Desc": true,
    "Entrypoint": true,
    "Link": false,
    "Link label": false,
}
const customFields = {
    "Type": true,
    "Initial": true,
    "Key": true,
    "Label": false, //only label is optional
    "Values": true,
    //    csv: catch_reset
    //    csv: values
}
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
//TODO: validate json
const a = document.querySelector('#header')
const b = document.createElement('input')
const submit = document.createElement('button')
submit.innerText = 'SUBMIT'
const add = document.createElement('button')
add.innerText = 'ADD CUSTOM FIELD'
a.appendChild(add)
a.appendChild(submit)
add.addEventListener('click', () => {
    const ent = document.querySelector('#entryfields');
    console.log("inserting")
        insertFields(customFields);
});
const s = document.querySelector('#buttons')
let field
const fieldHolder = document.createElement('div')
fieldHolder.id = 'entryfields'
let fieldct = 1
function insertFields(objname){
    if (Object.keys(objname)[0] === "Type") {
        if (fieldct === 1) {
            const ns = document.createElement('p')
            ns.innerText = "Namespace"
            let ast
            ast = document.createElement('span')
            ast.innerText = "*"
            ast.style.color = 'orange'
            ns.appendChild(ast)
            fieldLabel = document.createElement('textarea')
            const sep = document.createElement('br')
            ns.appendChild(sep)
            ns.appendChild(fieldLabel);
            fieldHolder.appendChild(ns)

        }
        const lab = document.createElement('h3')
        lab.innerText = 'Field ' + fieldct;
        const hr = document.createElement('hr')
        fieldHolder.appendChild(lab)
        fieldHolder.appendChild(hr)
        ++fieldct
    }
    for (let i = 0; i<Object.keys(objname).length; ++i){

        field = document.createElement('p')
        let ast
        if (fields[Object.keys(objname)[i]] === true) {
            ast = document.createElement('span')
            ast.innerText = "*"
            ast.style.color = 'orange'
        } else {
            ast = document.createElement('text')
        }
        field.innerText = Object.keys(objname)[i]
        field.appendChild(ast)
        if (Object.keys(objname)[i] === "Type") {
            fieldLabel = document.createElement('select')
            const opt = document.createElement('option')
            opt.value = 'test'
            opt.innerText = 'test'
            fieldLabel.appendChild(opt)
        } else {
            fieldLabel = document.createElement('textarea')
        }
        fieldLabel.className = 'COPY'
        fieldLabel.setAttribute("key",Object.keys(objname)[i].toLowerCase())
        if (Object.keys(objname)[i] === "Desc") {
            fieldLabel.setAttribute("rows", "8")
        }
        const sep = document.createElement('br')
        field.appendChild(sep)
        field.appendChild(fieldLabel)
        fieldHolder.appendChild(field)

    }
}
insertFields(fields)
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
