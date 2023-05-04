import React from 'react'
import ReusableComponent from './ReusableComponent'

const Screen1 = () => {
  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "address", header: "Address" },
    { field: "city", header: "city" },
    { field: "zip", header: "Zip" },
  ];
  return (
    <>
    <ReusableComponent 
     columns={columns}
     globalFilter
     showGlobalFilter={false}
     showSorting
     showRefresh
     pageSizeOptions={[5, 10, 20]}
     defaultPageSize={5}
    />
    </>
  )
}

export default Screen1