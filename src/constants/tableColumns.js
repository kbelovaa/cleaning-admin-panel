import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import { calculateTimeLeft } from '../utils/formatDate';
import TimerCell from '../components/Lists/TimerCell';

const openLink = (e, id, item, navigate) => {
  e.stopPropagation();
  navigate(`/${item}/${id}`);
};

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const cleanerCols = [
  {
    accessorKey: 'id',
    header: '№',
    size: 68,
  },
  {
    accessorKey: 'name',
    id: 'name1',
    header: 'Name',
    size: 150,
  },
  {
    accessorKey: 'surname',
    id: 'surname1',
    header: 'Surname',
    size: 150,
  },
  {
    accessorKey: 'workingStatus',
    header: 'Status',
    size: 101,
    filterVariant: 'select',
    filterSelectOptions: ['Active', 'Working', 'Inactive'],
    Cell: ({ cell }) => <div className={`status-wrapper ${cell.getValue()}`}>{cell.getValue()}</div>,
  },
  {
    accessorKey: 'salary',
    id: 'salary1',
    header: 'Salary, €',
    size: 118,
  },
  {
    accessorKey: 'avgJobPrice',
    header: 'Avg job price, €',
    size: 170,
  },
  {
    accessorKey: 'numberOfJobs',
    header: 'Nr of jobs',
    size: 126,
  },
  {
    accessorKey: 'doneJobsNumber',
    header: 'Completed',
    size: 136,
  },
  {
    accessorKey: 'pendingJobsNumber',
    header: 'Pending',
    size: 114,
  },
  {
    accessorKey: 'cancelledJobsNumber',
    header: 'Cancelled',
    size: 128,
  },
  {
    accessorKey: 'rating',
    id: 'rating1',
    header: 'Rating',
    size: 100,
  },
  {
    accessorKey: 'email',
    id: 'email1',
    header: 'Email',
    size: 200,
  },
  {
    accessorKey: 'mobile',
    id: 'mobile1',
    header: 'Phone number',
    size: 163,
  },
  {
    accessorKey: 'onboardingDate',
    id: 'onboardingDate1',
    header: 'Onboarding date',
    size: 180,
  },
];

const addressCols = [
  {
    accessorKey: 'id',
    header: '№',
    size: 68,
  },
  {
    accessorKey: 'fullAddress',
    id: 'fullAddress1',
    header: 'Address',
    size: 213,
  },
  {
    accessorKey: 'isSaved',
    header: 'Saved',
    size: 100,
    filterVariant: 'checkbox',
    Cell: ({ cell }) => (cell.getValue() ? <CheckIcon /> : <CloseIcon />),
  },
  {
    accessorKey: 'sqm',
    id: 'sqm1',
    header: 'sqm',
    size: 84,
  },
  {
    accessorKey: 'livingRooms',
    header: 'Living rooms',
    size: 149,
  },
  {
    accessorKey: 'bedrooms',
    header: 'Bedrooms',
    size: 129,
  },
  {
    accessorKey: 'bathrooms',
    header: 'Bathrooms',
    size: 135,
  },
  {
    accessorKey: 'kitchens',
    header: 'Kitchens',
    size: 119,
  },
  {
    accessorKey: 'jobsDone',
    header: 'Jobs done',
    size: 131,
  },
];

