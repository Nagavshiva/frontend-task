import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import fakeData from './data';



const ReusableComponent = ({
  columns,
  globalFilter,
  showGlobalFilter,
  showSorting,
  showRefresh,
  pageSizeOptions,
  defaultPageSize }) => {

  const [data, setData] = useState([]);
  const [first, setFirst] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    setData(fakeData);
  }, []);


  // Function to handle column filtering
  const onFilter = (event) => {
    let value = event.target.value;
    let filteredData = data.slice();
    for (let col in filters) {
      if (filters[col].value) {
        filteredData = filteredData.filter((item) =>
          item[col].toString().toLowerCase().includes(filters[col].value.toLowerCase())
        );
      }
    }
    setTotalRecords(filteredData.length); // update totalRecords state with number of filtered records
    setData(filteredData.slice(first, first + pageSize));
  };
  


  // Function to handle filtering by column value changes
  const onFilterChange = (event, column) => {
    const newFilters = { ...filters };
    newFilters[column.field] = { value: event.target.value };
    setFilters(newFilters);
    onFilter(event);
  };

  // Function to handle global filtering by keyword
  const onGlobalFilterChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setGlobalFilterValue(searchQuery);
    if (searchQuery) {
      const filteredData = fakeData.filter((item) => {
        return Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(searchQuery)
        );
      });
      setTotalRecords(filteredData.length);
      setData(filteredData.slice(first, first + pageSize));
    } else {
      setTotalRecords(fakeData.length);
      setData(fakeData.slice(first, first + pageSize));
    }
  };



  // Function to handle sorting
  const onSort = (event) => {
    let newSortField = event.sortField;
    let newSortOrder = event.sortOrder;
    setFirst(0);
    setSortField(newSortField);
    setSortOrder(newSortOrder);
    let sortedData = [...data].sort((item1, item2) => {
      let value1 = item1[newSortField];
      let value2 = item2[newSortField];
      if (newSortOrder === 1) {
        return value1 > value2 ? 1 : -1;
      } else if (newSortOrder === -1) {
        return value1 < value2 ? 1 : -1;
      }
      return 0;
    });
    setTotalRecords(sortedData.length);
    setData(sortedData.slice(first, first + pageSize));
  };
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text onClick={() => setData(fakeData)} />;
  return (
    <>
      <div>
        {showGlobalFilter && (
          <div className="p-mb-4">
            <InputText
              className="p-inputtext-sm p-d-block p-mb-2"
              placeholder="Search Global"
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
            />
          </div>
        )}
        <div style={{ marginTop: '1rem' }}>
          <DataTable
            value={data}
            paginatorLeft={paginatorLeft}
            paginator
            rows={pageSize}
            first={first}
            totalRecords={totalRecords}
            onPage={(event) => {
              const { first, rows } = event;
              setFirst(first);
              setPageSize(rows);
              // const newData = data.slice(first, first + rows);
              // setData(newData);
            }}
            rowsPerPageOptions={pageSizeOptions}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
            filters={filters}
            onFilter={onFilter}
            emptyMessage="No data found"
          >
            {columns.map((col) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                filter={
                  col.filter && (
                    <InputText
                      className="p-inputtext-sm"
                      value={filters[col.field] ? filters[col.field].value : ""}
                      onChange={(e) => onFilterChange(e, col)}
                      placeholder={`Search ${col.header}`}
                    />
                  )
                }
                sortable={showSorting}
              />
            ))}
          </DataTable>
        </div>
      </div>

    </>


  )
}

export default ReusableComponent;