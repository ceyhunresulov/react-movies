import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Row } from "reactstrap";
import serialize from "form-serialize";
import { Link } from "react-router-dom";
import axios from "axios";

export default class EditMovie extends Component {
  state = {
    name: "",
    rating: "",
    imageURL: "",
    overview: "",
  };
  async componentDidMount() {
    const baseUrl = `http://localhost:3001/movies/${this.props.editId}`;
    await axios.get(baseUrl).then((res) => {
      console.log(res.data);
      this.setState({
        name: res.data.name,
        rating: res.data.rating,
        imageURL: res.data.imageURL,
        overview: res.data.overview,
      });
      console.log(this.state.imageURL);
      console.log(this.state.rating);
    });
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = `http://localhost:3001/movies/${this.props.editId}`;
    const newMovie = serialize(e.target, { hash: true });
    await this.props.editMovie(baseUrl, newMovie);
    e.target.children[1].children[0].value = "";
    e.target.children[1].children[1].value = "";
    e.target.children[2].children[0].value = "";
    e.target.children[3].children[0].value = "";
  };

  editMovie = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Row className="justify-content-center m-0 mt-5">
        <Form
          className="w-50 bg-secondary p-4"
          onSubmit={this.handleFormSubmit}
        >
          <h1 className="text-center mb-5">Edit Movie</h1>
          <FormGroup className="d-flex mb-5">
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Movie Name"
              onChange={this.editMovie}
              value={this.state.name}
            />
            <Input
              type="text"
              name="rating"
              id="rating"
              placeholder="Rating"
              className="ms-5 w-25"
              onChange={this.editMovie}
              value={this.state.rating}
            />
          </FormGroup>
          <FormGroup className="mb-5">
            <Input
              type="text"
              name="imageURL"
              id="url"
              placeholder="Image Url"
              onChange={this.editMovie}
              value={this.state.imageURL}
            />
          </FormGroup>
          <FormGroup className="mb-5">
            <Input
              type="textarea"
              name="overview"
              id="overview"
              placeholder="Overview"
              onChange={this.editMovie}
              value={this.state.overview}
            />
          </FormGroup>
          <Button className="border d-block mx-auto">Submit</Button>
          <Link
            className="text-decoration-none fs-5 p-1 text-white bg-dark rounded"
            to="/"
          >
            movies
          </Link>
        </Form>
      </Row>
    );
  }
}
