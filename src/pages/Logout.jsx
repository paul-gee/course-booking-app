import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../UserContext';

export default function Logout() {
	const { unsetUser, setUser } = useContext(UserContext);

	useEffect(() => {
		unsetUser();
		setUser({ id: null });
	}, [])

	return <Navigate to="/login"/>
}