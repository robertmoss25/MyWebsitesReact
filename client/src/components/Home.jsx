import React, { Component , useState, useEffect} from "react";
import { Button } from 'react-bootstrap';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import history from './../history';
import "../components/home.css";

let results = [];
let categories = [];

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue]=useState();
  const [url, setURL] = useState("http://localhost:9000/Websites");
  
  let currentPos = 0;
  let totalSize = 0;
  let itemsPerPage = 0;
  let previous = true;
  let range = 0;
  let link2 = true;
  let link3 = true;
  let calcValue = 0;
  let endPos = 0;
  let nextHidden = false;
  let currentPage = 1;
  let totalPages = 10;

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

          if (items.results !== undefined)
          {
              console.log("Normal" + isLoaded);
              results = (Object.entries(items.results.returnValue).map(([key, value]) => 
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

              currentPos = items.results.currentPos;
              totalSize = items.results.totalSize;
              itemsPerPage = items.results.itemsPerPage;
              previous = currentPos <= 0;
              range = (totalSize / itemsPerPage);
              link2 = totalSize < itemsPerPage+1;
              link3 = totalSize < (itemsPerPage*2)+1;
              calcValue = Number(currentPos) + Number(itemsPerPage);
              endPos = Math.min(totalSize, calcValue);
              nextHidden = items.results.nextHidden;
              currentPage = items.results.value;
              totalPages = items.results.totalPages;
              console.log("First")
              console.log("currentPos " + currentPos + " totalSize " + totalSize);
              console.log("itemsPerPage " + itemsPerPage + " previous " + previous);
              console.log("range " + range + " link2 " + link2);
              console.log("link3 " + link3 + " endPos " + endPos);
              console.log("nextHidden " + nextHidden);
          }
          if (items.returnValue !== undefined)
          {
              console.log("Paging" + isLoaded);
              results = Object.entries(items.returnValue).map(([key, value]) => 
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
              });
              currentPos = items.currentPos;
              totalSize = items.totalSize;
              itemsPerPage = items.itemsPerPage;
              previous = currentPos <= 0;
              range = (totalSize / itemsPerPage);
              link2 = totalSize < itemsPerPage+1;
              link3 = totalSize < (itemsPerPage*2)+1;
              calcValue = Number(currentPos) + Number(itemsPerPage);
              endPos = Math.min(totalSize, calcValue);
              nextHidden = items.nextHidden;
              currentPage = items.value;
              totalPages = items.totalPages;
              console.log("Second")
              console.log("currentPos " + currentPos + " totalSize " + totalSize);
              console.log("itemsPerPage " + itemsPerPage + " previous " + previous);
              console.log("range " + range + " link2 " + link2);
              console.log("link3 " + link3 + " endPos " + endPos);
              console.log("nextHidden " + nextHidden);
          }

          let beginlink = <li className="page-item"><a class="page-link" href="#" onClick={() => setURL("http://localhost:9000/Websites/paging?command=begin&value=1")} id = "begin">&#8678;</a></li>
          let previouslink = <li className="page-item"><a class="page-link" href="#" onClick={() => setURL("http://localhost:9000/Websites/paging?command=previous&value=-1")}>Previous</a></li>;
          if (previous)
              previouslink = '';
          let linklink1 = <li className="page-item"><a class="page-link" href="#" onClick={() => setURL("http://localhost:9000/Websites/paging?command=link&value=1")}>1</a></li>;
          let linklink2 = <li className="page-item"><a class="page-link" href="#" onClick={() => setURL("http://localhost:9000/Websites/paging?command=link&value=2")}>2</a></li>;
          let linklink3 = <li className="page-item"><a class="page-link" href="#" onClick={() => setURL("http://localhost:9000/Websites/paging?command=link&value=3")}>3</a></li>;
          let nextlink = <li className="page-item"><a class="page-link" href="#" onClick={() => setURL("http://localhost:9000/Websites/paging?command=next&value=" + Math.random() * 6)}>Next</a></li>;
          if (nextHidden)
              nextlink = '';
          let endlink = <li className="page-item"><a class="page-link" href="#" onClick={() => setURL("http://localhost:9000/Websites/paging?command=end&value=1")}>&#8680;</a></li>;

      return (
          <div className="mybody">
              <section id="websites">
                      <div className="containerfluid">
                          <table className="table table-hover table-success">
                              <thead className="thead-dark">
                              <tr>
                                  <th scope="col">URL</th>
                                  <th scope="col">Category</th>
                                  <th scope="col">Comment</th>
                              </tr>
                              </thead>
                              <tbody id="header">
                              {results}
                              </tbody>
                          </table>
                          <div>
                              <table className="table">
                              <tr>
                              <th class="pageinfo" id="currentPageDetails">{ "Page " + Math.floor(currentPage) + " of " + totalPages }</th>
                                  <th>
                                  <nav aria-label="Page navigation example">
                                      <ul className="pagination justify-content-end">
                                      {beginlink}
                                      {previouslink}
                                      {linklink1}
                                      {linklink2}
                                      {linklink3}
                                      {nextlink}
                                      {endlink}
                                      </ul>
                                  </nav>
                                  </th>
                              </tr>
                              </table>
                          </div>
                      </div>
              </section>
          </div>
      );
    }
  }
export default Home;