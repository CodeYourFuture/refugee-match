import React from 'react';

let tempAnswers = [];
let textAreaValue = '';
let textAreaValueRequired = false;

function collectingAnswer(event) {
  const eventValue = event.target.value;
  if (eventValue === 'Other') {
    return (!textAreaValueRequired);
  }
  const index = tempAnswers.indexOf(eventValue);
  index === -1 ? tempAnswers.push(eventValue) : tempAnswers.splice(index,1);
  // you can use this one as well
  // const checked = event.target.checked;
  // checked ? tempAnswers.push(eventValue) : tempAnswers.splice(index, 1);
  console.log(tempAnswers);
  // event.preventDefault();
}

function collectingTextAreaValue(event) {
  textAreaValue = event.target.value;
  console.log(textAreaValue);
}

function answerChecking() {
  if ((textAreaValueRequired) && (textAreaValue !== '')) {
    return (tempAnswers.length < 1)
  }
}

function answers() {
  if (textAreaValue) {
    tempAnswers.push(textAreaValue);
  }
  let value = tempAnswers;
  tempAnswers = [];
  textAreaValue = '';
  textAreaValueRequired = false;
  return value; 
}

export default function MultiOptionAnswer(props) {
  const question = props.question.question;
  const options = props.question.options;
  const handleSubmit = props.handleSubmit;
  return (
    <form onSubmit={() => handleSubmit(answers())}>
      <h3>{question}</h3>
      {
        options.map((option, index) => {
          return (
            option !== 'Other' ?          
            <label key={index} >{option}
              <input type='checkbox' name='option' value={option} onChange={collectingAnswer} /><br/>
            </label>
            :
            <label key={index} >{option}
              <input type='checkbox' name='option' value={option} onChange={collectingAnswer} /><br/>
              <textarea defaultValue='Please specify:' onChange={collectingTextAreaValue} /><br/>
            </label>
          );
        })
      }
      <input type='submit' value='Next'/>
    </form>
  );
}
