// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// function ProtectedRoute({ children }) {
//   let history = useHistory();
//   const userType = getUserTypeFromToken(localStorage.getItem('access_token'));

//   useEffect(() => {
//     if (!userType || userType!== 'Student') {
//       history.push('/404');
//     }
//   }, [history, userType]);

//   return userType? children : null;
// }

// export default ProtectedRoute;
