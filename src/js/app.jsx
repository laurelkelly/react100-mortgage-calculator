import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here

  // Define a constructor method to initialize the state of the app. Here you will need to add a property for each input field to the state object and set their initial values. Then, return to your HTML and add a value attribute to each editable input element in your HTML to bind these elements to their respective properties on the state object.

  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      rate: 0,
      term: '30',
      output: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculate = this.calculate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // Define a function to update state values when an input changes, using event binding. Once this is in place, return to your HTML and add an onChange event to each of the input elements that calls this new method.

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Define a calculate function to determine the mortgage payment and then set state to bind the result to the div with an id of output as a string like this: $1945.09 is your payment. This function should accept 3 parameters: balance, rate, and term. Finally, return to your HTML and add an onClick event to this button that calls the calculate function while passing the state object as an argument.

  calculate(balance, rate, term) {

    // divide APR by 12 months & convert this percentage to a decimal
    rate = (rate/12)/100;

    // convert years to months
    term = term * 12;

    let monthlyPayment = (rate * balance) / (1 - (Math.pow((1 + rate), (-term))));

    return parseFloat(monthlyPayment.toFixed(2));
  }

  handleClick(event) {
    event.preventDefault();
    let result = this.calculate(this.state.balance, this.state.rate, this.state.term);
    this.setState({output: "$" + result + " is your monthly payment."});
  }

  render() {
    return (
      <div className='container'>
        {/* your JSX goes here */}
        <div>
          <h1>Mortgage Calculator</h1>
          <hr/>
        </div>
        <form className='form-horizontal'>
          <div className='form-group'>
            <label htmlFor='inBalance' className='col-sm-2 control-label'>Loan Balance</label>
            <div className='col-sm-10'>
              <div className='form-group-addon'></div>
              <input name='balance' type='number' value={this.state.balance} onChange={this.handleInputChange} className='form-control' id='inBalance' />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='inRate' className='col-sm-2 control-label'>Interest Rate (%)</label>
            <div className='col-sm-10'>
              <input name='rate' type='number' step='0.01' value={this.state.rate} onChange={this.handleInputChange} className='form-control' id='inRate' />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='inTerm' className='col-sm-2 control-label'>Loan Term (years)</label>
            <div className='col-sm-10'>
              <select name='term' type='select' value={this.state.term} onChange={this.handleInputChange} className='form-control' id='inTerm'>
                <option value='15'>15</option>
                <option value='30'>30</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button name='submit' type='submit' onClick={this.handleClick} className='btn btn-primary'>Calculate</button>
            </div>
          </div>
          <div name='output' id='output'>{this.state.output}</div>
        </form>
      </div>
    );
  }
}