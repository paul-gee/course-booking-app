import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { NULL_USER } from '../constants/app';
import { clearLocalStorage } from '../scripts/utils';


export default function Logout() {
	const { setUser } = useContext(UserContext);

	useEffect(() => {
		clearLocalStorage();
		setUser(NULL_USER);
	}, [])

	return <Navigate to="/login"/>
}