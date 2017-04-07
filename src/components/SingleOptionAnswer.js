import React from 'react';

let tempAnswer = {
      answerId: null,
      answer: null,
      answerValue: 0
    };
let textAreaValue = null;

function answerChecking() {
  return (tempAnswer.answerId === null);
}

function collectingAnswer(event) {
  tempAnswer.answer = event.target.value;
  tempAnswer.answerId = event.target.id;
  tempAnswer.answerValue = 1;
}

function answer() {
  if (tempAnswer.answer === 'Other') {
    if (textAreaValue !== null) {
      tempAnswer.answer = textAreaValue;
    }
  }
  let value = tempAnswer;
  tempAnswer = {
    answerId: null,
    answer: null,
    answerValue: 0
  };
  textAreaValue = null;
  return value;
}

function collectingTextAreaValue(event) {
  textAreaValue = event.target.value;
  console.log(tempAnswer);
}

export default function SingleOptionAnswer(props) {
  const question = props.question.question;
  const options = props.question.options;
  const handleSubmit = props.handleSubmit;
  const handlePrevious = props.handlePrevious;
  return (
    <form>
      <h3>{question}</h3>
      {
        options.map((answer, index) => {
          return (
            answer.answer !== 'Other' ? (
              <label htmlFor={answer.answerId} key={index} >
                {answer.answer}
                <input
                  type='radio'
                  name='answer'
                  className='radioBtn'
                  value={answer.answer}
                  id={answer.answerId}
                  onChange={collectingAnswer} />
               <br/>
              </label>
            ) : (
              <label htmlFor={answer.answerId} key={index} >
                {answer.answer}
                <input
                  type='radio'
                  name='answer'
                  className='radioBtn'
                  value={answer.answer}
                  id={answer.answerId}
                  onChange={collectingAnswer} />
                <br/>
                <textarea
                  defaultValue='Please specify:'
                  onChange={collectingTextAreaValue} />
                <br/>
              </label>
            )
          );
        })
      }
      <input
        type='button'
        value='Previous'
        className = 'prevBtn'
        onClick={handlePrevious} />
      <input
        type='button'
        value='Next'
        className = 'nextBtn'
        onClick={() => {answerChecking() ? alert('Please choose answer'):handleSubmit(answer())}} />
    </form>
  );
}

