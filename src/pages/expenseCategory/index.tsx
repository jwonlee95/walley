import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { ErrorText } from "components";
import { Container, TextField, Button } from "@mui/material";
import config from "config/config";
import { UserContext } from "contexts";
import { useDispatch, useSelector } from "react-redux";
import { ICategory } from "interfaces";
import { GetCategory, CreateCategoryData } from "common/action";
import { reducerState } from "common/store";

export const ExpenseCategoryPage: React.FC<RouteComponentProps<any>> = (
  props
) => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state: reducerState) => state.user);
  const [_id, setId] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [category, setCategory] = useState<ICategory[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user } = useContext(UserContext).userState;

  const createCategory = () => {
    if (name === "" || budget === "") {
      setError("Please fill out all fields.");
      setSuccess("");
      return null;
    }

    setError("");
    setSuccess("");
    setSaving(true);

    const data = {
      icon,
      color,
      name,
      budget,
    };
    dispatch(CreateCategoryData(user._id, data));
  };

  return (
    <Container>
      <Container>
        <ErrorText error={error} />
        <div>
          <TextField
            label="Icon"
            type="text"
            name="icon"
            value={icon}
            id="name"
            placeholder="Enter a icon"
            disabled={saving}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setIcon(event.target.value);
            }}
          ></TextField>
          <TextField
            label="Color"
            type="text"
            name="color"
            value={color}
            id="color"
            placeholder="Enter a color"
            disabled={saving}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setColor(event.target.value);
            }}
          ></TextField>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={name}
            id="name"
            placeholder="Enter a name"
            disabled={saving}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
          ></TextField>
          <TextField
            label="budget"
            type="text"
            name="budget"
            value={budget}
            id="budget"
            placeholder="budget"
            disabled={saving}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setBudget(event.target.value);
            }}
          ></TextField>
          <div>
            <Button
              onClick={() => {
                createCategory();
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