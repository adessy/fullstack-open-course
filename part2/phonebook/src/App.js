import {useEffect, useState} from 'react';

import contactService from "./services/contact";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({message: null, isError: false});

  useEffect(() => {
    contactService.getAll().then(contacts => setPersons(contacts))
  }, [])


  const filteredPersons = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  const addContact = (name, number) => {
    // remove trailing spaces
    name = name.trim();
    number = number.trim();

    if (!name) {
      alert(`You must specify a name.`);
      return false;
    }

    if (!number) {
      alert(`You must specify a phone number.`);
      return false;
    }

    const contact = contactByName(name);
    if (contact) {
      if (window.confirm(`${name} is already added to phonebook, replace the old number with this one?`)) {
        contactService
          .update(contact.id, {number})
          .then(contact => {
            setPersons(persons.map(person => person.id === contact.id ? contact : person))
            createNotification(`Updated ${contact.name}`)
          })
        return true;
      } else {
        return false;
      }
    } else {
      contactService
        .create(name, number)
        .then(contact => {
          setPersons(persons.concat(contact));
          createNotification(`Added ${contact.name}`)
        })
      return true;
    }
  }

  const contactByName = (name) => persons.find(person => person.name === name);

  const deleteContact = (id) => {
    const name = persons.find(person => person.id === id).name;

    contactService
      .delete(id)
      .then(_ => {
        setPersons(persons.filter(person => person.id !== id))
        createNotification(`Deleted ${name}`)
      })
      .catch(_ => createNotification(`Information of ${name} has already been deleted.`, true))
  }

  const createNotification = (message, isError = false) => {
    setMessage({message: message, isError: isError});
    setTimeout(() => {
      setMessage({message: null, isError: false})
    }, 3000)
  }

  return (<div>
    <h1>Phonebook</h1>
    <Message {...message} />
    <Filter filter={filter} setFilter={setFilter}/>

    <h2>Add new contact</h2>
    <NewContactForm addContact={addContact}/>

    <h2>Numbers</h2>
    <Numbers persons={filteredPersons} deleteContact={deleteContact}/>
  </div>);
}

const Filter = ({filter, setFilter}) => {
  const handleFilterChange = event => setFilter(event.target.value);

  return <div>
    Search: <input type="text" value={filter} onChange={handleFilterChange}/>
  </div>;
}

const NewContactForm = ({addContact}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);

  const addNewContact = event => {
    event.preventDefault();
    if (addContact(newName, newNumber)) resetForm();
  }

  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  }

  return (<form onSubmit={addNewContact}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
      <br/>
      number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

const Numbers = ({persons, deleteContact}) => (
  <ul>
    {persons.map(person => <ContactItem
      key={person.id}
      contact={person}
      deleteContact={() => deleteContact(person.id)}
    />)}
  </ul>
)

const ContactItem = ({contact, deleteContact}) => {
  const delete_ = () => {
    if (window.confirm(`Delete ${contact.name}?`)) deleteContact();
  }

  return <li>
    {contact.name} {contact.number}
    <button key={`delete-button-${contact.id}`} onClick={delete_}>delete</button>
  </li>;
}

const Message = ({message, isError = false}) => {
  if (message === null) return null;

  return <div className={isError ? 'error' : 'message'}> {message} </div>
}

export default App;