const getCustomerCols = (navigate) => {
  const customerCols = [
    {
      accessorKey: 'id',
      header: '№',
      size: 68,
    },
    {
      accessorKey: 'name',
      id: 'name2',
      header: 'Name',
      size: 150,
    },
    {
      accessorKey: 'surname',
      id: 'surname2',
      header: 'Surname',
      size: 150,
    },
    {
      accessorKey: 'nextCleaning',
      id: 'nextCleaning1',
      header: 'Next cleaning',
      size: 156,
      Cell: ({ cell, row }) => (
        <span
          className={row.original.nextCleaningId && 'link'}
          onClick={(e) => openLink(e, row.original.nextCleaningId, 'cleaning', navigate)}
        >
          {cell.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'numberOfOrders',
      header: 'Cleanings',
      size: 130,
    },
    {
      accessorKey: 'numberOfCompletedOrders',
      header: 'Completed',
      size: 136,
    },
    {
      accessorKey: 'numberOfPendingOrders',
      header: 'Pending',
      size: 114,
    },
    {
      accessorKey: 'numberOfCancelledOrders',
      header: 'Cancelled',
      size: 128,
    },
    {
      accessorKey: 'onboardingDate',
      id: 'onboardingDate2',
      header: 'Onboarding date',
      size: 180,
    },
    {
      accessorKey: 'lastActivityDate',
      header: 'Last activity',
      size: 145,
    },
    {
      accessorKey: 'avgScore',
      header: 'Avg score',
      size: 127,
    },
    {
      accessorKey: 'avgOrder',
      header: 'Avg cleaning, €',
      size: 170,
    },
    {
      accessorKey: 'orderPriceSum',
      header: 'Total spend, €',
      size: 160,
    },
    {
      accessorKey: 'email',
      id: 'email2',
      header: 'Email',
      size: 200,
    },
    {
      accessorKey: 'mobile',
      id: 'mobile2',
      header: 'Phone number',
      size: 163,
    },
  ];

  return customerCols;
};

const getJobCols = (navigate, isWide) => {
  const jobCols = [
    {
      accessorKey: 'id',
      header: '№',
      size: 68,
    },
    {
      accessorKey: 'status',
      id: 'status1',
      header: 'Status',
      size: 120,
      filterVariant: 'select',
      filterSelectOptions: ['Confirmed', 'In progress', 'Completed'],
      Cell: ({ cell }) => (
        <div className={`status-wrapper ${cell.getValue().replace(/\s/g, '')}`}>{cell.getValue()}</div>
      ),
    },
    {
      accessorKey: 'cleaner',
      id: 'cleaner1',
      header: 'Cleaner',
      size: 150,
      Cell: ({ cell, row }) => (
        <span
          className={row.original.cleanerId && 'link'}
          onClick={(e) => openLink(e, row.original.cleanerId, 'cleaner', navigate)}
        >
          {cell.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'date',
      id: 'date1',
      header: 'Date',
      size: 100,
    },
    {
      accessorKey: 'time',
      id: 'time1',
      header: 'Time',
      size: 85,
    },
    {
      accessorKey: 'cleaningType',
      id: 'cleaningType1',
      header: 'Type',
      size: 110,
    },
    {
      accessorKey: 'extraServices',
      id: 'extraServices1',
      header: 'Extras',
      size: 160,
    },
    {
      accessorKey: 'howFast',
      id: 'howFast1',
      header: 'How fast',
      size: 120,
    },
    {
      accessorKey: 'salary',
      id: 'salary2',
      header: 'Salary, €',
      size: 118,
    },
    {
      accessorKey: 'customer',
      id: 'customer1',
      header: 'Customer',
      size: 150,
      Cell: ({ cell, row }) => (
        <span
          className={row.original.customerId && 'link'}
          onClick={(e) => openLink(e, row.original.customerId, 'customer', navigate)}
        >
          {cell.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'fullAddress',
      id: 'fullAddress2',
      header: 'Address',
      size: 200,
    },
    {
      accessorKey: 'sqm',
      id: 'sqm2',
      header: 'sqm',
      size: 84,
    },
    {
      accessorKey: 'specialInstructions',
      id: 'specialInstructions1',
      header: 'Special instructions',
      size: 205,
    },
    {
      accessorKey: 'rating',
      id: 'rating2',
      header: 'Rating',
      size: 100,
    },
    {
      accessorKey: 'clientFeedbackText',
      header: 'Client feedback',
      size: 172,
    },
    {
      accessorKey: 'cleanerFeedbackText',
      header: 'Cleaner feedback',
      size: 187,
    },
  ];

  if (isWide) {
    jobCols.splice(11, 2);
  }

  return jobCols;
};

const getAdjustmentCols = (navigate, isWide, isWider, isMiddle) => {
  const adjustmentCols = [
    {
      accessorKey: 'id',
      header: '№',
      size: 68,
    },
    {
      accessorKey: 'orderId',
      id: 'orderId1',
      header: 'Cleaning',
      size: isWider ? 106 : isWide ? 100 : 80,
      enableSorting: false,
      enableColumnFilter: false,
      Cell: ({ cell }) => (
        <LaunchIcon className="launch-icon" onClick={(e) => openLink(e, cell.getValue(), 'cleaning', navigate)} />
      ),
    },
    {
      accessorKey: 'cleaner',
      id: 'cleaner2',
      header: 'Cleaner',
      size: isMiddle ? 282 : isWide ? 250 : 189,
      Cell: ({ cell, row }) => (
        <span
          className={row.original.cleanerId && 'link'}
          onClick={(e) => openLink(e, row.original.cleanerId, 'cleaner', navigate)}
        >
          {cell.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'reason',
      id: 'reason1',
      header: 'Reason',
      size: isWider ? 360 : isMiddle ? 300 : isWide ? 260 : 220,
    },
    {
      accessorKey: 'comment',
      id: 'comment1',
      header: 'Comment',
      size: isWider ? 360 : isMiddle ? 300 : isWide ? 260 : 220,
    },
    {
      accessorKey: 'date',
      id: 'date2',
      header: 'Date',
      size: isWider ? 135 : isWide ? 110 : 100,
    },
    {
      accessorKey: 'time',
      id: 'time2',
      header: 'Time',
      size: isWider ? 135 : isWide ? 104 : 95,
    },
  ];

  return adjustmentCols;
};

const getCancelledJobCols = (navigate, isWide) => {
  const cancelledJobCols = [
    {
      accessorKey: 'id',
      header: '№',
      size: 68,
    },
    {
      accessorKey: 'orderId',
      id: 'orderId2',
      header: 'Cleaning',
      size: 80,
      enableSorting: false,
      enableColumnFilter: false,
      Cell: ({ cell }) => (
        <LaunchIcon className="launch-icon" onClick={(e) => openLink(e, cell.getValue(), 'cleaning', navigate)} />
      ),
    },
    {
      accessorKey: 'newCleaner',
      header: 'New cleaner',
      size: isWide ? 250 : 160,
      Cell: ({ cell, row }) => (
        <span
          className={row.original.newCleanerId && 'link'}
          onClick={(e) => row.original.newCleanerId && openLink(e, row.original.newCleanerId, 'cleaner', navigate)}
        >
          {cell.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'cleaner',
      id: 'cleaner3',
      header: 'Cleaner',
      size: 160,
      Cell: ({ cell, row }) => (
        <span className="link" onClick={(e) => openLink(e, row.original.cleanerId, 'cleaner', navigate)}>
          {cell.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'reason',
      id: 'reason2',
      header: 'Reason',
      size: isWide ? 257 : 158,
    },
    {
      accessorKey: 'comment',
      id: 'comment2',
      header: 'Comment',
      size: isWide ? 257 : 159,
    },
    {
      accessorKey: 'date',
      id: 'date3',
      header: 'Date',
      size: isWide ? 120 : 90,
    },
    {
      accessorKey: 'time',
      id: 'time3',
      header: 'Time',
      size: isWide ? 120 : 85,
    },
  ];

  return cancelledJobCols;
};

const getRequestCols = (navigate) => {
  const requestCols = [
    {
      accessorKey: 'id',
      header: '№',
      size: 68,
    },
    {
      accessorKey: 'status',
      id: 'status2',
      header: 'Status',
      size: 145,
      filterVariant: 'select',
      filterSelectOptions: ['New', 'Invoiced', 'Awaiting confirmation', 'Cancelled'],
      Cell: ({ cell }) => (
        <div className={`status-wrapper ${cell.getValue().replace(/\s/g, '')}`}>{cell.getValue()}</div>
      ),
    },
    {
      accessorKey: 'customer',
      id: 'customer2',
      header: 'Customer',
      size: 150,
      Cell: ({ cell, row }) => (
        <span className="link" onClick={(e) => openLink(e, row.original.customerId, 'customer', navigate)}>
          {cell.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'date',
      id: 'date4',
      header: 'Date',
      size: 100,
    },
    {
      accessorKey: 'time',
      id: 'time4',
      header: 'Time',
      size: 85,
    },
    {
      accessorKey: 'cleaningType',
      id: 'cleaningType2',
      header: 'Type',
      size: 110,
    },
    {
      accessorKey: 'extraServices',
      id: 'extraServices2',
      header: 'Extras',
      size: 160,
    },
    {
      accessorKey: 'howFast',
      id: 'howFast2',
      header: 'How fast',
      size: 120,
    },
    {
      accessorKey: 'tariff',
      id: 'tariff1',
      header: 'Tariff',
      size: 100,
    },
    {
      accessorKey: 'price',
      id: 'price1',
      header: 'Price, €',
      size: 110,
    },
    {
      accessorKey: 'salary',
      id: 'salary3',
      header: 'Salary, €',
      size: 118,
    },
    {
      accessorKey: 'fullAddress',
      id: 'fullAddress3',
      header: 'Address',
      size: 200,
    },
    {
      accessorKey: 'sqm',
      id: 'sqm3',
      header: 'sqm',
      size: 84,
    },
    {
      accessorKey: 'specialInstructions',
      id: 'specialInstructions2',
      header: 'Special instructions',
      size: 205,
    },
    {
      accessorKey: 'isRecurring',
      id: 'isRecurring1',
      header: 'Recurring',
      size: 125,
      filterVariant: 'checkbox',
      Cell: ({ cell }) => (cell.getValue() ? <CheckIcon /> : <CloseIcon />),
    },
    {
      accessorKey: 'creationDate',
      id: 'creationDate1',
      header: 'Creation date',
      size: 155,
    },
  ];

  return requestCols;
};

const getCancelledRequestCols = (navigate, isWide) => {
  const cancelledRequestCols = [
    {
      accessorKey: 'id',
      header: '№',
      size: 68,
    },
    {
      accessorKey: 'orderId',
      id: 'orderId3',
      header: 'Cleaning',
      size: isWide ? 144 : 80,
      enableSorting: false,
      enableColumnFilter: false,
      Cell: ({ cell }) => (
        <LaunchIcon className="launch-icon" onClick={(e) => openLink(e, cell.getValue(), 'cleaning', navigate)} />
      ),
    },
    {
      accessorKey: 'customer',
      id: 'customer3',
      header: 'Customer',
      size: isWide ? 240 : 204,
      Cell: ({ cell, row }) => (
        <span className="link" onClick={(e) => openLink(e, row.original.customerId, 'customer', navigate)}>
          {cell.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'reason',
      id: 'reason3',
      header: 'Reason',
      size: isWide ? 336 : 215,
    },
    {
      accessorKey: 'comment',
      id: 'comment3',
      header: 'Comment',
      size: isWide ? 336 : 215,
    },
    {
      accessorKey: 'date',
      id: 'date5',
      header: 'Date',
      size: isWide ? 140 : 105,
    },
    {
      accessorKey: 'time',
      id: 'time5',
      header: 'Time',
      size: isWide ? 140 : 85,
    },
  ];

  if (isWide) {
    cancelledRequestCols.splice(2, 1);
  }

  return cancelledRequestCols;
};

const getUnconfirmedRequestCols = (navigate) => {
  const unconfirmedRequestCols = [
    {
      accessorKey: 'id',
      header: '№',
      size: 68,
    },
    {
      accessorKey: 'customer',
      id: 'customer4',
      header: 'Customer',
      size: 150,
      Cell: ({ cell, row }) => (
        <span className="link" onClick={(e) => openLink(e, row.original.customerId, 'customer', navigate)}>
          {cell.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'creationDate',
      id: 'creationDate2',
      header: 'Creation date',
      size: 155,
    },
    {
      accessorKey: 'paymentReservationDate',
      header: 'Time to confirm',
      size: 172,
      filterVariant: 'select',
      filterSelectOptions: ['Active', 'Expired'],
      filterFn: (row, columnId, filterValue) => {
        const cellValue = calculateTimeLeft(row.original[columnId]);
        if (filterValue === 'Active') {
          return cellValue !== null;
        }
        if (filterValue === 'Expired') {
          return cellValue === null;
        }
        return true;
      },
      Cell: TimerCell,
    },
    {
      accessorKey: 'cleanersNumber',
      header: 'Nr of cleaners',
      size: 160,
    },
    {
      accessorKey: 'date',
      id: 'date6',
      header: 'Date',
      size: 100,
    },
    {
      accessorKey: 'time',
      id: 'time6',
      header: 'Time',
      size: 85,
    },
    {
      accessorKey: 'cleaningType',
      id: 'cleaningType3',
      header: 'Type',
      size: 110,
    },
    {
      accessorKey: 'extraServices',
      id: 'extraServices3',
      header: 'Extras',
      size: 160,
    },
    {
      accessorKey: 'howFast',
      id: 'howFast3',
      header: 'How fast',
      size: 120,
    },
    {
      accessorKey: 'tariff',
      id: 'tariff2',
      header: 'Tariff',
      size: 100,
    },
    {
      accessorKey: 'price',
      id: 'price2',
      header: 'Price, €',
      size: 110,
    },
    {
      accessorKey: 'salary',
      id: 'salary4',
      header: 'Salary, €',
      size: 118,
    },
    {
      accessorKey: 'fullAddress',
      id: 'fullAddress4',
      header: 'Address',
      size: 200,
    },
    {
      accessorKey: 'sqm',
      id: 'sqm4',
      header: 'sqm',
      size: 84,
    },
    {
      accessorKey: 'specialInstructions',
      id: 'specialInstructions3',
      header: 'Special instructions',
      size: 205,
    },
    {
      accessorKey: 'isRecurring',
      id: 'isRecurring2',
      header: 'Recurring',
      size: 125,
      filterVariant: 'checkbox',
      Cell: ({ cell }) => (cell.getValue() ? <CheckIcon /> : <CloseIcon />),
    },
  ];

  return unconfirmedRequestCols;
};

const getSubscriptionCols = (navigate, isWide) => {
  const subscriptionCols = [
    {
      accessorKey: 'id',
      header: '№',
      size: 68,
    },
    {
      accessorKey: 'recurring',
      header: 'Recurring',
      size: 150,
    },
    {
      accessorKey: 'startDate',
      header: 'Start date',
      size: 140,
    },
    {
      accessorKey: 'endDate',
      header: 'End date',
      size: 140,
    },
    {
      accessorKey: 'numberOfCleans',
      header: 'Number of cleans',
      size: 190,
    },
    {
      accessorKey: 'nextCleaning',
      id: 'nextCleaning2',
      header: 'Next cleaning',
      size: 160,
      Cell: ({ cell, row }) => (
        <span
          className={row.original.nextCleaningId && 'link'}
          onClick={(e) => openLink(e, row.original.nextCleaningId, 'cleaning', navigate)}
        >
          {cell.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'excludedDates',
      header: 'Excluded dates',
      size: isWide ? 476 : 304,
    },
  ];

  if (isWide) {
    subscriptionCols.splice(5, 1);
  }

  return subscriptionCols;
};

export {
  weekdays,
  cleanerCols,
  addressCols,
  getCustomerCols,
  getJobCols,
  getAdjustmentCols,
  getCancelledJobCols,
  getRequestCols,
  getCancelledRequestCols,
  getUnconfirmedRequestCols,
  getSubscriptionCols,
};
