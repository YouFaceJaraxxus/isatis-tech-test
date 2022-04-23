import React from 'react'
import tableClasses from './table.module.scss';


const Table = (props) => {

  const tableData = props.data;

  if (tableData.length === 0) {
    return (<table></table>)
  }

  const columns = Object.keys(tableData[0]);

  const tableHeader = () => {
    return columns.map( data => <th key={data}>{data}</th>);
  }

  const tableRows = () => {
    return tableData.map(data => {
      return <tr key={data.id}>{ columns.map(column => <td>{data[column]}</td>)}<td><button>Edit</button></td><td><button>Delete</button></td></tr>
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