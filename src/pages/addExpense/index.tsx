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
import { useDispatch, useSelector } from "react-redux";
import { GetTypes, CreateExpenseData } from "common/action";
import { reducerState } from "common/store";

export const AddExpensePage: React.FC<RouteComponentProps<any>> = (props) => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state: reducerState) => state.user);
  const expenseSelector = useSelector((state: reducerState) => state.expense);
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
    dispatch(GetTypes(user._id));
  }, []);

  useEffect(() => {
    if (userSelector.userTypes) {
      console.log(userSelector.userTypes);
      let _types = userSelector.userTypes.expenseTypes as ICategory[];
      setTypes(_types);
      console.log("types are ", _types);
      setName(userSelector.userTypes.expenseTypes.name);
      setBudget(userSelector.userTypes.expenseTypes.budget);
      setLoading(false);
    }
  }, [userSelector.userTypes]);

  useEffect(() => {
    if (expenseSelector.createExpenseData) {
      setSpent(expenseSelector.createExpenseData.amount);
      setExpense(expenseSelector.createExpenseData.expense);
      setSuccess("Succesfully posted to user");
      setSaving(false);
    }
  });

  const createExpense = () => {
    if (category === "" || description === "" || amount === "") {
      setError("Please fill out all fields.");
      setSuccess("");
      return null;
    }

    setError("");
    setSuccess("");
    setSaving(true);

    const data = {
      category,
      description,
      amount,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    dispatch(CreateExpenseData(user._id, data));

    // try {
    //   const response = await axios({
    //     method: "POST",
    //     url: `${config.server.url}/api/expense/updateExpense/${user._id}`,
    //     data: {
    //       category,
    //       description,
    //       amount,
    //       createdAt: Date.now(),
    //       updatedAt: Date.now(),
    //     },
    //   });

    //   if (response.status === 201) {
    //     setSpent(response.data.amount);
    //     setExpense(response.data.expense);
    //     setSuccess("Succesfully posted to user");
    //   } else {
    //     setError("Unable to save data to user");
    //   }
    // } catch (error) {
    //   setError(`Unable to save expense.`);
    // } finally {
    //   setSaving(false);
    // }
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
