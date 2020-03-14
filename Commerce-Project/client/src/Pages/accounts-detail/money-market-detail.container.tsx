import React from 'react'
import { Divider, Paper, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles';
import { Grid, Table, TableHeaderRow, TableColumnResizing } from '@devexpress/dx-react-grid-material-ui';
import store from "store";
import apis from '../../api';
import { IntegratedSorting, SortingState } from '@devexpress/dx-react-grid';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: '1rem',
      height: '100%'
    },
    divider: {
      marginTop: '1rem',
      marginBottom: '2rem'
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
  const { paper, divider } = useStyles()

  // Hooks
  const [moneyMarket, setMoneyMarket] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [columnWidths, setColumnWidths] = React.useState<any>([
    { columnName: 'accountNumber', width: 180 },
    { columnName: 'processDate', width: 180 },
    { columnName: 'createdAt', width: 240 },
    { columnName: 'actionType', width: 180 },
    { columnName: 'amount', width: 180 },
    { columnName: 'description', width: 240 }
  ]);
  const [sorting, setSorting] = React.useState<any>([])

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
      <Typography variant='h5'>Money Market Account -- {moneyMarket}</Typography>
      <Divider className={divider} />
      <Paper style={{ position: 'relative' }}>
        <Grid rows={rows} columns={columns}>
          <SortingState
            sorting={sorting}
            onSortingChange={setSorting}
          />
          <IntegratedSorting />
          <Table />
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={setColumnWidths}
          />
          <TableHeaderRow showSortingControls />
        </Grid>
      </Paper>
    </Paper >
  )
}

export default MoneyMarketDetail
