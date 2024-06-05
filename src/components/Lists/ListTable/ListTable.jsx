import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import './ListTable.scss';

const ListTable = ({ data, columns, loading, paths, jobsType, setJobsType }) => {
  const [dataList, setDataList] = useState([]);

  const { pathname } = useLocation();

  const { t } = useTranslation();

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
          {pathname.startsWith('/jobs') && (
            <div className="data__tabs">
              <div className={`data__tab ${jobsType === 'Active' && 'active'}`} onClick={() => setJobsType('Active')}>
                {t('active')}
              </div>
              <div className={`data__tab ${jobsType === 'Past' && 'active'}`} onClick={() => setJobsType('Past')}>
                {t('past')}
              </div>
            </div>
          )}
          <div className="data__table">
            <MaterialReactTable table={table} />
          </div>
        </ThemeProvider>
      )}
    </div>
  );
};

export default ListTable;
