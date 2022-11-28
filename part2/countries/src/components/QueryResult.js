import Country from './Country'

const QueryResult = ({selectedCountries, setSelectedCountries}) => {
  if (selectedCountries.length > 10) {
    return <Message text="Too many matches. Specify another filter"/>;
  } else if (selectedCountries.length > 1) {
    return <List countries={selectedCountries} setSelectedCountries={setSelectedCountries}/>;
  } else if (selectedCountries.length === 1) {
    return <Country details={selectedCountries[0]}/>;
  }
}

const List = ({countries, setSelectedCountries}) => (<ul>
  {countries.map(country => <li
    key={country.cca2}
    onClick={() => setSelectedCountries([country])}
  > {country.name.common} </li>)}
</ul>);

const Message = ({text}) => (<p>{text}</p>);

export default QueryResult;
