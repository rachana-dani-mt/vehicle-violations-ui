import React, { memo } from 'react'
import { Link } from 'react-router-dom'

function Card(props) {
  return (
    <div
      className="card specialCard mx-auto"
      style={{
        width: '18rem',
        padding: '20px',
        backgroundColor: 'rgb(246,246,246)',
        border: 'none',
        margin: '15px',
      }}
    >
      <div className="card-body text-center">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Fine Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.id}</td>
              <td>{props.name}</td>
              <td>{props.fine_amount}</td>
            </tr>
          </tbody>
        </table>
        {/* <Link
          className="btn btn-primary text-white font-weight-bold"
          to={`/Profile/${props.id}`}
          id={props.id}
        >
          Click to view Profile
        </Link> */}
      </div>
    </div>
  )
}

export default memo(Card)