import React, { Fragment, useContext, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { ErrorText } from "components";
import { Container, TextField, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import UserContext from "../../contexts/user";
import { ISubscription } from "interfaces";
import { useDispatch } from "react-redux";
import { CreateSubscriptionData } from "common/action";

export const AddSubscriptionPage: React.FC<RouteComponentProps<any>> = (
  props
) => {
  const dispatch = useDispatch();
  const [_id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [recurDate, setRecurDate] = React.useState<Date | null>(new Date());
  const [subscription, setSubscription] = useState<ISubscription>();
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user } = useContext(UserContext).userState;

  const createSubscription = () => {
    if (name === "" || amount === "") {
      setError("Please fill out all fields.");
      setSuccess("");
      return null;
    }

    setError("");
    setSuccess("");
    setSaving(true);

    const data = {
      name,
      amount,
      recurDate,
    };
    dispatch(CreateSubscriptionData(user._id, data));
  };

  // const createSubscription = async () => {
  //   if (amount === "") {
  //     setError("Please fill out all fields.");
  //     setSuccess("");
  //     return null;
  //   }

  //   setError("");
  //   setSuccess("");
  //   setSaving(true);

  //   try {
  //     const response = await axios({
  //       method: "POST",
  //       url: `${config.server.url}/api/subscription/updateSubscription/${user._id}`,
  //       data: {
  //         description,
  //         amount,
  //         recurDate,
  //       },
  //     });
  //     if (response.status === 201) {
  //       console.log(response.data.subscription);
  //       setSubscription(response.data.subscription);
  //       setSuccess("Succesfully posted to user");
  //     } else {
  //       setError("Unable to save data to user");
  //     }
  //   } catch (error) {
  //     setError(`Unable to save subscription.`);
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const handleChange = (newValue: Date | null) => {
    setRecurDate(newValue);
  };

  return (
    <Container>
      <Container>
        <ErrorText error={error} />
        <div>
          <TextField
            label="name"
            type="text"
            name="name"
            value={name}
            id="name"
            placeholder="name"
            disabled={saving}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
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
          {
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Recur Date"
                value={recurDate}
                onChange={handleChange}
                inputFormat="MM/dd/yyyy"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          }

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
