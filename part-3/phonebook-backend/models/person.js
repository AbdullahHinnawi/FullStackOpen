const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

/*
On update operations, mongoose validators are off by default. In order to make validation works by default when an update happens, just before connecting to MongoDB you can set global setting only ones like the following
*/
mongoose.set('runValidators', true)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: (s) => {
        const digitCount = s.replace(/\D/g, '').length
        if (digitCount < 8) {
          return false
        }
        return true
      },
      message: (props) =>
        `The phone number ${props.value} must have at least 8 digits!`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
/* Apply the uniqueValidator plugin to personSchema. The unique validator will check for duplicate database entries and report them just like any other validation error
 */
personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)
