/*==================================================
src/components/AddForm.js

The AddForm component displays from to add. It is included in debits and credits views.
==================================================*/
import React from 'react';

//Item object to hold to input from form
const itemInfo = {
    description: '',
    amount: 0,
    date: ''
  }

  const handleChange = (e) => {
    //Able to handle changes for either field
    e.target.type === "text" ? itemInfo.description = e.target.value : itemInfo.amount = e.target.valueAsNumber;
  }

  const handleSubmit = (e, addItem) => {
    e.preventDefault();

    //Make sure a valid info is entered
    if (itemInfo.description === '') {
      alert("Enter a description!");
    }
    else if (itemInfo.amount < 0.01) {
      alert("Enter a valid amount (Greater than 0)!");
    }
    else {
      //Record and save current date
      const date = new Date().toISOString();
      itemInfo.date = date;

      addItem(itemInfo);  //Add new item info to array
      e.target.reset(); //Reset the from to be blank
    }
  }

  //Create from to take in description and amount
  const AddForm = (props) => {
    return (
        <form onSubmit={e => handleSubmit(e, props.addItem)}>
            Description:<input type="text" name="description" onChange={handleChange} />
            Amount:<input type="number" name="amount" step="0.01" onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    )
  }

  export default AddForm;