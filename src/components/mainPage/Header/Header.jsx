import Button from '../../ui/Buttons/Button';
import './header.scss';

const Header = () => {
	return (
		<header className='header'>
			<div className='header-overlay'>
				<div className='header-wrapper'>
					<h1 className='header__title'>
						Test assignment for front-end developer
					</h1>
					<p className='header__text'>
						What defines a good front-end developer is one that has skilled
						knowledge of HTML, CSS, JS with a vast understanding of User design
						thinking as they'll be building web interfaces with accessibility in
						mind. They should also be excited to learn, as the world of
						Front-End Development keeps evolving.
					</p>
					<Button text='Sign up' />
				</div>
			</div>
		</header>
	);
};

export default Header;
