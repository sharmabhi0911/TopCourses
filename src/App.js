import React from "react";
import Navbar from "./Components/Navbar";
import Filter from "./Components/Filter";
import Cards from "./Components/Cards";
import Spinner from "./Components/Spinner";
import { apiUrl, filterData } from "./data";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [laoding, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData () {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const output = await response.json();

      setCourses(output.data);
    } 
    catch (error) {
      toast.error("Something Went Wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);  

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar />
      </div>

      <div>
        <div className="bg-bgDark2">
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory} />
        </div>

        <div className="w-11/12 max-w-[1200px] min-h-[50vh] 
        mx-auto flex flex-wrap justify-center items-center">
          {
            laoding ? (<Spinner/>) 
            : (<Cards 
                courses={courses} 
                category={category}/>) 
          }
        </div>
      </div>

    </div>
  );
};

export default App;
