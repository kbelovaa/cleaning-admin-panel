// import React, { useEffect, useState, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getAllAddresses } from '../../http/listsAPI';
// import { setAddressesAction } from '../../store/actions/listActions';
// import ListTable from './ListTable/ListTable';

// const Addresses = () => {
//   const addresses = useSelector((state) => state.list.addresses);

//   const [loading, setLoading] = useState(true);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await getAllAddresses();

//       if (result.status === 200) {
//         dispatch(setAddressesAction(result.data.addresses.reverse()));
//         setLoading(false);
//       }
//     };

//     if (addresses.length === 0) {
//       fetchData();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'id',
//         header: '№',
//         size: 68,
//       },
//       {
//         accessorKey: 'fullAddress',
//         header: 'Address',
//         size: 180,
//       },
//       {
//         accessorKey: 'city',
//         header: 'City',
//         size: 80,
//       },
//       {
//         accessorKey: 'province',
//         header: 'Province',
//         size: 118,
//       },
//       {
//         accessorKey: 'postalCode',
//         header: 'Postal code',
//         size: 141,
//       },
//       {
//         accessorKey: 'customer',
//         header: 'Customer',
//         size: 150,
//       },
//       {
//         accessorKey: 'jobsDone',
//         header: 'Jobs done',
//         size: 131,
//       },
//       {
//         accessorKey: 'sqm',
//         header: 'sqm',
//         size: 84,
//       },
//       {
//         accessorKey: 'livingRooms',
//         header: 'Living rooms',
//         size: 149,
//       },
//       {
//         accessorKey: 'bedrooms',
//         header: 'Bedrooms',
//         size: 129,
//       },
//       {
//         accessorKey: 'bathrooms',
//         header: 'Bathrooms',
//         size: 135,
//       },
//       {
//         accessorKey: 'kitchens',
//         header: 'Kitchens',
//         size: 119,
//       },
//     ],
//     [],
//   );

//   return <ListTable data={addresses} columns={columns} loading={loading} />;
// };

// export default Addresses;
