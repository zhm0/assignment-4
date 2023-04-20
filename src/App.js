/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  async componentDidMount() {
    //Links to website API
    let linkToCreditsAPI =  "https://johnnylaicode.github.io/api/credits.json";
    let linkToDebitsAPI =  "https://johnnylaicode.github.io/api/debits.json";

    try {
      //Attempt to retreive array
      let creditResponse = await axios.get(linkToCreditsAPI);
      let debitResponse = await axios.get(linkToDebitsAPI);

      //Calculates accountBalance based on arrays received
      let accountBalance = 0;
      for (let i of creditResponse.data) {
        accountBalance += i.amount;
      }
      for (let i of debitResponse.data) {
        accountBalance -= i.amount;
      }
      accountBalance = Math.round( accountBalance * 100 ) / 100;

      //Saves arrays and new accountBalance to state
      this.setState({accountBalance: accountBalance});
      this.setState({creditList: creditResponse.data});
      this.setState({debitList: debitResponse.data});
    } 
    catch(error) {
      console.error(error);
    }
  }

  addDebit = (debitInfo) => {
    //Create new debit object to insert into array
    const debit = {...debitInfo};
    debit.id = this.state.debitList.length + 1;

    //Update account balance with new debit entry
    const newAccountBalance = Math.round( (this.state.accountBalance - debit.amount) * 100 ) / 100;

    //Save changes to accountBalance and insert debit into array
    this.setState({accountBalance: newAccountBalance})
    this.setState({debitList: [...this.state.debitList, debit]});
  }

  addCredit = (creditInfo) => {
    //Create new credit object to insert into array
    const credit = {...creditInfo};
    credit.id = this.state.creditList.length + 1;

    //Update account balance with new credit entry
    const newAccountBalance = Math.round( (this.state.accountBalance + credit.amount) * 100 ) / 100;

    //Save changes to accountBalance and insert credit into array
    this.setState({accountBalance: newAccountBalance})
    this.setState({creditList: [...this.state.creditList, credit]});
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/assignment-4">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;