import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* color objects for light styles */

const colors = {
  red: {
    backgroundColor: "red"
  },
  yellow: {
    backgroundColor: "yellow"
  },
  green: {
    backgroundColor: "green"
  },
  off: {
    backgroundColor: "white"
  }
};

/* sub components */

function ChangeLight(props) {
  return (
    <button className="change-light" onClick={props.onClick}>
      Change!
    </button>
  );
}

function ChangeModeSwitch(props) {
  return (
    <label className="switch">
      <input type="checkbox" onChange={props.onChnage} />
      <span className="slider round"></span>
    </label>
  );
}

function Light(props) {
  return (
    <div
      className="light"
      style={props.value}
    />
  );
}

/* primary component */

class TrafficLight extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      red: colors.off,
      yellow: colors.off,
      green: colors.off,
      next: '',
      active: false,
      mode: 'random'
    }
  }

  handeLightChange = () => {
    switch (this.state.next) {
      case colors.red:
        this.setState({
          red: colors.red,
          yellow: colors.off,
          green: colors.off,
          next: colors.green
        });
        break;
      case colors.yellow:
        this.setState({
          red: colors.off,
          yellow: colors.yellow,
          green: colors.off,
          next: colors.red
        });
        break;
      case colors.green:
        this.setState({
          red: colors.off,
          yellow: colors.off,
          green: colors.green,
          next: colors.yellow
        });
        break;
      default:
        this.setState({
          red: colors.red,
          yellow: colors.off,
          green: colors.off,
          next: colors.green
        });
    }
  }

  activateLight() {
    if (this.state.active) {
      return;
    } else {
      this.randomLightChange();
    }
  }

  randomLightChange() {
    switch ((Math.floor(Math.random() * 3)).toString()) {
      case '0':
        this.changeLightState(colors.red, colors.off, colors.off, colors.green, this.state.mode)
        break;
      case '1':
        this.changeLightState(colors.off, colors.yellow, colors.off, colors.red, this.state.mode)
        break;
      case '2':
        this.changeLightState(colors.off, colors.off, colors.green, colors.yellow, this.state.mode)
        break;
      default:
        this.changeLightState(colors.red, colors.off, colors.off, colors.green, this.state.mode)
    }
  }

  changeLightState(red, yellow, green, next, mode) {
    this.setState({
      red: red,
      yellow: yellow,
      green: green,
      next: next,
      active: true,
      mode: mode
    })
  }

  renderChangeLightButton(mode) {
    return (
      <ChangeLight
        onClick={() => this.handleClick(mode)}
      />);
  }

  changeMode() {
    var newModeState = this.state.mode === 'random' ? 'normal' : 'random';
    this.changeLightState(
      this.state.red,
      this.state.yellow,
      this.state.green,
      this.state.next,
      newModeState
    )
  }

  renderChangeModeSwitch() {
    return (
      <ChangeModeSwitch
        onChnage={() => this.changeMode()}
      />
    )
  }

  handleClick(mode) {
    mode === 'random' ? this.randomLightChange() : this.handeLightChange();
  }

  render() {
    return (
      <div>
        <div className="traffic-light" onClick={() => this.activateLight()}>
          <Light value={this.state.red} />
          <Light value={this.state.yellow} />
          <Light value={this.state.green} />
        </div>
        <div>
          {this.renderChangeLightButton(this.state.mode)}
          <br />
          {this.renderChangeModeSwitch()}
          <br />
          Mode: {this.state.mode}
        </div>
      </div>
    );
  }

}

class Intersection extends React.Component {
  render() {
    return (
      <div className="app-container">
        <TrafficLight />
      </div>
    );
  }
}

/* render app */

ReactDOM.render(
  <Intersection />,
  document.getElementById('root')
);
