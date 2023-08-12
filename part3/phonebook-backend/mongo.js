const mongoose = require('mongoose')


const url = `mongodb://127.0.0.1:27017/phonebookApp`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length<4){
    Person.find({}).then(persons=>{
        console.log(persons)
        mongoose.connection.close()
    })
    return
}

const person = new Person({
    name: process.argv[2],
    number: process.argv[3],
})

person.save().then(result => {
    console.log(result)
    mongoose.connection.close()
})

