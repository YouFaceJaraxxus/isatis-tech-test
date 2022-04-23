import React from 'react'
import tableClasses from './table.module.scss';


const Table = (props) => {

  const tableData = props.data;
  const headers = props.headers;

  if (tableData.length === 0) {
    return (<h3>No products</h3>)
  }

  const columns = Object.values(headers);
  const keysToShow = Object.keys(headers);

  const tableHeader = () => {
    return columns.map( data => <th key={data}>{data}</th>);
  }

  const tableRows = () => {
    return tableData.map(data => {
      return <tr key={data.ID}>{ keysToShow.map(column => <td>{data[column]}</td>)}
        <td>
          <button className={tableClasses.buttonEdit} onClick={() => props.handleUpdate(data)}>Update</button></td>
        <td>
          <button className={tableClasses.buttonDelete} onClick={() => props.handleDelete(data.id)}>Delete</button>
        </td>
      </tr>
    })
  }


  return (
    <table className={tableClasses.table}>
      <thead>
        <tr>{tableHeader()}
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{tableRows()}</tbody>
    </table>
  )
};

export default Table;