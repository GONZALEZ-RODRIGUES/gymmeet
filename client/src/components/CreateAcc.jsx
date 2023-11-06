import {  useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CreateAcc.css";
import image from "../assets/bg-r-1.jpg";
import Alert from '@mui/material/Alert';


const CreateAcc = () => {
  const emailInput = useRef("");
  const passwordInput = useRef("");
  const rePasswordInput = useRef("");
  const firstNameInput = useRef("");
  const lastNameInput = useRef("");
  const genderInput = useRef("");
  const weightInput = useRef("");
  const heightInput = useRef("");
  const ageInput = useRef("");
  const goalsInput = useRef("");
  const descriptionInput = useRef("");
  const gymAttInput = useRef("");

  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();

    const userData = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
      first_name: firstNameInput.current.value,
      last_name: lastNameInput.current.value,
      gender: genderInput.current.value,
      weight: weightInput.current.value,
      height: heightInput.current.value,
      age: ageInput.current.value,
      goals: goalsInput.current.value,
      description: descriptionInput.current.value,
      gym_attended: gymAttInput.current.value,
    };

    const url = "http://localhost:5100/create";

    try {
      const response = await axios.post(url, userData);

      if (response.status === 200 && response.data !== false) {
        navigate("/home");
      } else {
        // window.alert("Email already exist");
        setAlertOpen(true);
      }
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  return (
    <>
      <div className="bgContainer" style={{ backgroundImage: `url(${image})` }}>
        <div className="container-title">
          <h1 className="title">GymMeet</h1>
          <h2 className="text">Do it together</h2>
        </div>
        <div className="container-register">
          <form className="form-login" action="#" onSubmit={handleRequest}>
            <label className="label-register" htmlFor="email">
              Email:
            </label>
            <input
              className="input-login"
              type="text"
              name="email"
              placeholder="Email"
              ref={emailInput}
            />
            {alertOpen && (
              <Alert severity="error" onClose={() => setAlertOpen(false)}>
                Email already exists
              </Alert>
            )}
            <label className="label-register" htmlFor="password">
              Password:
            </label>
            <input
              className="input-login"
              type="password"
              name="password"
              placeholder="Password"
              ref={passwordInput}
            />
            <label className="label-register" htmlFor="repassword">
              Re-enter Password:
            </label>
            <input
              className="input-login"
              type="password"
              name="repassword"
              placeholder="Password"
              ref={rePasswordInput}
            />
            <label className="label-register" htmlFor="firstname">
              First Name:
            </label>
            <input
              className="input-login"
              type="text"
              name="firstname"
              placeholder="Andy"
              ref={firstNameInput}
            />
            <label className="label-register" htmlFor="lastname">
              Last Name:
            </label>
            <input
              className="input-login"
              type="text"
              name="lastname"
              placeholder="Smith"
              ref={lastNameInput}
            />
            <label className="label-register" htmlFor="gender">
              Gender:
            </label>
            <select className="input-login" name="gender" ref={genderInput}>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="Other">Other</option>
            </select>
            <label className="label-register" htmlFor="weight">
              Weight (kg):
            </label>
            <input
              className="input-login"
              type="number"
              name="weight"
              placeholder="70"
              ref={weightInput}
            />
            <label className="label-register" htmlFor="height">
              Height (cm):
            </label>
            <input
              className="input-login"
              type="number"
              name="height"
              placeholder="175"
              ref={heightInput}
            />
            <label className="label-register" htmlFor="age">
              Age:
            </label>
            <input
              className="input-login"
              type="number"
              name="age"
              placeholder="30"
              ref={ageInput}
            />
            <label className="label-register" htmlFor="goals">
              Goals:
            </label>
            <select className="input-login" name="goals" ref={goalsInput}>
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="fitness">Fitness</option>
            </select>
            <label className="label-register" htmlFor="description">
              Description (up to 150 characters):
            </label>
            <textarea
              className="input-login"
              name="description"
              placeholder="Describe yourself..."
              ref={descriptionInput}
              maxLength="150"
            ></textarea>
            <button className="button-login">Register</button>
          </form>

        </div>
      </div>
    </>
  );
};

export default CreateAcc;
