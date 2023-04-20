/*==================================================
src/components/ListView.js

The ListView component displays history list. It is included in debits and credits views.
==================================================*/
import React, { Fragment } from 'react';
  
const Header = () => {
    return (
        <div className='header-container' key={0}>
            <b className='header'>Date</b>
            <b className='header'>Description</b>
            <b className='header'>Amount</b>
        </div>
    );
}

const List = (props) => {
    const { list } = props;
    return list.map((list) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
        let date = list.date.slice(0,10);
        return (
        <div className='transaction-container' key={list.id}>
          <p className='transaction'>{date}</p>
          <p className='transaction'>{list.description}</p>
          <p className='transaction'>{list.amount.toFixed(2)}</p>
        </div>
        );
      });
}
const ListView = (props) => {
    return (
        <Fragment>
            <Header />
            <List list={props.list}/>
        </Fragment>
    );
  }

export default ListView;