import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { ErrorText } from "components";
import { Container, TextField, Button } from "@mui/material";
import config from "config/config";
import UserContext from "../../contexts/user";
import { ICategory } from "interfaces";

export const AddCategoryPage: React.FC<RouteComponentProps<any>> = (props) => {
  const [_id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [spent, setSpent] = useState<string>("");
  const [category, setCategory] = useState<ICategory>();
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user } = useContext(UserContext).userState;

  useEffect(() => {
    let categoryID = props.match.params.categoryID;

    if (categoryID) {
      setId(categoryID);
      getCategory(categoryID);
    } else {
      setLoading(false);
    }

    // eslint-disable-next-line
  }, []);

  const getCategory = async (id: string) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${config.server.url}/api/types/read/${id}`,
      });

      if (response.status === (200 || 304)) {
        setName(response.data.category.name);
        setBudget(response.data.category.budget);
      } else {
        setError(`Unable to retrieve types ${_id}`);
      }
    } catch (error) {
      setError(`Unable to retrieve types ${_id}`);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async () => {
    if (name === "" || budget === "") {
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
        url: `${config.server.url}/api/types/updateTypes/${user._id}`,
        data: {
          name,
          budget,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      });
      if (response.status === 201) {
        setCategory(response.data.category);
        setSuccess("Succesfully posted to user");
      } else {
        setError("Unable to save data to user");
      }
    } catch (error) {
      setError(`Unable to save category.`);
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
