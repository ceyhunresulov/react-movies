import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";

export default class SearchBar extends Component {
  state = {
    searchMovi: "",
  };
  render() {
    return (
      <Form
        className="mt-4 w-75"
        onSubmit={(e) => {
          e.preventDefault();
          this.props.findMovi(this.state.searchMovi);
        }}
      >
        <FormGroup className="d-flex">
          <Input
            type="text"
            name="text"
            id="exampleText"
            placeholder="Search movies"
            onChange={this.props.getSearchValue}
          />
          <Link
            to="add"
            className="ms-5 text-decoration-none text-white bg-secondary px-2 fs-4 py-1 rounded"
          >
            add
          </Link>
        </FormGroup>
      </Form>
    );
  }
}
