import Header from './components/mainPage/Header/Header';
import Nav from './components/mainPage/Nav/Nav';
import GetUsers from './components/usersPage/GetUsers';
import RegistrationForm from './components/registrationPage/RegistrationForm';

function App() {

	return (
		<div className='container' id='main'>
			<Nav />
			<Header />
			<GetUsers />
			<RegistrationForm />
		</div>
	);
}

export default App;
