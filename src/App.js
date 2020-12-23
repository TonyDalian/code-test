import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [male, setMale] = useState([]);
  const [female, setFemale] = useState([]);

  const url = 'http://5c92dbfae7b1a00014078e61.mockapi.io/owners';

  useEffect(() => {
    const petMale = [], petFemale = [];
  
    const fetchData = async () => {
      try {
          const results = await axios(
            url,
          );
          results.data.map((owner,i) => {
            if(owner.pets !== null){
              owner.pets.map((pet,i)=>{
                  if(pet.type === 'Cat'){
                    (owner.gender === "Male") ? petMale.push(pet.name) : petFemale.push(pet.name);
                  }
                  return i.id;
              });
            }
            return i.id;
          });
      } catch (error) {
        console.error('Error:', error) 
      }
      setMale(petMale.sort());
      setFemale(petFemale.sort());
    };

    fetchData();
  }, [url]);
  
  return (
    <div className="container">
          <h3 className='text-center margin-10'>
          A list of all the cats in alphabetical order under a heading of the gender of their owner.
          </h3>
          <div className="row">
              <div className="offset-md-2 col-md-8">
                  <div className="card margin-10">
                      <div className="card-header">Male</div>
                      <div className="card-body">
                          <ul className="list-group list-group-flush">
                          {male.map((male,i) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center" >
                                { male }
                            </li>
                          ))}
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="offset-md-2 col-md-8">
                  <div className="card margin-10">
                      <div className="card-header">Female</div>
                      <div className="card-body">
                          <ul className="list-group list-group-flush">
                          
                          {female.map((female,i ) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center" >
                                { female }
                          </li>
                          ))}
                          
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
