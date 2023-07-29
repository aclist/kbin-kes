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
    "Key": true,
    "Label": false, //only label is optional
    "Values": true,
    "Initial": true,
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
    let type;
    const customHolder = document.createElement('div');
    if (Object.keys(objname)[0] === "Type") {
        type = "custom";
        if (fieldct === 1) {
            const ns = document.createElement('p')
            ns.innerText = "Namespace"
            //TODO: ast function
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
        customHolder.id = 'customFieldHolder' + fieldct;
        const lab = document.createElement('h3')
        lab.innerText = 'Field ' + fieldct;
        const hr = document.createElement('hr')
        customHolder.appendChild(lab)
        customHolder.appendChild(hr)
        fieldHolder.appendChild(customHolder)
        ++fieldct
    }
    //TODO: abstract obj name
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
            for (let j = 0; j < Object.keys(types).length; ++j) {
                const opt = document.createElement('option')
                opt.value = Object.keys(types)[j]
                opt.innerText = Object.keys(types)[j]
                fieldLabel.appendChild(opt)
            }
            fieldLabel.addEventListener('change', (e) => {
                //TODO: if checkbox, remove values field
                //TODO: if number or range, add fields pulled from object
                //TODO: custom fields must be required
                //TODO: if reset, add catch_reset field
                console.log(e.target.value)
            });
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
        if (type === "custom") {
            customHolder.appendChild(field)
        } else {
            fieldHolder.appendChild(field)
        }

    }
}
insertFields(fields)
s.appendChild(fieldHolder)

submit.addEventListener('click', (e) => {
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
    "desc": "${vals["desc"]}",
    "login": "${vals["login"]}",
    "recurs": "${vals["recurs"]}",
    "entrypoint": "${vals["entrypoint"]}"
    }
    `
    const oldmsg = document.querySelector('#validation')
    const oldbtn = document.querySelector('#copyButton')
    if(oldmsg) {
        oldmsg.remove();
    }
    if(oldbtn) {
        oldbtn.remove();
    }
    const gutter = document.querySelector('#json')
    const pre = document.querySelector('#textpreview')
    const outputmsg = document.createElement('text')
    outputmsg.id = 'validation'
    pre.innerText = boiler
    try {
        JSON.parse(boiler)
    } catch (error) {
        outputmsg.style.color = "red"
        outputmsg.innerText = "JSON validation failed"
        gutter.appendChild(outputmsg)
        return false;
    }
        outputmsg.style.color = "lightgreen"
        outputmsg.innerText = "JSON validation OK "
        gutter.appendChild(outputmsg)
    const copyButton = document.createElement('button')
    copyButton.id = 'copyButton'
    copyButton.innerText = 'COPY'
    gutter.appendChild(copyButton)
    copyButton.addEventListener('click', (e) =>{
        const tocopy = e.target.previousElementSibling.innerText
        navigator.clipboard.writeText(tocopy);
    });
    const oldHolder = document.querySelector('#HOLDER')
    if (oldHolder){
        oldHolder.remove();
    }
    const ex = document.querySelector('#box')
    ex.innerText = "";
    const h = document.createElement('div')
    h.id = 'HOLDER'
    ex.appendChild(h)
        console.log(boiler)
        let pf
        for (let i = 0; i<ar.length; ++i) {
        pf = document.createElement('p')
        pf.innerText = ar[i]
        h.appendChild(pf)
    }
});
