import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import questions from './questions/questions.json'
import './css/main.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        data: questions,
        activeQuestion: 0,
        pigeon: 0,
        owl: 0,
        peacock: 0,
        eagle: 0,
        haveQuestions: true,
        winnerIs: ''
      }
  }

  castVote = (event) => {
    // Get total number of questions
    const totalQuestions = Object.keys(this.state.data.questions).length - 1

    // Get clicked element
    let clickedElement = event.target

    // Check if clicked element has value
    if (!clickedElement.value) {
      clickedElement = clickedElement.parentElement
    }

    // Assign casted vote
    let vote = clickedElement.value

    // Check if vote is YES or NO
    if (vote === 'Yes') {
      const qustionActive = this.state.activeQuestion
      const question = this.state.data.questions[qustionActive]

      // Continue counting or show results
      if (qustionActive < totalQuestions) {
        // Update vote
        switch(question.type) {
          case 1:
            this.setState({
              pigeon: this.state.pigeon + 1
            })
            break
          case 2:
            this.setState({
              owl: this.state.owl + 1
            })
            break
          case 3:
            this.setState({
              peacock: this.state.peacock + 1
            })
            break
          default:
          this.setState({
            eagle: this.state.eagle + 1
          })
        }
      } else {
        this.setState({
          haveQuestions: false
        })
        // Calculate the winner
        let winner

        if (this.state.pigeon > this.state.owl && this.state.pigeon > this.state.peacock && this.state.pigeon > this.state.eagle ) {
          winner = 'golub'
        } else if (this.state.owl > this.state.peacock && this.state.owl > this.state.eagle ) {
          winner = 'sova'
        } else if ( this.state.peacock > this.state.eagle ) {
          winner = 'paun'
        } else {
          winner = 'orao'
        }

        this.setState({ winnerIs: winner })
      }
    }
    // Update ID of current question
    this.setState({
      activeQuestion: this.state.activeQuestion + 1
    })
  }

  render() {
    let showTextContent

    if(this.state.haveQuestions) {
      showTextContent = <main>
                          <p>{ this.state.data.questions[this.state.activeQuestion].question }</p>
                          <div className='gridwrap'>
                            <Button variant='raised' color='primary' size='large' value='Yes' onClick={ this.castVote }>Da</Button>
                            <Button variant='raised' color='secondary' size='large' value='No' onClick={ this.castVote }>Ne</Button>
                          </div>
                        </main>
    } else {
      showTextContent = <main><p>Ti si <strong>{ this.state.winnerIs }</strong>!</p></main>
    }

    return (
      <div className="dope">
        <header>
          <h1>DOPE test <small>indikator ličnog ponašanja</small></h1>
        </header>
        { showTextContent }
        <footer>&copy; 2018 Auxburgo | All rights reserved. </footer>
      </div>
    );
  }
}

export default App;
