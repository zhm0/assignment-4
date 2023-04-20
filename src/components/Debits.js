/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import ListView from './ListView';

const Debits = (props) => {

  //Debit object to hold to input from form
  const debitInfo = {
    description: '',
    amount: 0,
    date: ''
  }

  const handleChange = (e) => {
    //Able to handle changes for either field
    e.target.type === "text" ? debitInfo.description = e.target.value : debitInfo.amount = e.target.valueAsNumber;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Make sure a valid info is entered
    if (debitInfo.description === '') {
      alert("Enter a description for the debit!");
    }
    else if (debitInfo.amount < 0.01) {
      alert("Enter a valid amount (Greater than 0)!");
    }
    else {
      //Record and save current date
      const date = new Date().toISOString();
      debitInfo.date = date;

      props.addDebit(debitInfo);  //Add new debit info to array
      e.target.reset(); //Reset the from to be blank
    }
  }

  // Render the list of Debit items and a form to input new Debit item
  return (
    <div className='landing-page'>
      <h1 style={{textDecoration: 'underline'}}>Debits</h1>
      <h2>Debit History</h2>

      <ListView list={props.debits}/>
      <br/>
      <br/>
      <AccountBalance accountBalance={props.accountBalance}/>
      <br/>
      <h2>Add Debit</h2>
      <form onSubmit={handleSubmit}>
        Description:<input type="text" name="description" onChange={handleChange} />
        Amount:<input type="number" name="amount" step="0.01" onChange={handleChange} />
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;