import React from 'react'
import ReusableComponent from './ReusableComponent';


const Screen2 = () => {
  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "address", header: "Address" },
  ];
  return (
    <>
    <ReusableComponent
     columns={columns}
     globalFilter={false}
     showGlobalFilter
     showSorting={false}
     showRefresh={true}
     pageSizeOptions={[5, 10, 20]}
     defaultPageSize={10}
    />
    </>
  )
}

export default Screen2;