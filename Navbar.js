import {FormControl, FormGroup, MenuItem, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";



function NavBar(props) {
    
    const [searchId,setsearchId] = useState([]);

    return (
        <div >
            <Navbar inverse collapseOnSelect staticTop>
                <Navbar.Header>
                    <LinkContainer to="/">
                        <Navbar.Brand id = "navtitle"> <p style={{color: "#F6694B"}}>BTI425-Weather</p></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav> 
                        <NavDropdown title="Previously Viewed" id="basic-nav-dropdown"> {props.Views.length > 0 ? props.Views.map((id, index)=>(
                            <LinkContainer to={`/City/id/${id}`} key={index}>
                                <MenuItem ><Link className="btn btn-default" to={"/id/" + id}>city : {id}</Link></MenuItem>
                            </LinkContainer> )) :            
                            <MenuItem>...</MenuItem>}
                        </NavDropdown>
                    </Nav>
                    <Navbar.Form pullRight>
                        <FormGroup>
                            <FormControl type="text" className="mr-sm-2" onChange={(e) => setsearchId(e.target.value)} placeholder="Country,City..." />
                        </FormGroup>{' '}
                        <Link className="btn btn-default" to={"/City/" + searchId}>Search</Link>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;
