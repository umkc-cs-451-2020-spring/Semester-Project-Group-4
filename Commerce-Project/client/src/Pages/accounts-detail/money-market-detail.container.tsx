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
  InputLabel,
  Input,
  InputAdornment,
  FormLabel,
  FormGroup
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
import { numberWithCommas } from '../../utils/numberFormatter';
import { dateConverter } from '../../utils/dateTimeConversion';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: '1rem',
      height: '100%',
      margin: '5rem 1rem',
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

const MoneyMarketDetail = () => {
  // styles
  const { paper, divider, balance, addNewButton, combobox, downloadButton, layoutMargin, actionMargin, gridMargin } = useStyles()

  const username = store.get('username');

  // Grid Hooks
  const [moneyMarket, setMoneyMarket] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [sorting, setSorting] = React.useState<any>([{ columnName: 'processDate', direction: 'desc' }])
  const [filters, setFilters] = React.useState<any>([]);
  const [pageSizes] = React.useState<number[]>([5, 10, 15, 25]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [columnWidths, setColumnWidths] = React.useState<any>([
    { columnName: 'processDate', width: 250 },
    { columnName: 'actionType', width: 200 },
    { columnName: 'credit', width: 200 },
    { columnName: 'debit', width: 200 },
    { columnName: 'description', width: 300 }
  ]);

  // Add New Hooks
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date('2020-01-02'));
  const [action, setAction] = React.useState<string>('');
  const [amount, setAmount] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const getBalances = async () => {
    let money = await apis.getMoneyMarketBalance(username);
    const format = money.data.data[0].amount;

    setMoneyMarket(numberWithCommas(format));
  }

  const getRows = async () => {
    let moneyRows = await apis.getMoneyMarket(username);
    const row = moneyRows.data.data;
    const formatData = row.map((format: any) => {
      const credit = () => {
        if (format.actionType === 'Deposit') {
          return `$ ${format.amount}`
        }
        else {
          return ''
        }
      }

      const debit = () => {
        if (format.actionType === 'Withdrawal') {
          return `$ ${format.amount}`
        }
        else {
          return ''
        }
      }

      return {
        processDate: format.processDate,
        actionType: format.actionType,
        debit: debit(),
        credit: credit(),
        createdAt: format.createdAt,
        description: format.description
      }
    })
    return setRows(formatData);
  }

  const columns = [
    { name: 'processDate', title: 'Process Date' },
    { name: 'actionType', title: 'Action' },
    { name: 'credit', title: 'Deposit' },
    { name: 'debit', title: 'Withdrawal' },
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

  const addNewTransaction = () => {
    const form: FormProps = {
      amount: amount,
      description: description,
      processDate: dateConverter(selectedDate),
      actionType: action
    }
    apis.createMoneyMarket(form, username)
    window.location.reload();
  }

  React.useEffect(() => {
    getBalances();
    getRows();
    // eslint-disable-next-line
  }, [])

  return (
    <Paper elevation={0} className={paper}>
      <Typography variant='h5'>Money Market Account</Typography>
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
            <Typography className={balance}>{moneyMarket}</Typography>
            <Tooltip title='Add New'>
              <IconButton className={addNewButton} onClick={handleOpen}>
                <AddCircle />
              </IconButton>
            </Tooltip>
            {rows.length > 0 ?
              <CSVLink
                className={downloadButton}
                data={rows}
                filename={"Money-Market-Transactions.csv"}
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
              <FormGroup>
                <FormLabel>
                  Amount
                  </FormLabel>
                <Input
                  id="Amount"
                  value={amount}
                  onChange={handleAmountChange}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormGroup>
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

export default MoneyMarketDetail
