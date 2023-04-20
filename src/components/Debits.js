/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import ListView from './ListView';
import AddForm from './AddForm';

const Debits = (props) => {
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
      <AddForm addItem={props.addDebit}/>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;