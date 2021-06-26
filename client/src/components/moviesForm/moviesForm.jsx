import React from "react";
import Joi from "joi-browser";
import Form from "../common/form/form";
import { getMovie, saveMovie } from "../../services/movieService";
import { getGenres } from "../../services/genreService";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(2).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required().min(0).max(100),
    dailyRentalRate: Joi.number().required().min(0).max(10),
  };

  async populateGenre() {
    const response = await getGenres();
    const genres = response.data;
    this.setState({ genres });
  }
  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
     
      if (movieId==="new") return;
      const { data: movie } = await getMovie(movieId);
      const data = this.mapToViewModel(movie);
      this.setState({ data });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenre();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async() => {
   try{ await saveMovie(this.state.data);
    this.props.history.push("/movies");}
    catch(ex)
    {
      if(ex.response)
      toast.error("Unauthorized User");
    }

  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Movie Form</h1>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
