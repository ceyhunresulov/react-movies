import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Row } from "reactstrap";
import serialize from "form-serialize";
import { Link } from "react-router-dom";

export default class AppMovie extends Component {
  handleFormSubmit = async (e) => {
    e.preventDefault();
    const newMovie = serialize(e.target, { hash: true });
    await this.props.addMovie(newMovie);
    this.setState({ name: "", rating: "", url: "", overview: "" });
    e.target.children[1].children[0].value = "";
    e.target.children[1].children[1].value = "";
    e.target.children[2].children[0].value = "";
    e.target.children[3].children[0].value = "";
  };
  render() {
    return (
      <Row className="justify-content-center m-0 mt-5">
        <Form
          className="w-50 bg-secondary p-4"
          onSubmit={this.handleFormSubmit}
        >
          <h1 className="text-center mb-5">Add Movie</h1>
          <FormGroup className="d-flex mb-5">
            <Input type="text" name="name" id="name" placeholder="Movie Name" />
            <Input
              type="text"
              name="rating"
              id="rating"
              placeholder="Rating"
              className="ms-5 w-25"
            />
          </FormGroup>
          <FormGroup className="mb-5">
            <Input
              type="text"
              name="imageURL"
              id="url"
              placeholder="Image Url"
            />
          </FormGroup>
          <FormGroup className="mb-5">
            <Input
              type="textarea"
              name="overview"
              id="overview"
              placeholder="Overview"
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
