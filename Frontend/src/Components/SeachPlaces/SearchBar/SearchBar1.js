import React, { useState} from "react";


const SearchBar1 = ({ name, placeholder, data, setValue }) => {
  const seen = new Set();
  const [input, setInput] = useState("");
  const [filterData, setFilterData] = useState([]);
 

  const handleFilter = (event) => {
    setInput(event.target.value);
    const searchWord = event.target.value;


    const arr = data.filter((elem) => {
      return elem.city.toLowerCase().includes(searchWord.toLowerCase());
    });
    const newFilter = arr.filter(el => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });
    console.log(newFilter);
    if (searchWord === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };

  const deleteItem = () => {
    setInput("");
    setValue("");
    setFilterData([]);
  };
  const handleInput = (value) => {
    setInput(value);
    setValue(value);
    setFilterData([]);
   
  };
  return (
    <>
      <div style={{position:"relative"}}>
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          value={input}
          onChange={handleFilter}
        />
        {input !== "" && (
          <i
            className="fas fa-times"
            onClick={deleteItem}
            style={{
              position: "absolute",
              right: "3%",
              top: "30%",
            }}
          ></i>
        )}
      </div>
      {input !== "" && filterData.length > 0 && (
        <div className="dataresult">
          {filterData.map((elem) => {
            return (
              <div
                className="dataItem"
                onClick={() => {
                  handleInput(elem.city);
                }}
              >
                <p>{elem.city}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SearchBar1;
