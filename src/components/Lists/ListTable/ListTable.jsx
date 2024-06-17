import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './ListTable.scss';

const ListTable = ({ data, columns, isClickable }) => {
  const [dataList, setDataList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setDataList(data);
  }, [data]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2329D6',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: '#2329D6',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: '#2329D6',
          },
        },
      },
    },
  });

  const table = useMaterialReactTable({
    columns,
    data: dataList,
    columnFilterDisplayMode: 'popover',
    enableRowVirtualization: true,
    // enableColumnOrdering: true,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableColumnResizing: true,
    muiPaginationProps: {
      color: 'primary',
      showRowsPerPage: false,
      shape: 'rounded',
      showFirstButton: true,
      showLastButton: true,
    },
    paginationDisplayMode: 'pages',
    initialState: { pagination: { pageSize: 10 } },
    muiTableBodyCellProps: {
      sx: {
        padding: '16px 0',
        marginRight: '12px',
        color: '#284657',
        fontSize: '16px',
        fontWeight: 500,
        border: 'none',
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
        height: '57px',
      },
    },
    muiTableHeadCellProps: {
      sx: {
        padding: '16px 0',
        marginRight: '12px',
        color: '#284657',
        fontSize: '16px',
        fontWeight: 500,
        border: 'none',
        position: 'relative',
      },
    },
    muiTableHeadRowProps: {
      sx: {
        borderBottom: '1px solid #EDF2FA',
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        borderBottom: '1px solid #EDF2FA',
        cursor: isClickable ? 'pointer' : 'default',
        textDecoration: 'none',
        color: 'inherit',
      },
      component: isClickable ? Link : 'tr',
      to: isClickable ? `/${row.original.item}/${row.original.itemId}` : undefined,
    }),
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="data__table">
        <MaterialReactTable table={table} />
      </div>
    </ThemeProvider>
  );
};

export default ListTable;
