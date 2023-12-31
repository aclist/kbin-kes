const fields = {
    "Name": true,
    "Authors": true,
    "Page": true,
    "Desc": true,
    "Entrypoint": true,
    "Login": true,
    "Recurs": true,
    "Link": false,
    "Link_label": false,
}
const custom = {
    "Type": true,
    "Key": true,
    "Values": true,
    "Initial": true,
    "Label": false
}
const types = {
    "color": null,
    "checkbox": {"checkbox_label": true},
    "select": null,
    "number": {"Min": true, "Max": true, "Step": true},
    "radio": null,
    "range": {"Min": true, "Max": true, "Step": true},
    "reset": {"catch_reset": true},
    "text": null,
}
const vals = {
    name: "",
    authors: "",
    desc: "",
    login: "",
    recurs: "",
    entrypoint: "",
    namespace: "",
}
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
        insertFields(custom);
});
const s = document.querySelector('#buttons')
let field
const fieldHolder = document.createElement('div')
fieldHolder.id = 'entryfields'
let fieldct = 1
function selector (type) {
    const r = document.querySelector('[key="values"]').parentElement
    const i = document.querySelector('[key="initial"]').parentElement
    $(r).show();
    $(i).show();
    if (types[type]) {
        const subFields = Object.keys(types[type])
        const s = []
        for (let i = 0; i < subFields.length; ++i) {
            console.log(subFields[i])
            s.push(subFields[i])
        }
        if ((type === "checkbox") || (type === "range") || (type === "number") || (type === "reset")) {
            $(r).hide();
            $(i).hide();
        }
        return s
    }
}
function insertFields(objname){
    let type;
    const obj = Object.keys(objname)
    const customHolder = document.createElement('div');
    if (obj[0] === "Type") {
        type = custom;
        if (fieldct === 1) {
            const ns = document.createElement('p')
            ns.innerText = "Namespace"
            //TODO: ast as function
            let ast
            ast = document.createElement('span')
            ast.innerText = "*"
            ast.style.color = 'orange'
            ns.appendChild(ast)
            fieldLabel = document.createElement('textarea')
            fieldLabel.className = 'input-field'
            fieldLabel.setAttribute("key",'namespace')
            const sep = document.createElement('br')
            ns.appendChild(sep)
            ns.appendChild(fieldLabel);
            fieldHolder.appendChild(ns)

        }
        customHolder.id = 'customFieldHolder';
        const lab = document.createElement('h3')
        lab.innerText = 'Field ' + fieldct;
        const hr = document.createElement('hr')
        customHolder.appendChild(lab)
        customHolder.appendChild(hr)
        fieldHolder.appendChild(customHolder)
        ++fieldct
    } else {
        type = fields
    }
    for (let i = 0; i < obj.length; ++i){
        field = document.createElement('p')
        let ast
        if (type[obj[i]] === true) {
            ast = document.createElement('span')
            ast.innerText = "*"
            ast.style.color = 'orange'
        } else {
            ast = document.createElement('text')
        }
        field.innerText = obj[i]
        field.appendChild(ast)
        if (obj[i] === "Type") {
            fieldLabel = document.createElement('select')
            for (let j = 0; j < Object.keys(types).length; ++j) {
                const opt = document.createElement('option')
                opt.value = Object.keys(types)[j]
                opt.innerText = Object.keys(types)[j]
                fieldLabel.appendChild(opt)
            }
            fieldLabel.addEventListener('change', (e) => {
                const o = document.querySelector('#subfields')
                if (o) {
                    o.remove();
                }
                const ret = selector(e.target.value)
                if (ret) {
                const subFieldHolder = document.createElement('div')
                subFieldHolder.id = 'subfields'
                for (let k = 0; k < ret.length; ++k) {
                    const subfield = document.createElement('p')
                    subfield.innerText = ret[k]
                    const ast = document.createElement('span')
                    ast.innerText = "*"
                    ast.style.color = 'orange'
                    subfield.appendChild(ast)
                    fieldLabel = document.createElement('textarea')
                    fieldLabel.className = 'input-field'
                    fieldLabel.setAttribute("key", ret[k].toLowerCase())
                    const sep = document.createElement('br')
                    subfield.appendChild(sep)
                    subfield.appendChild(fieldLabel)
                    subFieldHolder.appendChild(subfield)
                }
                    customHolder.appendChild(subFieldHolder)
                }
            });
        } else {
            if ((obj[i] === "Login") || (obj[i] === "Recurs")) {
                fieldLabel = document.createElement('input')
                fieldLabel.setAttribute("type", "checkbox")
                fieldLabel.id = obj[i]
                fieldLabel.classList.add('tgl', 'kes-tgl')
                fieldLabel.checked = false
            } else {
                fieldLabel = document.createElement('textarea')
            }
        }
        fieldLabel.classList.add('input-field')
        fieldLabel.setAttribute("key", obj[i].toLowerCase())
        if (Object.keys(objname)[i] === "Desc") {
            fieldLabel.setAttribute("rows", "8")
        }
        const sep = document.createElement('br')
        field.appendChild(sep)
        field.appendChild(fieldLabel)
        if (fieldLabel.type === 'checkbox') {
            const subtog = document.createElement('label')
            subtog.setAttribute("for", obj[i])
            subtog.className = 'tgl-btn'
            console.log(subtog)
            field.appendChild(subtog)
        }
        if (type === custom) {
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
    par.querySelectorAll('.input-field').forEach((item) => {
        console.log(item)
        ar.push(item.value)
        let elKey = item.getAttribute("key")
        if ((item.type === "checkbox") && (item.checked === true)) {
            item.value = true
        } else if ((item.type === "checkbox") && (item.checked === false)) {
            item.value = false
        }
        vals[elKey] = item.value
    });
    let boiler
    boiler = `{
    "name": "${vals["name"]}",
    "authors": "${vals["authors"]}",
    "desc": "${vals["desc"]}",
    "login": ${vals["login"]},
    "recurs": ${vals["recurs"]},
    "entrypoint": "${vals["entrypoint"]}",
    "link": "${vals["link"]}",
    "link_label": "${vals["link_label"]}"`
    //TODO: authors, catch reset
    const customFields = document.querySelectorAll('#customFieldHolder');
    if (customFields.length === 0) {
        boiler = boiler + `\n}`
    } else {
            boiler = boiler + `,\n"namespace": "${vals["namespace"]}",`
            boiler = boiler + `
                "fields" : [\n`
        for ( let i = 0; i < customFields.length; ++ i) {
            if (i === 0){

            boiler = boiler + `{\n`
            } else {
                boiler = boiler + `\n{`
            }
            const innerFields = customFields[i].querySelectorAll('.input-field')
            let cb
            innerFields.forEach((item) =>{
                console.log(item)
                if ((item.value === "checkbox") || (item.value === "number") || (item.value === "range") || (item.value === "reset")) {
                    cb = 1
                }
                const key = item.getAttribute("key")
                const val = item.value
                if ((key === "values") || (key === "catch_reset")){
                    if (cb === 1) {
                        return
                    }
                    boiler = boiler + `"${key}": [\n`
                    const valArr = val.split(',')
                    let v
                    for (let j = 0 ; j<valArr.length; ++j) {
                        if (parseInt(valArr[j])) {
                            v = `${valArr[j]}`
                        } else {
                            v = `"${valArr[j]}"`
                        }
                        boiler = boiler + `${v}`
                        if (j === (valArr.length-1)) {
                            boiler = boiler + `\n],\n`
                        } else {
                            boiler = boiler + `,\n`
                        }
                    }
                } else if (parseInt(val)) {
                    boiler = boiler + `"${key}": ${val},\n`
                } else {
                    boiler = boiler + `"${key}": "${val}",\n`
                }
            });
                boiler = boiler.slice(0,-2)
                boiler = boiler + '\n}'
            if (i === (customFields.length-1)) {
                boiler = boiler + '\n]'
            } else {
                boiler = boiler + ','
            }
        }
        boiler = boiler + `\n}`
            console.log(boiler)
    }
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
    console.log(pre)
    const outputmsg = document.createElement('text')
    outputmsg.id = 'validation'
    try {
        JSON.parse(boiler)
    } catch (error) {
        outputmsg.style.color = "red"
        outputmsg.innerText = "JSON validation failed"
        gutter.appendChild(outputmsg)
        return false;
    }
        const raw = JSON.parse(boiler)
        const pretty = JSON.stringify(raw,null,4)
        pre.innerText = pretty
        outputmsg.style.color = "lightgreen"
        outputmsg.innerText = "JSON validation OK "
        gutter.appendChild(outputmsg)
    const copyButton = document.createElement('button')
    copyButton.id = 'copyButton'
    copyButton.innerText = 'COPY'
    gutter.appendChild(copyButton)
    copyButton.addEventListener('click', (e) =>{
//        const tocopy = e.target.previousElementSibling.previousElementSibling.innerText
        navigator.clipboard.writeText(pretty);
    });
    const oldHolder = document.querySelector('#HOLDER')
    if (oldHolder){
        oldHolder.remove();
    }
    const ex = document.querySelector('#box')
    //ex.innerText = "";
    const h = document.createElement('div')
    h.id = 'HOLDER'
    //ex.appendChild(h)
//        console.log(boiler)
        let pf
        for (let i = 0; i<ar.length; ++i) {
        pf = document.createElement('p')
        pf.innerText = ar[i]
        h.appendChild(pf)
    }
});
