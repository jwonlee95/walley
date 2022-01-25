import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { ErrorText } from "components";
import { Container, TextField, Button } from "@mui/material";
import UserContext from "../../contexts/user";
import { useDispatch } from "react-redux";
import { CreateIncomeData } from "common/action";

export const AddIncomePage: React.FC<RouteComponentProps<any>> = (props) => {
  const dispatch = useDispatch();
  const [_id, setId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user } = useContext(UserContext).userState;

  const createIncome = () => {
    if (description === "" || amount === "") {
      setError("Please fill out all fields.");
      setSuccess("");
      return null;
    }

    setError("");
    setSuccess("");
    setSaving(true);

    const data = {
      description,
      amount,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    dispatch(CreateIncomeData(user._id, data));
  };

  return (
    <Container>
      <Container>
        <ErrorText error={error} />
        <div>
          <TextField
            label="description"
            type="text"
            name="description"
            value={description}
            id="description"
            placeholder="description"
            disabled={saving}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
                createIncome();
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
