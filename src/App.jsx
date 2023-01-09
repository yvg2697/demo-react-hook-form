import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Button, Form } from "react-bootstrap";
import "./styles.css";

const departments = [
  { value: "Computer-Science", label: "Computer Science" },
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Mathematics", label: "Mathematics" },
];

export default function App() {
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register, // assign it to each input field so that the react-hook-form can track the changes
    handleSubmit,
    formState: { errors }, // nested property in the formState object which will contain the validation errors
    reset,
    control, // from the useForm Hook that came from the React Hook form library
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setSuccessMsg("User registration is successful.");
    reset();
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          {successMsg && <p className="success-msg">{successMsg}</p>}

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                validate: {
                  checkLength: (value) => value.length >= 6,
                  matchPattern: (value) =>
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                      value
                    ),
                },
              })}
            />
            {errors.password?.type === "required" && (
              <p className="errorMsg">Password is required.</p>
            )}
            {errors.password?.type === "checkLength" && (
              <p className="errorMsg">
                Password should be at-least 6 characters.
              </p>
            )}
            {errors.password?.type === "matchPattern" && (
              <p className="errorMsg">
                Password should contain at least one uppercase letter, lowercase
                letter, digit, and special symbol.
              </p>
            )}
          </Form.Group>

          <div>
            <label>Select your Interest</label>
            <Controller
              name="department"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select className="mt-2" {...field} isMulti options={departments} />
              )}
            />
            {errors.department && (
              <p className="errorMsg">This is a required field.</p>
            )}
          </div>

          <Form.Group className="mb-3 mt-3" controlId="gender">
            <Form.Label>Select Gender</Form.Label>
            <Form.Check
              type="radio"
              label="Male"
              value="male"
              {...register("gender", {
                required: "Please select your gender",
              })}
            />
            <Form.Check
              type="radio"
              label="Female"
              value="female"
              {...register("gender")}
            />
            {errors.gender && (
              <p className="errorMsg">{errors.gender.message}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="skills">
            <Form.Label>Select Your Skills</Form.Label>
            <Form.Check
              type="checkbox"
              label="JavaScript"
              value="JavaScript"
              {...register("skills", {
                required: "Please select at-least one skill",
              })}
            />
            <Form.Check
              type="checkbox"
              label="React"
              value="react"
              {...register("skills")}
            />
            <Form.Check
              type="checkbox"
              label="Node.js"
              value="nodejs"
              {...register("skills")}
            />
            <Form.Check
              type="checkbox"
              label="Angular"
              value="angular"
              {...register("skills")}
            />
            {errors.skills && (
              <p className="errorMsg">{errors.skills.message}</p>
            )}
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
