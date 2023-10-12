import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
	Edit as EditIcon,
  Delete as DeleteIcon,
  Close,
  SaveAs
} from '@mui/icons-material';

const data = [
	{
		id: '9s41rp',
		firstName: 'Kelvin',
		lastName: 'Langosh',
		email: 'Jerod14@hotmail.com',
		age: 19,
		state: 'Ohio',
    isEdit: false
	},
	{
		id: '08m6rx',
		firstName: 'Molly',
		lastName: 'Purdy',
		email: 'Hugh.Dach79@hotmail.com',
		age: 37,
		state: 'Rhode Island',
    isEdit: false
	},
	{
		id: '5ymtrc',
		firstName: 'Henry',
		lastName: 'Lynch',
		email: 'Camden.Macejkovic@yahoo.com',
		age: 20,
		state: 'California',
    isEdit: false
	},
	{
		id: 'ek5b97',
		firstName: 'Glenda',
		lastName: 'Douglas',
		email: 'Eric0@yahoo.com',
		age: 38,
		state: 'Montana',
    isEdit: false
	},
	{
		id: 'xxtydd',
		firstName: 'Leone',
		lastName: 'Williamson',
		email: 'Ericka_Mueller52@yahoo.com',
		age: 19,
		state: 'Colorado',
    isEdit: false
	},
	{
		id: 'wzxj9m',
		firstName: 'Mckenna',
		lastName: 'Friesen',
		email: 'Veda_Feeney@yahoo.com',
		age: 34,
		state: 'New York',
    isEdit: false
	},
	{
		id: '21dwtz',
		firstName: 'Wyman',
		lastName: 'Jast',
		email: 'Melvin.Pacocha@yahoo.com',
		age: 23,
		state: 'Montana',
    isEdit: false
	},
	{
		id: 'o8oe4k',
		firstName: 'Janick',
		lastName: 'Willms',
		email: 'Delfina12@gmail.com',
		age: 25,
		state: 'Nebraska',
    isEdit: false
	},
];
  
const states = [
	'Alabama',
	'Alaska',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'Florida',
	'Georgia',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Pennsylvania',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming',
	'Puerto Rico',
];

const AppTable = () => {
  const [tableData, setTableData] = useState(() => [...data]);
  const [updateTblData, setUpdateTblData] = useState(() => [...data]);
  const [validationErrors, setValidationErrors] = useState({});

  const handleCreateAccount = () => {
    const obj = {
      id: '9s41rp',
      firstName: '',
      lastName: '',
      email: '',
      age: 0,
      state: 'Ohio',
      isEdit: false
    };
    const arr = [...tableData];
    arr.push(obj);
    setTableData([...arr]);
    setUpdateTblData([...arr]);
  }

	const handleEditRow = (tbl, row) => {
    tbl.setEditingRow(row);
    const tblData = [...tableData];
    tblData[row.index].isEdit = true;
    setTableData([...tblData]);
    setUpdateTblData([...tblData]);
  }

  const handleClose = (table, row) => {
    table.setEditingRow(null);
    const tblData = [...tableData];
    tblData[row.index].isEdit = false;
    setTableData([...tblData]);
    setUpdateTblData([...tblData]);
    setValidationErrors({});
  }

  const handleSave = (table, row, cell) => {
    table.setEditingRow(null);
    const tblData = [...updateTblData];
    tblData[row.index].isEdit = false;
    setTableData([...tblData]);
    setUpdateTblData([...tblData]);
  }

  const handleDeleteRow = (action, tbl, tblData) => {
    const dattb = [...tableData];
    var filtered = dattb.filter(function(value, index){ 
      return index !== tblData.index;
  });
    setTableData([...filtered]);
    setUpdateTblData([...filtered]);
  };

  const handleSaveCell = (cell, value) => {
    const tblData = [...updateTblData];
    tblData[cell.row.index] = {...updateTblData[cell.row.index]}
    tblData[cell.row.index][cell.column.id] = value;
    setUpdateTblData([...tblData]);
  };

  const getCommonEditTextFieldProps = (cell) => {
    return {
      error: !!validationErrors[cell.id],
      helperText: validationErrors[cell.id],
      onBlur: (event) => {
        const isValid =
          cell.column.id === 'email'
            ? validateEmail(event.target.value)
            : cell.column.id === 'age'
            ? validateAge(+event.target.value)
            : validateRequired(event.target.value);
        if (!isValid) {
          setValidationErrors({
            ...validationErrors,
            [cell.id]: `${cell.column.columnDef.header} is required`,
          });
        } else {
          delete validationErrors[cell.id];
          setValidationErrors({
            ...validationErrors,
          });
          handleSaveCell(cell, event.target.value);
        }
      },
    };
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email',
        }),
      },
      {
        accessorKey: 'age',
        header: 'Age',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'state',
        header: 'State',
        muiTableBodyCellEditTextFieldProps: {
          select: true,
          children: states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          )),
        },
      },
    ],
    [getCommonEditTextFieldProps],
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="row"
        enableColumnOrdering
        enableEditing
				// enableSelectAll={false}
				// enableMultiRowSelection={false}
				// enableRowSelection={(row) => row.original.age}
        // onEditingRowSave={handleSaveRowEdits}
        // onEditingRowSave={handleSaveRow}
        // onEditingRowCancel={handleCancelRowEdits}
        // enableGlobalFilter={false}
				// enableColumnFilters={false}
				enableFullScreenToggle={false}
				enableDensityToggle={false}
				enableRowActions
				positionActionsColumn='first'
				positionToolbarAlertBanner="none"
        renderRowActions={({ cell, row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            {!row.original.isEdit && (<><Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => handleEditRow(table, row)}>
								<EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow("deleteIcon", table, row)}>
								<DeleteIcon />
              </IconButton>
            </Tooltip></>)}
            {row.original.isEdit && (<><Tooltip arrow placement="left" title="Close">
              <IconButton onClick={() => handleClose(table, row)}>
								<Close />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="left" title="Save">
              <IconButton disabled={Object.keys(validationErrors).length > 0} onClick={() => handleSave(table, row, cell)}>
								<SaveAs />
              </IconButton>
            </Tooltip></>)}
          </Box>
        )}
        renderTopToolbarCustomActions={({ table }) => (
					<div style={{
						display: 'flex',
						gap: '0.5rem'
					}}>
          <Button
            color="success"
            onClick={() => handleCreateAccount()}
            variant="contained"
          >
            Create New Account
          </Button>
				</div>
        )}
      />
    </>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default AppTable;