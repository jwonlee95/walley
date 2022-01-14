import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { ErrorText } from "components";
import { Container, TextField, Button } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import config from "config/config";
import UserContext from "../../contexts/user";
import { IExpense } from "interfaces";
import { ICategory } from "interfaces";

export const AddExpensePage: React.FC<RouteComponentProps<any>> = (props) => {
  const [_id, setId] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [expense, setExpense] = useState<IExpense>();
  const [types, setTypes] = useState<ICategory[]>([]);
  const [name, setName] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [spent, setSpent] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user } = useContext(UserContext).userState;

  useEffect(() => {
    getTypes();
  }, []);

  const getTypes = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${config.server.url}/users/${user._id}`,
      });

      if (response.status === (200 || 304)) {
        console.log("user is ", user);
        let types = response.data.user.expenseTypes as ICategory[];
        setTypes(types);
        console.log("types are ", types);
        setName(response.data.user.expenseTypes.name);
        setBudget(response.data.user.expenseTypes.budget);
      } else {
        setError(`Unable to retrieve types ${_id}`);
      }
    } catch (error) {
      setError(`Unable to retrieve types ${_id}`);
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
      const responseS = await axios({
        method: "PATCH",
        url: `${config.server.url}/api/types/updateSpent/${user._id}`,
        data: {
          category,
          amount,
        },
      });
      if (response.status === 201) {
        setSpent(response.data.amount);
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

  const addSpent = async () => {
    try {
      const response = await axios({
        method: "PATCH",
        url: `${config.server.url}/api/types/updateSpent/${user._id}`,
        data: {
          name,
          spent,
        },
      });
      if (response.status === 201) {
        setSpent(response.data.spent);
      } else {
        setError("Unable to set spent");
      }
    } catch (error) {
      setError("Unable to set spent");
    }
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newCategory: string
  ) => {
    setCategory(newCategory);
  };

  return (
    <Container>
      <Container>
        <ErrorText error={error} />
        <div>
          <Link to="/excategory">Add Category</Link>
          <ToggleButtonGroup
            value={category}
            id="category"
            exclusive
            onChange={handleChange}
          >
            {types.map((expenseTypes) => {
              return (
                <ToggleButton value={expenseTypes.name}>
                  {expenseTypes.name}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
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
