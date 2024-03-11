
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";





export default function Home() {

      const [tvShows, setTvShows] = useState();
      const [search, setSearch] = useState("");

      function searchTvShows(e) {
        e.preventDefault();
        setSearch(e.target.value);
        const searchTvShows = tvShows.filter((tvShow) => {
        return tvShow.name.toLowerCase().includes(search.toLowerCase());
        });
        if (search.length > 1) {
            setTvShows(searchTvShows);
        } else {
            fetshTvShows();
        }
      }

      async function fetshTvShows() {
        const { data } = await axios.get("https://api.tvmaze.com/shows");
        setTvShows(data.slice(0, 54));
    }

    function truncate(name) {
        return name.length >15 ? name.slice(0, 15) + "..." : name;
    }
    
    useEffect(()=>{
        fetshTvShows();
      },[])


  return (
    <>
      {tvShows === null ? (
        <div className="vh-100 d-flex justify-content-center align-items-center ">
          <i className="fa-solid fa-spinner fa-spin fa-7x"></i>
        </div>
      ) : (
        <div className="container mt-5">
          <div className="row ">
            <div>
              <input
                onInput={searchTvShows}
                type="text"
                className="form-control"
                placeholder="search here"
              />
            </div>
            {tvShows?.map((tvShows) => (
              <div
                key={tvShows.id}
                className="col-lg-2 col-md-4 col-sm-6 col-10 m-auto mt-3 p-2 rounded-3 "
              >
                <Link 
                to={`/details/Details/${tvShows.id}`}
                className="text-decoration-none text-light">

                  <div className="text-center">
                    <img
                      src={tvShows.image?.medium}
                      alt={tvShows.name}
                      className=""
                    />
                    <h5 className="Montserrat mt-1">
                      {truncate(tvShows.name)}
                    </h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
