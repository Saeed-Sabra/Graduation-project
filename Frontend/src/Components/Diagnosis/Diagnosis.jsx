import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import style from './Diagnosis.module.css'

export default function Diagnosis() {
  const [finalResult, setFinalResult] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);

  let { id } = useParams();

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: snedPredictionData,
  });

  async function snedPredictionData(values) {
    const { data } = await axios.post(
      "http://localhost:3001/users/prediction",
      values
    );
    console.log(values);
  }

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  
    if (currentQuestion === 2) {
      setProgress(25); 
    } else if (currentQuestion === 4 ) {
      setProgress(progress + 25);
    }else if (currentQuestion === 6) {
      setProgress(progress + 25);
    }else if (currentQuestion === 8) {
      setProgress(progress + 25);
    }else if (currentQuestion === 10) {
      setProgress(progress + 25);
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  
    setProgress((prevProgress) => {
      if (currentQuestion === 2) {
        return 25; 
      } else if (currentQuestion === 4 || currentQuestion === 6 || currentQuestion === 8 || currentQuestion === 10) {
        return prevProgress - 25;
      } else {
        return prevProgress;
      }
    });
  };

  const renderInput = (option) => {
    if (option.type === "number") {
      return (

<div className="mb-3">
  <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
</div>
      )

    } else if (option.type === "text") {
      return (
        <input
          type={option.type}
          placeholder={option.placeholder}
          onChange={(event) =>
            formik.setFieldValue(
              `question${currentQuestion}`,
              event.target.value
            )
          }
        />
      );
    } else if (option.type === "yesno") {
      return (
        <div>
          <button
            onClick={() =>
              formik.setFieldValue(`question${currentQuestion}`, "Yes")
            }
          >
            Yes
          </button>
          <button
            onClick={() =>
              formik.setFieldValue(`question${currentQuestion}`, "No")
            }
          >
            No
          </button>
        </div>
      );
    }
  };

  const questions = [
    {
      text: "How old are you?",
      options: [{ id: 0, placeholder: "Enter your age", type: "number" }],
    },
    {
      text: "Choose your gender",
      options: [
        { id: 0, image: "assets/Male.png", text: "Male" },
        { id: 1, image: "assets/Female.png", text: "Female" },
      ],
    },
    {
      text: "What is your height?",
      options: [{ id: 0, placeholder: "Enter your height", type: "number" }],
    },
    {
      text: "What is your weight?",
      options: [{ id: 0, placeholder: "Enter your weight", type: "number" }],
    },
    {
      text: "Your high blood pressure?",
      options: [{ id: 0, type: "number" }],
    },
    {
      text: "Your low blood pressure?",
      options: [{ id: 0, type: "number" }],
    },
    {
      text: "Cholesterol?",
      options: [{ id: 0, type: "number" }],
    },
    {
      text: "Glucose",
      options: [{ id: 0, type: "number" }],
    },
    {
      text: "Do you smoke?",
      options: [
        { id: 0, image: "assets/yes.png" },
        { id: 1, image: "assets/no.png" },
      ],
    },
    {
      text: "Do you drink Alcohol?",
      options: [
        { id: 0, image: "assets/yes.png" },
        { id: 1, image: "assets/no.png" },
      ],
    },
    {
      text: "Do you do any activites?",
      options: [
        { id: 0, image: "assets/yes.png" },
        { id: 1, image: "assets/no.png" },
      ],
    },
  ];

  const clicked = (text) => {
    console.log(`Clicked option : ${text}`);
  };

  return (
    <div className={`${style.testSec} container w-100 text-center mt-5 bg-secondary bg-gradient rounded-3 d-flex flex-column align-items-center`}>
      <h1>Blood Pressure Diagnosis</h1>
  
      <div className="progress mb-5 w-75" role="progressbar" aria-label="Basic example" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
        <div className={`progress-bar w-${progress}`}></div>
      </div>
  
      {finalResult ? (
        <>
          <div className="finalResult"></div>
          <h1>Final Result</h1>
          <h2>Your result is Stage 2</h2>
        </>
      ) : (
        <>
          <div className={style.questionBox}>
            <h2>{questions[currentQuestion].text}</h2>
  
            <div className={`d-flex justify-content-center ${style.optionContainer}`}>
              {questions[currentQuestion].options.map((option) => (
                <div
                  key={option.id}
                  className={`${style.option} m-auto mt-4 w-25`}
                  onClick={() => clicked(option.text)}
                >
                  <div style={{ cursor: "pointer" }}>
                    {option.image && (
                      <img
                        src={option.image}
                        style={{ width: "200px", height: "200px" }}
                      />
                    )}
                    {/* renderInput is not defined in the provided code, make sure it's properly implemented */}
                    {renderInput(option)}
                    <p>{option.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className={style.buttons}>
            {currentQuestion === 10 ? (
              <>
                <div className="btn btn-primary p-2 text-center" onClick={handlePreviousQuestion}>
                  <span className="text-white">Submit</span>
                </div>
                <div className="d-flex justify-content-start mt-3 mb-1">
                  <div className="btn btn-primary me-auto p-2" onClick={handlePreviousQuestion}>
                    <FontAwesomeIcon icon={faArrowLeft} className="text-danger text-white" />
                    <span className="text-white ms-3">Previous Question</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="btn btn-primary me-5 p-2 text-center" onClick={handlePreviousQuestion}>
                  <FontAwesomeIcon icon={faArrowLeft} className="text-danger text-white" />
                  <span className="text-white ms-3">Previous Question</span>
                </div>
                <div className="btn btn-primary p-2" onClick={handleNextQuestion}>
                  <span className="me-3">Next Question</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-danger text-white" />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
  
  
  
}
