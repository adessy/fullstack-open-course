import {createRoot} from 'react-dom/client';
import App from './App'
import axios from "axios";

axios
  .get("https://restcountries.com/v3.1/all")
  .then(response => {
    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(<App countries={response.data}/>);
  })