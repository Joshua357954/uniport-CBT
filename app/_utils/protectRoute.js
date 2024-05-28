// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export function ProtectedAuth({ children }) {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const isAuthenticated = !!localStorage.getItem('userData');
//         console.log("Auth Status : ", isAuthenticated);
//         if (isAuthenticated) {
//             navigate("/");
//         }
//     }, [navigate]);

//     return children;
// }

// export function ProtectedHome({ children }) {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const isAuthenticated = !!localStorage.getItem('userData');
//         console.log("Home :");
//         if (!isAuthenticated) {
//             navigate("/auth");
//         }
//     }, [navigate]);

//     return children;
// }


import { useRouter } from 'next/navigation';
import { useEffect } from 'react'; 

export const protectedAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = !!localStorage.getItem('userData');
      console.log("Auth Status : ", isAuthenticated);
      if (isAuthenticated) {
        router.replace('/');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};



export const protectedHome = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = !!localStorage.getItem('userData');
      console.log("Home :");
      if (!isAuthenticated) {
        router.replace('/auth');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

