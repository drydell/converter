import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const initialRate = 1.1;

export default class PollingRenderer extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    rate: initialRate,
    min: initialRate * 0.98,
    max: initialRate * 1.02 
  };

  componentDidMount() {
    this.intervalId = setInterval(
      () => {
        const newRate = this.state.rate + ((Math.random() - 0.5) / 10);
        this.setState({
            rate: newRate,
            min: newRate * 0.98,
            max: newRate * 1.02
        });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
      },
      3000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return <Fragment>{this.props.children(this.state)}</Fragment>;
  }
}
