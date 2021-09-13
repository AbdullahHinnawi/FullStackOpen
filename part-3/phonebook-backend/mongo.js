const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@notescluster.6avck.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  })
  person.save().then((result) => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}

if (!name && !number) {
  Person.find({}).then((people) => {
    console.log('phonebook:')
    people.map((p) => console.log(`${p.name} ${p.number}`))
    mongoose.connection.close()
  })
}
