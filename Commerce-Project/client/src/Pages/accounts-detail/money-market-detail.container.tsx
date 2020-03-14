import React from 'react'
import { Grid, Table, TableHeaderRow, TableColumnResizing, TableFilterRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import { IntegratedSorting, SortingState, IntegratedFiltering, FilteringState, PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import { AddCircle } from '@material-ui/icons';
import { Divider, Paper, Typography, Button, IconButton, Toolbar, Tooltip } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles';
import store from "store";
import apis from '../../api';
import { Theme } from '../../components';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: '1rem',
      height: '100%'
    },
    divider: {
      marginTop: '1rem',
      marginBottom: '2rem'
    },
    balance: {
      color: Theme.palette.primary.main,
      fontWeight: 700,
      marginLeft: '.25rem',
      paddingTop: '0.1875rem',
      paddingBottom: '1rem'
    },
    addNewToolbar: {
      flexDirection: 'row-reverse'
    },
    addNewButton: {
      color: Theme.palette.primary.main
    }
  })
);

export interface accountDetails {
  accountNumber: number,
  processDate: string,
  createdAt: string,
  actionType: string,
  amount: number,
  description: string
}

const MoneyMarketDetail = () => {
  // styles
  const { paper, divider, balance, addNewButton, addNewToolbar } = useStyles()

  // Hooks
  const [moneyMarket, setMoneyMarket] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [sorting, setSorting] = React.useState<any>([])
  const [filters, setFilters] = React.useState<any>([]);
  const [pageSizes] = React.useState<number[]>([5, 10, 15, 25]);
  const [columnWidths, setColumnWidths] = React.useState<any>([
    { columnName: 'accountNumber', width: 180 },
    { columnName: 'processDate', width: 180 },
    { columnName: 'createdAt', width: 240 },
    { columnName: 'actionType', width: 180 },
    { columnName: 'amount', width: 180 },
    { columnName: 'description', width: 240 }
  ]);

  const storage = store.get('username');

  const getBalances = async () => {
    let money = await apis.getMoneyMarketBalance(storage);
    setMoneyMarket(money.data.data[0].amount);
  }

  const getRows = async () => {
    let moneyRows = await apis.getMoneyMarket(storage);
    const row = moneyRows.data.data;
    return setRows(row);
  }

  React.useEffect(() => {
    getBalances();
    getRows();
  }, [])

  const columns = [
    { name: 'accountNumber', title: 'Account Number' },
    { name: 'processDate', title: 'Process Date' },
    { name: 'createdAt', title: 'Created At' },
    { name: 'actionType', title: 'Action' },
    { name: 'amount', title: 'Amount' },
    { name: 'description', title: 'Description' }
  ];

  return (
    <Paper elevation={0} className={paper}>
      <Typography variant='h5'>Money Market Account</Typography>
      <Divider className={divider} />
      <Typography className={balance}>Available Balance: ${moneyMarket}</Typography>
      <Paper style={{ position: 'relative' }}>
        <Grid rows={rows} columns={columns}>
          <FilteringState filters={filters} onFiltersChange={setFilters} />
          <PagingState />
          <IntegratedFiltering />
          <SortingState
            sorting={sorting}
            onSortingChange={setSorting}
          />
          <IntegratedSorting />
          <IntegratedPaging />
          <Table />
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={setColumnWidths}
          />
          <TableHeaderRow showSortingControls />
          <TableFilterRow />
          <PagingPanel pageSizes={pageSizes} />
          <Toolbar variant='dense' className={addNewToolbar}>
            <Tooltip title='Add New'>
              <IconButton className={addNewButton}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Grid>
      </Paper>
    </Paper >
  )
}

export default MoneyMarketDetail
