import React from 'react'
import tableClasses from './table.module.scss';
import classNames from 'classnames/bind';


const Table = (props) => {
  const cx = classNames.bind(tableClasses);
  const tableData = props.data;
  const headers = props.headers;
  const sizes = props.sizes;

  if (tableData.length === 0) {
    return (<h3>No products</h3>)
  }

  const columns = Object.values(headers);
  const keysToShow = Object.keys(headers);

  const tableHeader = () => {
    return columns.map((data, index) => {
      const size = sizes ? sizes[index] : null; return (
        <th key={data} className={getWidth(size)}>{data}</th>
      )
    });
  }

  const getWidth = (size) => {
    return cx({
      largeCell: size === 'lg',
      mediumCell: size === 'md',
      smallCell: size === 's',
      xSmallCell: size === 'xs',
    })
  }

  const tableRows = () => {
    return tableData.map((data, index) => {

      return <tr key={data.id} >{keysToShow.map((column, index) => {
        const size = sizes ? sizes[index] : null;
        return (
          <td key={index} className={getWidth(size)}>{data[column]}</td>
          )
        })}
        <td>
          <button className={cx({
            crudButton: true,
            buttonEdit: true
          })} onClick={() => props.handleUpdate(data)}>Update</button></td>
        <td>
          <button className={cx({
            crudButton: true,
            buttonDelete: true
          })} onClick={() => props.handleDelete(data.id)}>Delete</button>
        </td>
      </tr>
    })
  }


  return (
    <table className={tableClasses.table}>
      <thead>
        <tr>{tableHeader()}
          <th className={tableClasses.tableCellButton}></th>
          <th className={tableClasses.tableCellButton}></th>
        </tr>
      </thead>
      <tbody>{tableRows()}</tbody>
    </table>
  )
};

export default Table;