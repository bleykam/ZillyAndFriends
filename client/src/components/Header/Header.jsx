import "./Header.scss";
import { useState } from 'react';
import {NavLink, Link, useNavigate} from 'react-router-dom';
import { supabase } from '../../utils';
import { useAuth } from '../../AuthContext';
import { Navbar,Container,Nav , NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';

// Header component
export default function Header() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  // Navigation links list
  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/Services", label: "SERVICES" },
    // { path: "/Calendar", label: "AVAILABILITY" },
    { path: "/Contact", label: "CONTACT" },
    { path: "/Reviews", label: "REVIEWS" },
  ];
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  return (
			<Navbar bg="primary" expand="lg" variant="dark">
				<Container px-xl-5 fluid>
					<Navbar.Toggle aria-controls="navbarColor01" />
					<Navbar.Collapse>
						<Nav className="me-auto">
							<Nav.Link href="#" active>
								<span className="visually-hidden">(current)</span>
							</Nav.Link>
							<Nav.Link className="p-3" href="/">
								Home
							</Nav.Link>
					  		<Nav className="p-2">
								<NavDropdown title="Service" className="no-caret " id="basic-nav-dropdown">
									<NavDropdown.Item href="/daycare">Daycare</NavDropdown.Item>
									<NavDropdown.Item href="/boarding">Boarding</NavDropdown.Item>
								</NavDropdown>
				  			</Nav>
							<Nav.Link className=" p-3" href="/reviews">
								Reviews
							</Nav.Link>
							<Nav.Link
								className="p-3"
								href={"https://" + "photos.app.goo.gl/EbNGmRakhfBzQrDX7"}
								target="_blank"
								rel="noreferrer"
							>
								Gallery
							</Nav.Link>
							<Nav.Link className=" p-3" href="/about">
								About
							</Nav.Link>
							<Nav.Link className="p-3" href="/contact">
								Contact
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
					<Navbar.Brand className=" mx-auto p-2 fs-1" href="/">
						Zilly & Friends
					</Navbar.Brand>
					<Navbar.Collapse>
						<Nav className="ms-auto">
							{user ? (
								<NavDropdown title={user.email} id="basic-nav-dropdown">
									<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={handleLogout}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<>
									<Nav.Link href="/login">Login</Nav.Link>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);}




  //    <div className="header">
  //     <NavLink to="/" className="header__navlink">
  //       <div className="header__home">Zilly & Friends</div>
  //     </NavLink>
  //     <div className="header__links">
  //       <ul className="header__list">
  //         {navLinks.map((link, index) => (
  //           <li key={index} className="header__item">
  //             <NavLink to={link.path} className="header__navlink">
  //               {link.label}
  //             </NavLink>
  //           </li>
  //         ))}
  //         <a  className="navbar__title-link" href={'https://' + "photos.app.goo.gl/EbNGmRakhfBzQrDX7"} target='_blank' rel='noreferrer'>
  //         <li className="header__item">GALLERY</li>
  //         </a>
            
  //        <li className="header__item"><Dropdown /></li>
  //       </ul>
  //     </div> 
  //   </div>
 

    
