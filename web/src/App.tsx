import React from "react";
import AuthRoute from "./AuthRoute";
const App = () => {
  return (
    // <RouterProvider router={router} />
    <AuthRoute />
    // <Routes>
    //   <Route path="/" element={<Navigate to={navigatePath} />} />
    //   <Route
    //     path="/login"
    //     element={
    //       <React.Suspense fallback={<>...</>}>
    //         <Login />
    //       </React.Suspense>
    //     }
    //   />
    //   <Route
    //     path="/chat"
    //     element={
    //       <AuthRoute>
    //         <React.Suspense fallback={<>...</>}>
    //           <Chat />
    //         </React.Suspense>
    //       </AuthRoute>
    //     }
    //   />
    //   <Route path="*" element={<NoMatch />} />
    // </Routes>
  );
};

export default App;
