import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

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

    if (persons.some(person => person.name === name)) {
      alert(`${name} is already added to the phonebook`);
      return false;
    } else {
      const contact = {name: name, number: number};
      setPersons(persons => [contact, ...persons]);
      return true;
    }
  }

  return (<div>
    <h1>Phonebook</h1>
    <Filter filter={filter} setFilter={setFilter}/>

    <h2>Add new contact</h2>
    <NewContactForm addContact={addContact}/>

    <h2>Numbers</h2>
    <Numbers persons={filteredPersons}/>
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

const Numbers = ({persons}) => (
  <ul>
    {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
  </ul>
)

export default App;