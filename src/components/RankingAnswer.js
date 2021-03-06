import React, { Component } from 'react';

export default class RankingAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question.question,
      options: this.props.question.options,
      handleSubmit: this.props.handleSubmit,
      questionText: 'Now choose which one is the most important from the rest',
      answers: [],
      answersValue:[1, 0.75, 0.5, 0.25]
      
    }
  }
  onclickHandler = (event) => {
    const handleSubmit = this.state.handleSubmit;
    let answersValue = this.state.answersValue;
    let answers = this.state.answers;
    let options = this.state.options;
    const objectValue = {
            answerId: event.target.id,
            answer: event.target.value,
            answerValue: answersValue[0]
          }
    answers.push(objectValue);
    answersValue.shift();
    options = options.filter(value => value.answerId !== objectValue.answerId);
    if (options.length === 1) {
      options[0].answerValue = 0.25;
      answers.push(options[0]);
      handleSubmit(answers);
      return;
    }
    this.setState({
      answers: answers, 
      options: options, 
      answersValue: answersValue, 
      question: this.state.questionText
    })
    // setTimeout(() => this.setState({answers: answers, options: options, answersValue: answersValue, question: this.state.questionText}), 150);
  }
  displayRender = () => {
    const options = this.state.options;
    return (
      <div>
        {
          options.map((answer, index) => {
            return (
              <input
                className='rankQuestion'
                key={index}
                id={answer.answerId}
                type='button'
                value={answer.answer}
                onClick={this.onclickHandler} />
            );
          })
        }
      </div>
    );
  }
  render() {
    const question = this.state.question;
    return (
      <form>
      <h3>{question}</h3>
      {
        this.displayRender()
      }
      </form>
    );
  }
}
