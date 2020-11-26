import React, {useState} from "react";
import "../components/AddNewWebsite.css";

function AddNewWebsite() {

    const [isVisible, setIsVisible] = useState(false);
    const [createDocStatus, setcreateDocStatus] = useState('');

    const setTimer = (delay) =>
    {
        setTimeout(() => setIsVisible(false), delay);
    };

    const handleSubmit=(e)=>{
        let newURL = {
            url: e.target[0].value,
            Categories: e.target[1].value,
            Comment: e.target[2].value
        }

        console.log(JSON.stringify(newURL));

        fetch('http://localhost:9000/Websites/documents', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(newURL),
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(function(response) {
        if (response.status === 200)
            setcreateDocStatus('Document Created');
        else
            setcreateDocStatus('Document Creation failed');
        setIsVisible(true);
        setTimer(10000);
        return response.json();
      });
        e.preventDefault();
        e.target.reset();
      }

    return (
        <div className="addnewwebsite">
            {isVisible ? <p className="doccreated">{createDocStatus}</p> : ""}
            <form onSubmit={handleSubmit}>
                <div class="form-group row">
                <label for="inputURL" class="col-sm-2 col-form-label">URL</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputURL" name="url" placeholder="URL"></input>
                    </div>
                </div>
                <div class="form-group row">
                <label for="inputCategories" class="col-sm-2 col-form-label">Categories</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputCategories" name="Categories" placeholder="Categories"></input>
                </div>
                </div>
                <div class="form-group row">
                <label for="inputComment" class="col-sm-2 col-form-label">Comment</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputComment" name="Comment" placeholder="Comment"></input>
                </div>
                </div>
                <div class="form-group row">
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                </div>
            </form>
        </div>
    );
}

export default AddNewWebsite;