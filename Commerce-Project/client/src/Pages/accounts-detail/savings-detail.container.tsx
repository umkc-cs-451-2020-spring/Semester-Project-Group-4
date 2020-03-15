import React from 'react'
import {
  Divider,
  Paper,
  Grid as Layout,
  Typography,
  Button,
  IconButton,
  FormControl,
  Toolbar,
  MenuItem,
  Tooltip,
  TextField,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel
} from '@material-ui/core'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableColumnResizing,
  TableFilterRow,
  PagingPanel
} from '@devexpress/dx-react-grid-material-ui';
import {
  IntegratedSorting,
  SortingState,
  IntegratedFiltering,
  FilteringState,
  PagingState,
  IntegratedPaging
} from '@devexpress/dx-react-grid';
import { CSVLink } from "react-csv";
import DateFnsUtils from '@date-io/date-fns';
import { AddCircle, GetApp } from '@material-ui/icons';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
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
    gridMargin: {
      margin: '0 1rem 1rem 1rem'
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
    },
    downloadButton: {
      color: Theme.palette.primary.main
    },
  })
);

export interface FormProps {
  amount: any,
  description: any,
  processDate: any,
  actionType: any
}

const SavingsDetail = () => {
  // styles
  const { paper, divider, balance, addNewButton, combobox, downloadButton, layoutMargin, actionMargin, gridMargin } = useStyles()

  const username = store.get('username');

  // Grid Hooks
  const [savings, setSavings] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [sorting, setSorting] = React.useState<any>([])
  const [filters, setFilters] = React.useState<any>([]);
  const [pageSizes] = React.useState<number[]>([5, 10, 15, 25]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [columnWidths, setColumnWidths] = React.useState<any>([
    { columnName: 'processDate', width: 180 },
    { columnName: 'createdAt', width: 240 },
    { columnName: 'actionType', width: 180 },
    { columnName: 'amount', width: 180 },
    { columnName: 'description', width: 300 }
  ]);

  // Add New Hooks
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date('2020-01-02'));
  const [action, setAction] = React.useState<string>('');
  const [amount, setAmount] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const getBalances = async () => {
    let save = await apis.getSavingsBalance(username);
    setSavings(save.data.data[0].amount);
  }

  const getRows = async () => {
    let savingRows = await apis.getSavings(username);
    const row = savingRows.data.data;
    return setRows(row);
  }

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

  const handleAmountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmount(event.target.value as string);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDescription(event.target.value as string);
  };

  const negativeValue = (value: any) => {
    const minus = '-';
    if (action === "Withdrawal") {
      const newValue = minus.concat(value);
      return newValue;
    }
    else {
      return value
    }
  }

  const addNewTransaction = () => {
    const form: FormProps = {
      amount: negativeValue(amount),
      description: description,
      processDate: selectedDate,
      actionType: action
    }
    apis.createMoneyMarket(form, username)
    window.location.reload();
  }

  React.useEffect(() => {
    getBalances();
    getRows();
  }, [])

  return (
    <Paper elevation={0} className={paper}>
      <Typography variant='h5'>Savings Account</Typography>
      <Divider className={divider} />
      <Paper elevation={5} className={gridMargin}>
        <Grid rows={rows} columns={columns}>
          <FilteringState filters={filters} onFiltersChange={setFilters} />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize} />
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
            <Typography className={balance}>{savings}</Typography>
            <Tooltip title='Add New'>
              <IconButton className={addNewButton} onClick={handleOpen}>
                <AddCircle />
              </IconButton>
            </Tooltip>
            {rows.length > 0 ?
              <CSVLink
                className={downloadButton}
                data={rows}
                filename={"Savings-Transactions.csv"}
                uFEFF={false}
                target='_blank'
              >
                <Tooltip title='Download Transactions'>
                  <IconButton className={addNewButton}>
                    <GetApp />
                  </IconButton>
                </Tooltip>
              </CSVLink>
              : null
            }
          </Toolbar>
        </Grid>
      </Paper >
      {/* Add New Form */}
      < Dialog open={open} onClose={handleClose} >
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <Layout container justify='center' className={layoutMargin}>
            <Layout container justify='space-around'>
              <TextField label='Account' value='Money Market' disabled />
              <TextField label='Amount' type='number' value={amount} onChange={handleAmountChange} />
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
            <TextField
              label="Description"
              fullWidth
              className={layoutMargin}
              value={description}
              onChange={handleDescriptionChange} />
          </Layout>
        </DialogContent>
        <DialogActions className={actionMargin}>
          <Button onClick={handleClose} variant='outlined'> Cancel</Button>
          <Button variant='contained' color='primary' onClick={addNewTransaction}>Add</Button>
        </DialogActions>
      </Dialog >
    </Paper >
  )
}

export default SavingsDetail