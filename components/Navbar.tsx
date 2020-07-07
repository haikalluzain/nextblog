import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText
} from 'reactstrap';
import Link from 'next/link'
import { useState } from 'react';

const NavbarComponent = () => {

	const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

	return (

		<div>
			<Navbar color="dark" dark expand="md">
				<NavbarBrand href="/">Blog App</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<Link href="/">
								<a className='nav-link'>Blogs</a>
							</Link>
						</NavItem>
						<NavItem>
							<Link href="/blog/new">
								<a className='nav-link'>Create Blog</a>
							</Link>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	)
}

export default NavbarComponent