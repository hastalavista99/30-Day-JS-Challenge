const object1 = {
    name: "jack",
    age: 25,
    home: "London"
}

function extractMultiplePropertiesFromObject(obj, prop) {
    prop.forEach(element => {
        console.log(obj[element])
    });

}

function extractSinglePropertyFromObject(obj, prop) {
    const property = obj[prop]

    console.log(property)
}

extractMultiplePropertiesFromObject(object1, ['name', 'age'])
extractSinglePropertyFromObject(object1, 'name')
