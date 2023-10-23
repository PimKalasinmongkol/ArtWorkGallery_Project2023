const context = require.context('./img/upload',false ,/\.(jpg|jpeg|png)$/)

const imageImport = {}

context.keys().forEach(key => {
    imageImport[key.replace('./','')] = context(key)
})

export default imageImport