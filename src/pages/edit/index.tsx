import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { ErrorText } from "components";
import { FormControl, Container, TextField, Button } from "@mui/material";
import config from "config/config";
import logging from "config/logging";
import UserContext from "../../contexts/user";
import { IExpense } from "interfaces";

export const EditPage: React.FunctionComponent<RouteComponentProps<any>> = (
  props
) => {
  const [_id, setId] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [expense, setExpense] = useState<IExpense>();

  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user } = useContext(UserContext).userState;

  console.log("user is ", user);

  useEffect(() => {
    let expenseID = props.match.params.expenseID;
    if (expenseID) {
      setId(expenseID);
      getExpense(expenseID);
    } else {
      setLoading(false);
    }
  }, []);

  const getExpense = async (id: string) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${config.server.url}/expense/read/${id}`,
      });

      if (response.status === (200 || 304)) {
        setCategory(response.data.expense.category);
        setDescription(response.data.expense.description);
        setAmount(response.data.expense.amount);
        setBalance(response.data.expense.balance);
      } else {
        setError(`Unable to retrieve expense ${_id}`);
      }
    } catch (error) {
      setError(`Unable to retrieve expense ${_id}`);
    } finally {
      setLoading(false);
    }
  };

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
        method: "POST",
        url: `${config.server.url}/api/expense/create`,
        data: {
          category,
          description,
          amount,
          balance,
        },
      });
      console.log("response.data.expense._id: is ", response.data.expense);
      const responseU = await axios({
        method: "PATCH",
        url: `${config.server.url}/users/update/${user._id}`,
        data: {
          expense: response.data.expense,
        },
      });

      if (response.status === 201) {
        setId(response.data.expense._id);
        setSuccess("Blog posted.  You can continue to edit on this page.");
      } else {
        setError(`Unable to save expense.`);
      }
      if (responseU.status === 201) {
        setExpense(responseU.data.expense);
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

  const editExpense = async () => {
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
        url: `${config.server.url}/api/expense/update/${_id}`,
        data: {
          category,
          description,
          amount,
          balance,
          user: user._id,
        },
      });

      if (response.status === 201) {
        setSuccess("expense updated.");
      } else {
        setError(`Unable to save expense.`);
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
          <TextField
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
          ></TextField>

          <div>
            <Button
              onClick={() => {
                if (_id !== "") {
                  editExpense();
                } else {
                  createExpense();
                }
              }}
              disabled={saving}
            >
              <i className="fas fa-save mr-1"></i>
              {_id !== "" ? "Update" : "Post"}
            </Button>
            {_id !== "" && (
              <Link to="/home">
                <Button>Go to home</Button>
              </Link>
            )}
          </div>
        </div>
        <ErrorText error={error} />
      </Container>
    </Container>
  );
};
