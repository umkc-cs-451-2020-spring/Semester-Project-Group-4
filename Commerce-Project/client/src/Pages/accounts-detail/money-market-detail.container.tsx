import React from 'react'
import { Grid, Table, TableHeaderRow, TableColumnResizing, TableFilterRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import { IntegratedSorting, SortingState, IntegratedFiltering, FilteringState, PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import { AddCircle } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Divider, Paper, Grid as Layout, Typography, Button, IconButton, FormControl, Toolbar, MenuItem, Tooltip, TextField, Select, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel } from '@material-ui/core'
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
      flexGrow: 1
    },
    addNewButton: {
      marginTop: '.5rem',
      color: Theme.palette.primary.main
    },
    combobox: {
      width: '40%'
    },
    layoutMargin: {
      marginTop: '1.5rem'
    },
    actionMargin: {
      margin: '1rem'
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
  const { paper, divider, balance, addNewButton, combobox, layoutMargin, actionMargin } = useStyles()

  // Hooks
  const [open, setOpen] = React.useState(false);
  const [moneyMarket, setMoneyMarket] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date('2020-01-02'));
  const [action, setAction] = React.useState<string>('');
  const [sorting, setSorting] = React.useState<any>([])
  const [filters, setFilters] = React.useState<any>([]);
  const [pageSizes] = React.useState<number[]>([5, 10, 15, 25]);
  const [columnWidths, setColumnWidths] = React.useState<any>([
    { columnName: 'processDate', width: 180 },
    { columnName: 'createdAt', width: 240 },
    { columnName: 'actionType', width: 180 },
    { columnName: 'amount', width: 180 },
    { columnName: 'description', width: 300 }
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
    { name: 'processDate', title: 'Process Date' },
    { name: 'createdAt', title: 'Created On' },
    { name: 'actionType', title: 'Action' },
    { name: 'amount', title: 'Amount' },
    { name: 'description', title: 'Description' }
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAction(event.target.value as string);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <Paper elevation={0} className={paper}>
      <Typography variant='h5'>Money Market Account</Typography>
      <Divider className={divider} />
      <Paper elevation={5} style={{ position: 'relative' }}>
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
          <Toolbar variant='dense'>
            <Typography variant='subtitle1'>Available Balance: $</Typography>
            <Typography className={balance}>{moneyMarket}</Typography>
            <Tooltip title='Add New'>
              <IconButton className={addNewButton} onClick={handleOpen}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Grid>
      </Paper>
      {/* Add New Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <Layout container justify='center' className={layoutMargin}>
            <Layout container justify='space-around'>
              <TextField label='Account' value='Money Market' disabled />
              <TextField label='Amount' />
            </Layout>
            <Layout container justify='space-around' className={layoutMargin}>
              <FormControl className={combobox}>
                <InputLabel id='action'>Action</InputLabel>
                <Select labelId='action' value={action} onChange={handleActionChange}>
                  <MenuItem value={'Withdrawal'}>Withdrawal</MenuItem>
                  <MenuItem value={'Deposit'}>Deposit</MenuItem>
                </Select>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  placeholder="Date picker inline"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </Layout>
            <TextField label="Description" fullWidth className={layoutMargin} />
          </Layout>
        </DialogContent>
        <DialogActions className={actionMargin}>
          <Button onClick={handleClose} variant='outlined'> Cancel</Button>
          <Button variant='contained' color='primary'>Add</Button>
        </DialogActions>
      </Dialog >
    </Paper >
  )
}

export default MoneyMarketDetail
