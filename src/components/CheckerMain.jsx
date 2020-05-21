import React, { Component } from "react";
import { Form, Button } from "reactstrap";
import { Formik } from "formik";
import * as checkerService from "../services/checkerBoardService";
import validationSchema from "./validationSchema";
import p5 from "p5";

class CheckBoard extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();

    this.state = {
      newNumber: "",
      submittedNumber: null,
    };
  }

  checkerBoardMapper = () => {
    let boardSetUp = new p5(this.Board, this.myRef.current);
    let element = Element(boardSetUp);
    this.setState(() => {
      return {
        mappedCheckerBoard: element,
      };
    });
  };

  Board = (p) => {
    const loopNumber = this.state.newNumber;
    p.setup = () => {
      p.background(200);
      p.createCanvas(1000, 500);
    };
    let result = (p.draw = () => {
      let firstBox = "black";
      let secondBox = "white";
      let rows = 0;
      while (rows < loopNumber) {
        if (rows % 2 === 0) {
          firstBox = "white";
          secondBox = "black";
        } else {
          firstBox = "black";
          secondBox = "white";
        }
        let columns = 0;
        while (columns < loopNumber) {
          if (columns % 2 === 0) {
            p.fill(firstBox);
          } else {
            p.fill(secondBox);
          }
          p.rect(columns * 50, rows * 50, 50, 50);
          columns = columns + 1;
        }
        rows = rows + 1;
      }
    });

    return result;
  };
  handleSubmit = (inputValues, { resetForm }) => {
    const input = inputValues.input;
    const id = this.state.inputId;
    const data = {
      input,
    };

    checkerService
      .updateNumber(id, data)
      .then(this.onSubmitSuccess(input))
      .catch(this.onUpdateError);
    resetForm({ newNumber: null });
  };

  clearCanvas = () => {
    window.location.reload();
  };
  onSubmitSuccess = (input) => {
    console.log("success", input);
    this.setState(() => {
      return {
        newNumber: input,
      };
    });
    this.checkerBoardMapper();
  };

  onUpdateError = (error) => {
    console.log("error", error);
  };

  render() {
    return (
      <>
        <div
          style={{
            marginLeft: "5%",
            marginTop: "3%",
            marginBottom: "3%",
          }}
        >
          <Formik
            enableReinitialize={true}
            initialValues={this.state}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}
          >
            {(props) => {
              const { values, errors, handleSubmit, handleChange } = props;
              return (
                <Form onSubmit={handleSubmit}>
                  <div
                    className="input-group"
                    style={{
                      marginLeft: "5%",
                      marginTop: "3%",
                      marginBottom: "3%",
                    }}
                  >
                    <input
                      type="number"
                      name="input"
                      className={
                        errors.newNumber
                          ? "form-control input-txt-bx"
                          : "form-control input-txt-bx"
                      }
                      value={values.submittedNumber}
                      onChange={handleChange}
                      id="input"
                      placeholder="Type Board Size"
                    />
                    {errors.newNumber && (
                      <div className="text-danger">{errors.newNumber}</div>
                    )}
                  </div>
                  <div
                    className="btn-group"
                    role="group"
                    style={{
                      marginLeft: "5%",
                      marginTop: "3%",
                      marginBottom: "3%",
                    }}
                  >
                    <Button type="submit">Submit</Button>
                    <Button onClick={this.clearCanvas} type="submit">
                      Clear
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <div>{this.state.mappedCheckerBoard}</div>
        </div>
      </>
    );
  }
}

export default CheckBoard;
