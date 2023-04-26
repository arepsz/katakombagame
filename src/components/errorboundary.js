import React, { Component } from 'react'

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      let ablak = document.getElementById('react-confirm-alert');
      ablak.classList.add("hideEverything");
      return (
        <div className="error-boundary">
            <img src='/images/error.png'/>
            <h1>{"Valami hiba történt :("}</h1>
            <p>Kérjük frissítse az oldalt, hogy visszatérjen a kezdőlapra!</p>
            <p>Ha továbbra is fennáll a hiba, <a href="https://github.com/arepsz" target="_blank">írjon nekünk!</a></p>
        </div>
      )
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary;
