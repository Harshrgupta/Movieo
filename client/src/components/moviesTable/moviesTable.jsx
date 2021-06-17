import React, { Component } from "react";
import TableHeader from "../common/tableHeader/tableHeader";
import TableBody from "../common/tableBody/tableBody";
import Like from "../common/like/like";
import "./../../App.css";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  render() {
    const { movies, onLike, onDelete, onSort, sortColumn ,user} = this.props;
    const columns = [
      { name: "Title", path: "title" ,content : movie=><Link to ={`/movies/${movie._id}`}>{movie.title}</Link> },
      { name: "Genres", path: "genre.name" },
      { name: "Stocks", path: "numberInStock" },
      { name: "Rate", path: "dailyRentalRate" },
      {
        name: "",
        key: "like",
        content: (movie) => (
          <Like liked={movie.liked} onClick={() => onLike(movie)} />
        ),
      },
      {
        name: "",
        key: "delete",
        content: (movie) => (
          <button
            onClick={() => onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        ),
      }
    ];
    return (
      <table className="table">
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody data={movies} columns={columns} user={user}/>
      </table>
    );
  }
}

export default MoviesTable;
