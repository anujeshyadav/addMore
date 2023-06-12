import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Row, Col, Button, InputGroup, InputGroupText } from "reactstrap";
import { GiCancel } from "react-icons/gi";
import { AiOutlinePlusCircle } from "react-icons/ai";

// css
import "./App.css";

function App() {
  // useState
  const [inputList, setInputList] = useState([
    { itemName: "", Quantity: "", Rate: "", Amount: "" },
  ]);
  const [Amount, setAmount] = useState(0);
  const [GST, setGst] = useState(6);

  const options = [
    { value: "Item A", label: "Item A", name: "itemName" },
    { value: "Item B", label: "Item B", name: "itemName" },
    { value: "Item C", label: "Item C", name: "itemName" },
    { value: "Item D", label: "Item D", name: "itemName" },
    { value: "Item E", label: "Item E", name: "itemName" },
    { value: "Item F", label: "Item F", name: "itemName" },
  ];
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  // handle input change
  const handleInputChange = (e, index) => {
    console.log(e);
    const { name, value } = e;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);

    let amt = 0;
    if (list.length > 0) {
      const x = list.map((value) => {
        list[index]["Amount"] = value.Quantity * value.Rate;
        return value.Quantity * value.Rate;
      });

      amt = x.reduce((a, b) => a + b);
    }
    setAmount(amt);
  };
  console.log("inputlist", inputList);
  console.log("Total Amount", Amount);

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { itemName: "", Quantity: "", Rate: "", Amount: "" },
    ]);
  };

  return (
    <>
      <div className="container">
        <div className="MainDiv">
          <Row className="row-cols-lg-auto g-3 align-items-center">
            <Col className="back" lg="4" md="4" sm="2">
              Item
            </Col>
            <Col className="back" lg="2" md="2" sm="2">
              Quantity
            </Col>
            <Col className="back" lg="2" md="2" sm="2">
              Rate
            </Col>
            <Col className="back" lg="4" md="4" sm="2">
              Amount
            </Col>
          </Row>
        </div>
      </div>
      <div className="container">
        {inputList.map((x, i) => {
          return (
            <>
              <div className="bodymain ">
                <Row className="row-cols-lg-auto g-1 align-items-center">
                  <Col lg="4" md="4" sm="6">
                    <Select
                      name="itemName"
                      onChange={(e) => handleInputChange(e, i)}
                      options={options}
                    />
                  </Col>
                  <Col lg="2" md="2" sm="2">
                    <input
                      onKeyDown={blockInvalidChar}
                      type="number"
                      min="0"
                      className="form-control my-1"
                      name="Quantity"
                      placeholder="Quantity"
                      value={x.Quantity}
                      onChange={(e) => handleInputChange(e.target, i)}
                    />
                  </Col>
                  <Col lg="2" md="2" sm="2">
                    <InputGroup className="my-1">
                      <InputGroupText>
                        <span>&#8377;</span>
                      </InputGroupText>
                      <input
                        min="0"
                        onKeyDown={blockInvalidChar}
                        type="number"
                        className="form-control "
                        name="Rate"
                        placeholder="Rate"
                        value={x.Rate}
                        onChange={(e) => handleInputChange(e.target, i)}
                      />
                    </InputGroup>
                  </Col>
                  <Col lg="3" md="3" sm="2">
                    <InputGroup className="my-1">
                      <InputGroupText>
                        <span>&#8377;</span>
                      </InputGroupText>
                      <input
                        // disabled
                        className="form-control "
                        name="Amount"
                        placeholder={x.Quantity * x.Rate}
                        value={x.Quantity * x.Rate}
                        onSelectCapture={(e) => handleInputChange(e.target, i)}
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    {inputList.length !== 1 && (
                      <GiCancel
                        color="red"
                        size={25}
                        className="mx-2"
                        onClick={() => handleRemoveClick(i)}
                      />
                    )}
                  </Col>
                </Row>
              </div>
              <div className="box">
                <div className="">
                  {inputList.length - 1 === i && (
                    <div className="buttonmain container d-flex justify-content-end">
                      <Button
                        className="buttonAddmore"
                        onClick={handleAddClick}
                      >
                        {" "}
                        <AiOutlinePlusCircle size={25} />
                        <span className="mx-2"> Add New Line</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <hr />
            </>
          );
        })}
        <div className="container mt-3">
          <Row>
            <Col lg="4">
              <label className="my-1">Select GST Class( %)</label>
              <select
                defaultValue={6}
                onChange={(e) => {
                  setGst(e.target.value);
                }}
                className="form-control"
              >
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="18">18</option>
                <option value="28">28</option>
              </select>
            </Col>
            <Col lg="8">
              <Row className="mt-3">
                <Col>
                  <div className="d-flex justify-content-end">
                    <h3>INR-</h3>
                  </div>
                </Col>
                <Col>
                  <h3>
                    {" "}
                    <span>&#8377;</span> {Amount && Amount}
                  </h3>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <div className="d-flex justify-content-end">
                    <h3>GST-</h3>
                  </div>
                </Col>
                <Col>
                  <h3>
                    {" "}
                    <span>&#8377;</span> {Amount && (Amount * GST) / 100}
                  </h3>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <div className="d-flex justify-content-end">
                    <h3>TOTAL AMOUNT-</h3>
                  </div>
                </Col>
                <Col>
                  <h4>
                    {" "}
                    <span>&#8377;</span>{" "}
                    {Amount && (Amount * GST) / 100 + Amount}
                  </h4>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default App;
