import axios from "axios";
import { Component } from "react";
import { Row } from "reactstrap";
import AppMovie from "./AddMovie";
import MoviList from "./MoviList";
import SearchBar from "./SearchBar";
import EditMovie from "./EditMovie";
import { Routes, Route, BrowserRouter } from "react-router-dom";

class App extends Component {
  state = {
    movies: [],
    searchValue: "",
    editId: null,
  };

  // DID MOUNT
  componentDidMount() {
    this.getMovies();
  }

  // REMOVE
  removeCard = async (id) => {
    const baseUrl = `http://localhost:3001/movies/${id}`;
    await axios.delete(baseUrl);
    let newState = this.state.movies.filter((c) => c.id !== id);
    this.setState({ movies: newState });
  };

  // SEACRH
  getSearchValue = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  // ADD MOVIE

  addMovie = async (newMovie) => {
    const baseUrl = "http://localhost:3001/movies";
    await axios.post(baseUrl, newMovie);
    this.setState((state) => ({
      movies: state.movies.concat([newMovie]),
    }));
    this.getMovies();
  };

  // edit movie

  editMovie = async (baseUrl, newMovie) => {
    await axios.put(baseUrl, newMovie);
    this.getMovies();
  };

  // get movie

  getMovies = () => {
    const baseUrl = "http://localhost:3001/movies";
    axios
      .get(baseUrl)
      .then((res) => {
        this.setState({ movies: res.data });
      })
      .catch((err) => err);
  };

  // get id
  getId = (id) => {
    this.setState({ editId: id });
  };

  render() {
    let filteredMovi = this.state.movies
      .filter((m) => {
        return (
          m.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !==
          -1
        );
      })
      .sort((a, b) => {
        return b.id - a.id;
      });
    return (
      <BrowserRouter className="container-fluit bg-dark">
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <Row className="d-flex justify-content-center m-0">
                  <SearchBar getSearchValue={this.getSearchValue}></SearchBar>
                </Row>
                <MoviList
                  getId={this.getId}
                  removeCard={this.removeCard}
                  moviList={filteredMovi}
                ></MoviList>
              </>
            }
          ></Route>
          <Route
            path="/add"
            exact
            element={<AppMovie addMovie={this.addMovie}></AppMovie>}
          ></Route>
          <Route
            path="/edit/:id"
            exact
            element={
              <EditMovie
                editMovie={this.editMovie}
                editId={this.state.editId}
                addMovie={this.addMovie}
              ></EditMovie>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
