const fs = require("fs");
const structurePath = "./Json/db.json"
const input = "ใส่ อะไรสักอย่าง เพื่อ Generate JSON! เช่น a1.b1.c1"

const db = JSON.parse(fs.readFileSync(structurePath))
const _path = "db."+input
let split = _path.split(`.`)
let fixinputErr = ""
let saveArr = _path.split(`.`)

let check = true
split.forEach(e=>{
    if(!isNaN(e)) check = false
})

if(check){
    try {
        eval(_path)
    } catch (_nothing) {
        for (let i = 0; i < split.length; i++) {
            if (i < 1) fixinputErr += split[i]
            else fixinputErr += `.` + split[i]
            saveArr.shift()
            if (!eval(fixinputErr)) {
                for (let x = 0; x < saveArr.length; x++) {
                    eval(fixinputErr + "= {}")
                    fixinputErr = fixinputErr + "." + saveArr[x]
                    eval(fixinputErr + "= {}")
                }
                return save(db)
            }
        }
    }
    
    if(eval(_path) === undefined) eval(_path + "= {}")
    return save(db)    
}else return console.log("[Err] Do not use type number!")

function save(something) {
    fs.writeFileSync(structurePath, JSON.stringify(something))
    console.log("[LOG] DB has been save!")
}
