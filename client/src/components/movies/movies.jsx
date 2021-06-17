import React, { Component } from "react";
import Pagination from "../common/pagination/pagination";
import { toast } from "react-toastify";
import { getMovies, deleteMovies } from "../../services/movieService";
import { paginate } from "../util/paginate";
import ListGroup from "../common/listGroup/listGroup";
import { getGenres } from "../../services/genreService";
import MoviesTable from "../moviesTable/moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  handleDelete = async (movie) => {
    const originalMovie = this.state.movies;
    const movies = originalMovie.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovies(movie._id);
    } catch (ex) {
      if (ex.response.status === 404) toast.error("Already Deleted");
      this.setState({ movies: originalMovie });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    const currentPage = 1;
    this.setState({ currentGenre: genre, currentPage });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {user} = this.props;
    const { length: count } = this.state.movies;
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      currentGenre,
      sortColumn,
    } = this.state;

    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter((m) => m.genre._id === currentGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2 m-2">
            <Link to="/movies/new" className="btn btn-primary m-2">
              Add Movie
            </Link>
            <ListGroup
              currentGenre={currentGenre}
              onGenreChange={this.handleGenreChange}
              items={this.state.genres}
            />
          </div>
          <div className="col">
            <p>Showing {filtered.length} movies in the database.</p>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
              user={user}
            />
            <Pagination
              total={filtered.length}
              currentPage={this.state.currentPage}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
