import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { ErrorText } from "components";
import { Container, TextField, Button } from "@mui/material";
import config from "config/config";
import UserContext from "../../contexts/user";
import { ISubscription } from "interfaces";

export const AddSubscriptionPage: React.FC<RouteComponentProps<any>> = (
  props
) => {
  const [_id, setId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [subscription, setSubscription] = useState<ISubscription>();
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user } = useContext(UserContext).userState;

  const createSubscription = async () => {
    if (amount === "") {
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
        url: `${config.server.url}/api/subscription/updateSubscription/${user._id}`,
        data: {
          description,
          amount,
          recurDate: Date.now(),
        },
      });
      if (response.status === 201) {
        setSubscription(response.data.subscription);
        setSuccess("Succesfully posted to user");
      } else {
        setError("Unable to save data to user");
      }
    } catch (error) {
      setError(`Unable to save subscription.`);
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
                createSubscription();
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
