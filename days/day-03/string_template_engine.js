// Exercise: Create a string template engine that replaces {{variables}} with values eg. variables


function replaceVariable(variable) {
    let text = `Hello {{variables}}`
    let newText = text.replace('{{variables}}', `${variable}`)

    return newText
}

let myName = "Jack"
console.log(replaceVariable(myName))