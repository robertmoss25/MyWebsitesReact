import React, { useState, useEffect} from "react";
import "../components/home.css";

let results = [];

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [url, setURL] = useState("http://localhost:9000/Websites");
  
  let currentPos = 0;
  let previous = true;
  let nextHidden = false;
  let currentPage = 1;
  let totalPages = 10;

  useEffect(() => {
      //setIsLoaded(false);
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {  
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
              previous = currentPos <= 0;
              nextHidden = items.results.nextHidden;
              currentPage = items.results.value;
              totalPages = items.results.totalPages;
          }
          if (items.returnValue !== undefined)
          {
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
              previous = currentPos <= 0;
              nextHidden = items.nextHidden;
              currentPage = items.value;
              totalPages = items.totalPages;
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