import React, { Component , useState, useEffect} from "react";
import { Button } from 'react-bootstrap';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import history from './../history';
import "../components/home.css";

let results2 = [];
let categories = [];

function Search() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue]=useState('Select Item');
  const [url, setURL] = useState("http://localhost:9000/Websites");

  const handleSelect=(e)=>{
      console.log(e);
      setValue(e);
      setURL("http://localhost:9000/Websites/category?key=" + e);
    }

  

  useEffect(() => {
      //setIsLoaded(false);
      console.log("url " + url);
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {  
            console.log("Loaded");
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [url])

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
          console.log("Here " + isLoaded);
          if (items.categoryArray !== undefined)
          {
              console.log("Here.. " + isLoaded);
              categories = Object.entries(items.categoryArray).map(([key, value]) => 
              {
                  return <Dropdown.Item eventKey={value}>{value}</Dropdown.Item>
              });
          }
          
          if (items.array !== undefined) {
              console.log("array" + JSON.stringify(items.array));
              results2 = (Object.entries(items.array).map(([key, value]) => 
              {
                  return (<tr>
                      <th scope="row">
                          <a href={value.url} target="_blank">{value.url}</a>
                      </th>
                      <td>
                          {value.Category}
                      </td>
                      <td>
                          {value.Comment}
                      </td>
                  </tr>)
              }));
          }

      return (
          <div className="mybody">
              <section id="website-search">
                  <div className="containerfluid2">
                  <DropdownButton alignRight title={value} id="dropdown-menu-align-right" onSelect={handleSelect}>
                  {categories}
                  </DropdownButton>
                      <table className="table table-hover table-success">
                          <thead className="thead-dark">
                          <tr>
                              <th scope="col">URL</th>
                              <th scope="col">Category</th>
                              <th scope="col">Comment</th>
                          </tr>
                          </thead>
                          <tbody id="header2">
                          {results2}
                          </tbody>
                      </table>
                  </div>
              </section>
          </div>
      );
    }
  }
export default Search;