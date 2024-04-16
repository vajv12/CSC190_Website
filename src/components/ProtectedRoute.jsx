import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFirebase } from '../FirebaseContext';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ProtectedRoute = ({ children }) => {
    const { auth, db } = useFirebase();
    const location = useLocation();
    const [user, setUser] = React.useState(null);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [redirect, setRedirect] = React.useState(false);

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                const usersRef = collection(db, 'usernames');
                const q = query(usersRef, where("userId", "==", currentUser.uid));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    setIsAdmin(userDoc.data().isAdmin);
                }
                setUser(currentUser);
            } else {
                setUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth, db]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (redirect) {
        return <Navigate to="/pages/Home" state={{ from: location, unauthorized: true }} replace />;
    }

    if (!user || !isAdmin) {
        setRedirect(true);
        return null;
    }

    return children;
};

export default ProtectedRoute;