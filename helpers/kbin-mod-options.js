/*
    Name:           kbin-mod-options
    Version:        0.2.3
    Description:    Attempt at standardizing mod options.
    Author:         0rito
    License:        MIT
*/
const kmoStyles = `
    .switch {
        position: relative;
        //display: inline-block;
        display: block;
        width: 36px;
        height: 24px;
    }

    .switch input {
        display: none;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--kbin-bg);
        --webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: '';
        height: 12px;
        width: 12px;
        left: 2px;
        top: 2px;
        background-color: var(--kbin-meta-text-color);
        --webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: var(--kbin-success-color);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px var(--kbin-success-color);
    }

    input:checked + .slider:before {
        --webkit-transform: translateX(20px);
        --ms-transform: translateX(20px);
        transform: translateX(20px);
    }

    .kmo-settings-row.expanded {
        display: block !important;
    }

    .kmo-settings-header {
        border-bottom: var(--kbin-sidebar-header-border);
        color: var(--kbin-sidebar-header-text-color);
        margin-bottom: 0.5em;
    }

    .kmo-settings-row {
        display: none;
        animation: showKmoSettingsRow .25s ease-in-out;
    }

    @keyframes showKmoSettingsRow {
        0% {
            opacity: 0;
            transform: translateY(-1.5em);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
const styleSheet = document.createElement('style');
styleSheet.innerText = kmoStyles;
document.head.appendChild(styleSheet);

const ourSection = document.createElement('div');
ourSection.className = 'kmo-settings-list';
document.querySelector('#settings.section').appendChild(ourSection);
const settingsList = ourSection;

function kmoAddHeader (title, info = {}) {
    if (typeof title === 'undefined') {
        throw new Error('kmoAddHeader - title is undefined')
    }
    const headerDiv = document.createElement('div');
    headerDiv.className = 'kmo-settings-header';
    const headerText = document.createElement('strong');
    headerText.textContent = title;
    if (Object.keys(info).length > 0) {
        const infoIcon = document.createElement('i');
        infoIcon.className = 'fa-solid fa-circle-info';
        infoIconStyle = 'margin-left: 10px; '
        if (typeof info.color !== 'undefined') {
            infoIconStyle += "color: " + info.color + "; ";
        } else {
            infoIconStyle += "color var(--kbin-meta-text-color); ";
        }
        infoIcon.style = infoIconStyle;
        let infoIconTextContent = '';
        if (typeof info.author !== 'undefined') {
            infoIconTextContent += "Author: " + info.author + "\n";
        }
        if (typeof info.version !== 'undefined') {
            infoIconTextContent += "Version: " + info.version + "\n";
        }
        if (typeof info.license !== 'undefined') {
            infoIconTextContent += "License: " + info.license + "\n";
        }
        if (typeof info.url !== 'undefined') {
            infoIconTextContent += "Website: " + info.url;
        }
        infoIcon.title = infoIconTextContent;
        headerText.appendChild(infoIcon);
    }
    const show_icon = document.createElement('i');
    show_icon.className = 'fa-solid fa-chevron-down';
    show_icon.setAttribute('aria-hidden', 'true');
    show_icon.style = 'float:right; text-align: center; margin-top: 0.2rem; margin-right: 10px; cursor: pointer; color: var(--kbin-meta-text-color);';
    headerText.appendChild(show_icon);
    const childDiv = document.createElement('div');
    childDiv.className = 'kmo-settings-row';
    headerDiv.appendChild(headerText);
    settingsList.appendChild(headerDiv);
    settingsList.appendChild(childDiv);
    show_icon.addEventListener("click", () => {
        kmoToggleSettings(show_icon, childDiv);
    });
    return childDiv;
}

function kmoToggleSettings (toggle, settingDiv) {
    if (typeof toggle === 'undefined') {
        throw new Error('kmoToggleSettings - toggle is undefined');
    }
    if (typeof settingDiv === 'undefined') {
        throw new Error('kmoToggleSettings - settingDiv is undefined');
    }
    toggle.classList.toggle('fa-chevron-up');
    toggle.classList.toggle('fa-chevron-down');
    settingDiv.classList.toggle('expanded');
}

function kmo_createSettingRow (title = '') {
    const settingDiv = document.createElement('div');
    settingDiv.className = 'row';
    settingDiv.style = 'align-items: center;';
    if (title.length > 0) {
        settingDiv.title = title;
    }
    return settingDiv;
}

function kmo_createSettingName (name) {
    const settingSpan = document.createElement('span');
    settingSpan.style = 'margin-left: 10px;';
    settingSpan.textContent = name;
    return settingSpan;
}

function kmo_createDropDownOption (name, value, selected = false) {
    const option = document.createElement('option');
    option.innerHTML = name;
    option.label = name;
    option.value = value;
    if (selected === true) {
        option.selected = true;
    }
    return option;
}

function kmoAddToggle (settingDiv, settingName, currentValue, description = '') {
    if (typeof settingDiv === 'undefined') {
        throw new Error('kmoAddToggle - settingDiv is undefined');
    }
    if (typeof settingName === 'undefined') {
        throw new Error('kmoAddToggle - settingName is undefined');
    }
    if (typeof currentValue === 'undefined') {
        throw new Error('kmoAddToggle - currentValue is undefined');
    }
    const thisSettingDiv = kmo_createSettingRow(description);
    const settingNameSpan = kmo_createSettingName(settingName);
    thisSettingDiv.appendChild(settingNameSpan);
    const toggleDiv = document.createElement('div');
    toggleDiv.style = 'height: 10px;';
    const toggleLabel = document.createElement('label');
    toggleLabel.className = 'switch';
    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    if (currentValue === true) {
        toggleInput.checked = true;
    }
    const sliderDiv = document.createElement('div');
    sliderDiv.className = 'slider';
    toggleLabel.appendChild(toggleInput);
    toggleLabel.appendChild(sliderDiv);
    toggleDiv.appendChild(toggleLabel);
    thisSettingDiv.appendChild(toggleDiv);
    settingDiv.appendChild(thisSettingDiv);
    settingsList.appendChild(settingDiv);
    return toggleInput;
}

function kmoGetToggle (toggle) {
    return toggle.checked;
}

function kmoAddDropDown (settingDiv, settingName, options, currentValue, description = '') {
    if (typeof settingDiv === 'undefined') {
        throw new Error('kmoAddDropDown - settingDiv is undefined');
    }
    if (typeof settingName === 'undefined') {
        throw new Error('kmoAddDropDown - settingName is undefined');
    }
    if (typeof options === 'undefined') {
        throw new Error('kmoAddDropDown - options are undefined');
    }
    if (typeof currentValue === 'undefined') {
        throw new Error('kmoAddDropDown - currentValue is undefined');
    }
    if (typeof options !== 'object') {
        throw new Error('kmoAddDropDown - options are not an object');
    }
    const thisSettingDiv = kmo_createSettingRow(description);
    const settingSpan = kmo_createSettingName(settingName);
    const dropDown = document.createElement('select');
    const fixName = settingName.replace(' ', '-');
    dropDown.name = fixName;
    dropDown.className = fixName + '-selector';
    dropDown.style = 'border: none; padding: 0px 10px; border-radius: 5px;';
    options.forEach(option => {
        const optionEntry = kmo_createDropDownOption(option.name, option.value, ((currentValue === option.value) ? true : false));
        dropDown.appendChild(optionEntry);
    });
    thisSettingDiv.appendChild(settingSpan);
    thisSettingDiv.appendChild(dropDown);
    settingDiv.appendChild(thisSettingDiv);
    settingsList.appendChild(settingDiv);
    return dropDown;
}

function kmoGetDropDown (dropDown) {
    return dropDown.value;
}

function kmoAddButton (settingDiv, settingName, buttonLabel, description = '') {
    if (typeof settingDiv === 'undefined') {
        throw new Error('kmoAddButton - settingDiv is undefined');
    }
    if (typeof settingName === 'undefined') {
        throw new Error('kmoAddButton - settingName is undefined');
    }
    if (typeof buttonLabel === 'undefined') {
        throw new Error('kmoAddButton - buttonLabel is undefined');
    }
    const thisSettingDiv = kmo_createSettingRow(description);
    const settingSpan = kmo_createSettingName(settingName);
    const button = document.createElement('button');
    button.innerHTML = buttonLabel;
    thisSettingDiv.appendChild(settingSpan);
    thisSettingDiv.appendChild(button);
    settingDiv.appendChild(thisSettingDiv);
    settingsList.appendChild(settingDiv);
    return button;
}

function kmoAddColorDropper (settingDiv, settingName, currentColor, description = '') {
    if (typeof settingDiv === 'undefined') {
        throw new Error('kmoAddColorDropper - settingDiv is undefined');
    }
    if (typeof settingName === 'undefined') {
        throw new Error('kmoAddColorDropper - settingName is undefined');
    }
    if (typeof currentColor === 'undefined') {
        throw new Error('kmoAddColorDropper - currentColor is undefined');
    }
    const thisSettingDiv = kmo_createSettingRow(description);
    const settingSpan = kmo_createSettingName(settingName);
    const colorDropper = document.createElement('input');
    colorDropper.type = 'color';
    if (currentColor.length === 4) {
        let fixedCurrentColor = '';
        const charArray = [...currentColor];
        charArray.forEach(char => {
            if (char === '#') {
                fixedCurrentColor += '#';
            } else {
                fixedCurrentColor += char + char;
            }
        });
        currentColor = fixedCurrentColor;
    }
    colorDropper.value = currentColor;
    thisSettingDiv.appendChild(settingSpan);
    thisSettingDiv.appendChild(colorDropper);
    settingDiv.appendChild(thisSettingDiv);
    settingsList.appendChild(settingDiv);
    return colorDropper;
}
