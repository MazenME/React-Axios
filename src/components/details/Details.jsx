import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState();
  const [seasons, setSeasons] = useState();
  const [cast, setCast] = useState();
  const [btn, setBtn] = useState(false);
  const [btn2, setBtn2] = useState(false);

  function handlebutton() {
    setBtn(!btn);
  }
  function handlebutton2() {
    setBtn2(!btn2);
  }

  useEffect(() => {
    async function fetshTvShowDetails() {
      const { data } = await axios.get(`https://api.tvmaze.com/shows/${id}`);
      setTvShow(data);
    }
    async function fetshTvShowSeasons() {
      const { data } = await axios.get(
        `https://api.tvmaze.com/shows/${id}/seasons`
      );
      setSeasons(data);
    }
    async function fetshTvShowCast() {
      const { data } = await axios.get(
        `https://api.tvmaze.com/shows/${id}/cast`
      );
      setCast(data);
    }
    fetshTvShowDetails();
    fetshTvShowSeasons();
    fetshTvShowCast();
  }, [id]);

  return (
    <>
      {tvShow === null ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fa-7x"></i>
        </div>
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-4 col-md-5 col-10 mx-auto ">
              <img
                src={tvShow?.image?.original}
                alt={tvShow?.name}
                className="img-fluid"
              />
            </div>
            <div className="col-lg-8 col-md-7  Montserrat center">
              <h1 className="text-info">{tvShow?.name}</h1>
              <p dangerouslySetInnerHTML={{ __html: tvShow?.summary }}>
              </p>
              <p>
                Rating:{" "}
                <span className="text-info"> {tvShow?.rating?.average}</span>
              </p>
              <p>
                Language: <span className="text-info">{tvShow?.language}</span>
              </p>
              <p>
                Genres:{" "}
                <span className="text-info">{tvShow?.genres?.join(", ")}</span>
              </p>
              <p>
                Country:{" "}
                <span className="text-info">
                  {tvShow?.network?.country?.name}
                </span>
              </p>

              <div>
                <button onClick={handlebutton} className="btn btn-info mx-2">
                  seasones
                </button>
                <button onClick={handlebutton2} className="btn btn-info">
                  cast members
                </button>
              </div>

              {btn && (
                <div className="d-flex justify-content-start align-items-center flex-wrap p-2 my-2 rounded-3">
                  {seasons?.map((season) => (
                    <div key={season.id} className="me-2 marginnnn ">
                      <Link className="text-decoration-none">
                        <img
                          src={season.image?.medium}
                          alt={season.name}
                          className="img-fluid"
                        />
                        <h5 className="Montserrat mt-1">{season.name}</h5>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              {btn2 && (
                <div className="d-flex justify-content-start align-items-center flex-wrap p-2 my-2 rounded-3">
                  {cast?.map((cast) => (
                    <div key={cast.person.id} className="me-2 marginnnn ">
                      <img
                        src={cast.person.image?.medium}
                        alt={cast.person.name}
                        className="img-fluid"
                      />
                      <h5 className="Montserrat mt-1">{cast.person.name}</h5>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
