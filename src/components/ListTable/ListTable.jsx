import React from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import './ListTable.scss';

const ListTable = ({ data, columns, loading, paths }) => {
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
    data,
    columnFilterDisplayMode: 'popover',
    enableRowVirtualization: true,
    enableColumnActions: false,
    enableDensityToggle: false,
    muiPaginationProps: {
      color: 'primary',
      showRowsPerPage: false,
      shape: 'rounded',
      showFirstButton: true,
      showLastButton: true,
    },
    paginationDisplayMode: 'pages',
    initialState: { pagination: { pageSize: 10 } },
    muiTableBodyCellProps: ({ cell }) => ({
      sx: {
        padding: '16px 0',
        marginRight: '12px',
        color: '#284657',
        fontSize: '16px',
        fontWeight: 500,
        border: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: `${cell.column.size}px`,
        display: 'block',
      },
    }),
    muiTableHeadCellProps: {
      sx: {
        padding: '16px 0',
        marginRight: '12px',
        color: '#284657',
        fontSize: '16px',
        fontWeight: 500,
        border: 'none',
      },
    },
    muiTableHeadRowProps: {
      sx: {
        borderBottom: '1px solid #EDF2FA',
      },
    },
    muiTableBodyRowProps: {
      sx: {
        borderBottom: '1px solid #EDF2FA',
      },
    },
  });

  return (
    <div className="data">
      <Breadcrumbs paths={paths} />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <ThemeProvider theme={theme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      )}
    </div>
  );
};

export default ListTable;
