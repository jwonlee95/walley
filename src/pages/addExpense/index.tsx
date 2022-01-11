import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { ErrorText } from "components";
import { Container, TextField, Button } from "@mui/material";
import config from "config/config";
import UserContext from "../../contexts/user";
import { IExpense } from "interfaces";

export const AddExpensePage: React.FC<RouteComponentProps<any>> = (props) => {
  const [_id, setId] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [expense, setExpense] = useState<IExpense>();
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user } = useContext(UserContext).userState;

  const createExpense = async () => {
    if (category === "" || description === "" || amount === "") {
      setError("Please fill out all fields.");
      setSuccess("");
      return null;
    }

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const response = await axios({
        method: "PATCH",
        url: `${config.server.url}/api/expense/updateExpense/${user._id}`,
        data: {
          category,
          description,
          amount,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      });
      if (response.status === 201) {
        setExpense(response.data.expense);
        setSuccess("Succesfully posted to user");
      } else {
        setError("Unable to save data to user");
      }
    } catch (error) {
      setError(`Unable to save expense.`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container>
      <Container>
        <ErrorText error={error} />
        <div>
          <TextField
            label="Category"
            type="text"
            name="category"
            value={category}
            id="category"
            placeholder="Enter a category"
            disabled={saving}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          ></TextField>
          <TextField
            label="description"
            type="text"
            name="description"
            value={description}
            id="description"
            placeholder="description"
            disabled={saving}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></TextField>
          <TextField
            label="amount"
            type="text"
            name="amount"
            value={amount}
            id="amount"
            placeholder="Enter a amount"
            disabled={saving}
            onChange={(event) => {
              setAmount(event.target.value);
            }}
          ></TextField>
          {/* <TextField
            label="balance"
            type="text"
            name="balance"
            value={balance}
            id="balance"
            placeholder="Enter a balance"
            disabled={saving}
            onChange={(event) => {
              setBalance(event.target.value);
            }}
          ></TextField> */}

          <div>
            <Button
              onClick={() => {
                createExpense();
              }}
              disabled={saving}
            >
              Update
            </Button>
            <Link to="/home">
              <Button>Home</Button>
            </Link>
          </div>
        </div>
        <ErrorText error={error} />
      </Container>
    </Container>
  );
};
