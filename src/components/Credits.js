/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import ListView from './ListView';
import AddForm from './AddForm';

const Credits = (props) => {
  // Render the list of Credit items and a form to input new Credit item
  return (
    <div className='landing-page'>
      <h1 style={{textDecoration: 'underline'}}>Credits</h1>
      <h2>Credit History</h2>
      <ListView list={props.credits}/>
      <br/>
      <br/>
      <AccountBalance accountBalance={props.accountBalance}/>
      <br/>
      <h2>Add Credit</h2>
      <AddForm addItem={props.addCredit}/>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}




export default Credits;