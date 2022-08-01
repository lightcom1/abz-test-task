import { useLazyGetUsersQuery } from '../../store/abz/abz.api';
import { useEffect, useState } from 'react';
import './getUsers.scss';
import Button from '../ui/Buttons/Button';
import Loader from '../ui/Loader/Loader';
import UserCard from './UserCard/UserCard';
import { useActions } from './../../hooks/actions';
import { useSelector } from 'react-redux';

const GetUsers = () => {
	const [isMoreLoading, setIsMoreLoading] = useState(false);
	const [fetchUsers, { data, isLoading, isError, error }] =
		useLazyGetUsersQuery();
	const { addUsers, resetUsers, nextPage } = useActions();
	const { users, page } = useSelector(state => state.users);

	useEffect(() => {
		return () => resetUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const loadUsers = async () => {
			await fetchUsers(page).unwrap();
		};

		loadUsers();
		setIsMoreLoading(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	useEffect(() => {
		data?.users && addUsers(data?.users);

		setIsMoreLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<section className='GET-section' id='users'>
			<h1 className='title'>Working with GET request</h1>
			<div className='users'>
				{users && users.map(user => <UserCard key={user.id} {...user} />)}
			</div>

			{isError && (
				<p className='error'>
					Error while loading users: {error.status} {error.originalStatus}
				</p>
			)}
			{isLoading && <Loader />}

			{!isMoreLoading ? (
				<Button
					text={'Show more'}
					showMore={nextPage}
					isDisabled={data?.total_pages === page}
				/>
			) : (
				<Loader />
			)}
		</section>
	);
};

export default GetUsers;
