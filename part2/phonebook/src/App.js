import { useState, useEffect } from 'react'
import personsService from './services/persons'

const Input = ({label, value, onChange}) => {
  return(
    <div>
      {label} <input value={value} onChange={onChange}/>
    </div>
  )
}

const Button = ({label, type, onClick}) => {
  return(
    <>
      <button type={type} onClick={onClick}>{label}</button>
    </>
  )
}
const Filter = ({label, value, onChange}) => {
  return(
    <form>
      <Input label={label} value={value} onChange={onChange}/>
    </form>
  )
}
const PersonFormInputs = ({inputsMetaData}) => {
  return(
    inputsMetaData.map(({label, value, onChange, id}) => 
      <Input key={id} label={label} value={value} onChange={onChange}/>
    )
  )
}

const PersonForm = ({inputsMetaData, buttonMetaData}) => {
  return(
    <form>
      <PersonFormInputs inputsMetaData={inputsMetaData}/>
      <Button 
        label={buttonMetaData.label} 
        type={buttonMetaData.type} 
        onClick={buttonMetaData.onClick}
      />
    </form>
  )
}

const Persons = ({displayedPersons, deletePerson}) => {
  return(
    <div>
      {displayedPersons.map(person => {
          return (
            <p key={person.id}>
              {person.name} {person.number} <></>
              <Button 
                label={'delete'} 
                type={'button'} 
                onClick={() => deletePerson(person.id)}
              />
            </p>
          )
        }
      )}
    </div>
  )
}

const Notification = ({ message, notificationColor}) => {

  const notificationStyle = {
    color: notificationColor,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margiBottom: 10,
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [displayedPersons, setDisplayedPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('red')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
        setDisplayedPersons(initialPersons)
      })
  }, [])

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }
  const handleQueryInput = (event) => {
    let queryFormValue = event.target.value;
    setQuery(queryFormValue)
    changeDisplayedPersons(queryFormValue, persons);
  }
  //
  const changeDisplayedPersons = (queryFormValue, persons) => {
    let queriedPersons =  [...persons];
    if(queryFormValue.trim() !== ''){
      queriedPersons = persons.filter(person => {
        return(
          (person.name.toLowerCase()).includes(queryFormValue.trim().toLowerCase())
        )
      })
    }
    setDisplayedPersons(queriedPersons)
  }
  const addPerson = (event) => {
    event.preventDefault()
    let names = persons.map(person => {
      //last_id = person.id
      return(
        person.name.toLowerCase()
      )
    })
    if(names.includes(newName.toLowerCase())){
      let toReplaceNumber = window.confirm(`${newName} is already in phonebook, replace old number with new one?`)
      if(!toReplaceNumber) return
      const updatedPerson = {
        name: newName, 
        number: newNumber
      }
      let personId = (persons.find((person) => person.name === newName)).id
      personsService
        .update(personId, 
          updatedPerson
        )
        .then((returnedPerson) => {
          let updatedPersons = persons.map((person => person.name !== returnedPerson.name? person:returnedPerson))
          setPersons(updatedPersons)
          setDisplayedPersons(updatedPersons)
        })
    }else{
      const newPerson = {
        name: newName, 
        number: newNumber
      }
      personsService
        .create(newPerson)
        .then((returnedPerson) => {
          let newPersons = persons.concat(returnedPerson)
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
          changeDisplayedPersons(query, newPersons)
          setNotificationColor('green')
          setErrorMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

      /*let newPersons = [...persons].concat(
        {name: newName, number: newNumber, id: last_id+1}
      )*/
    }
  }

  const deletePerson = (id) => {

    let r = 
    window
      .confirm(`delete ${
        (persons.find(
          (person) => person.id === id)
        )
        .name} ?`);
    if (r !== true) {
      return;
    }

    personsService
      .remove(id)
      .then((n) => {
        let newPersons = persons.filter((person) => person.id !== id)
        setPersons(newPersons)
        changeDisplayedPersons(query, newPersons);
      })
      .catch((error)=> {
        const deletedPerson = persons.find((person) => person.id === id)
        setErrorMessage(
          `Information of ${deletedPerson.name} was already removed from the application`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  const inputsMetaData=
    [
      {
        label: 'name:', 
        value:newName, 
        onChange:handleNameInput, 
        id:1
      },
      {
        label: 'number:', 
        value:newNumber, 
        onChange:handleNumberInput, 
        id:2
      },
    ]
  const submitButtonMetaData= 
    {
      label: 'add', 
      type:'submit', 
      onClick:addPerson
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} notificationColor={notificationColor} />
      <Filter 
        label={'filter shown with:'} 
        value={query} 
        onChange={handleQueryInput}
      />
      <h3>add new</h3>
      <PersonForm 
        inputsMetaData={inputsMetaData}
        buttonMetaData={submitButtonMetaData}
      />
      <h3>Numbers</h3>
      <Persons displayedPersons={displayedPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App