const object1 = {
    name: "jack",
    age: 25,
    home: "London"
}

const object2 = {
    school: "East",
    hobby: "JavaScript",
    isMarried: "no"
}

function mergeObjects(obj1, obj2) {

    obj1.other = obj2

    console.log(obj1)
}


mergeObjects(object1, object2)
