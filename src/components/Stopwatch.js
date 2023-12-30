import { Component } from 'react';
import React from 'react';
import './index.css';

class Stopwatch extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    milliseconds: 0,
  };

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  onResetTimer = () => {
    clearInterval(this.timeInterval);
    this.setState({ isTimerRunning: false, timeElapsedInSeconds: 0, milliseconds: 0 });
  };

  onStopTimer = () => {
    clearInterval(this.timeInterval);
    this.setState({ isTimerRunning: false });
  };

  updateTime = () => {
    this.setState((prevState) => {
      const { timeElapsedInSeconds, milliseconds } = prevState;
      let updatedMilliseconds = milliseconds + 100;
      let updatedSeconds = timeElapsedInSeconds;

      if (updatedMilliseconds >= 1000) {
        updatedMilliseconds = 0;
        updatedSeconds += 1;
      }

      return {
        timeElapsedInSeconds: updatedSeconds,
        milliseconds: updatedMilliseconds,
      };
    });
  };

  onStartTimer = () => {
    this.timeInterval = setInterval(this.updateTime, 100);
    this.setState({ isTimerRunning: true });
  };

  renderMilliseconds = () => {
    const { milliseconds } = this.state;
    if (milliseconds < 10) {
      return `00${milliseconds}`;
    } else if (milliseconds < 100) {
      return `0${milliseconds}`;
    } else {
      return milliseconds;
    }
  };

  renderSeconds = () => {
    const { timeElapsedInSeconds } = this.state;
    const seconds = Math.floor(timeElapsedInSeconds % 60);
    if (seconds < 10) {
      return `0${seconds}`;
    }
    return seconds;
  };

  renderMinutes = () => {
    const { timeElapsedInSeconds } = this.state;
    const minutes = Math.floor(timeElapsedInSeconds / 60);
    if (minutes < 10) {
      return `0${minutes}`;
    }
    return minutes;
  };

  render() {
    const { isTimerRunning } = this.state;
    const time = `${this.renderMinutes()}:${this.renderSeconds()}:${this.renderMilliseconds()}`;

    return (
      <div className="app-container">
        <div className="stopwatch-container">
          <h1 className="stopwatch">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer">
              <img
                className="timer-image"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="heading">Timer</p>
            </div>
            <h1 className="stopwatch-timer">{time}</h1>
            <div className="timer-buttons">
              <button
                type="button"
                className="start-button button"
                onClick={this.onStartTimer}
                disabled={isTimerRunning}
              >
                Start
              </button>
              <button type="button" className="stop-button button" onClick={this.onStopTimer}>
                Pause
              </button>
              <button type="button" className="reset-button button" onClick={this.onResetTimer}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stopwatch;
