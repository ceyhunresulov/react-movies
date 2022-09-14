import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  CardBody,
  CardTitle,
  CardSubtitle,
  Card,
  CardText,
  Button,
  CardImg,
} from "reactstrap";

export default class Movies extends Component {
  state = {
    sizeAuth: true,
  };
  catString = () => {
    return (this.props.movi.overview.length > 100) & this.state.sizeAuth
      ? this.props.movi.overview.substring(0, 100) + "..."
      : this.props.movi.overview;
  };
  extendString = () => {
    this.setState({ sizeAuth: !this.state.sizeAuth });
  };
  render() {
    return (
      <Card className="card m-2 p-0">
        <CardImg
          alt="Card image cap"
          src={this.props.movi.imageURL}
          top
          width="100%"
        />
        <CardBody className="d-flex flex-column justify-content-evenly">
          <CardTitle tag="h5">{this.props.movi.name}</CardTitle>
          <CardText
            className={this.state.sizeAuth ? "card-text" : "card-lg"}
            onClick={this.extendString}
          >
            {this.catString()}
          </CardText>
          <div className="d-flex justify-content-between w-100%">
            <Button
              className="bg-danger"
              onClick={() => this.props.removeCard(this.props.movi.id)}
            >
              Delete
            </Button>
            <Link
              type="button"
              to={`edit/${this.props.movi.id}`}
              className="bg-primary text-decoration-none text-white rounded px-3 d-flex align-items-center"
              onClick={() => this.props.getId(this.props.movi.id)}
            >
              Edit
            </Link>
            <CardSubtitle className="p-2 my-auto bg-dark text-white" tag="h6">
              {this.props.movi.rating}
            </CardSubtitle>
          </div>
        </CardBody>
      </Card>
    );
  }
}
