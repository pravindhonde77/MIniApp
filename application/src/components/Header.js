import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Menu from '@mui/material/Menu';
import { DLT } from '../Redux/action/action';

// import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';



const Header = () => {

    const [price, setPrice] = useState(0);

    const getData = useSelector((state) => state.cartreducer.carts)
    console.log(getData)


    const dispatch=useDispatch()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt=(id)=>{
        dispatch(DLT(id))
    }

    const total=()=>{
        let price=0
        getData.map((ele,k)=>{
            price=ele.price*ele.qnty+price
        })
        setPrice(price)
    }

    useEffect(() => {
        total()
    }, [total]);
    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
                <Container>
                    <NavLink to="/" className="text-decoration-none  text-light mx-3"   >Add to Cart</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/card" className="text-decoration-none  text-light" >Home</NavLink>
                    </Nav>
                    <Badge badgeContent={getData.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i class="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
                    </Badge>
                </Container>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        getData.length ?
                            <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Restuarant Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData.map((e) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>
                                                                <NavLink to={`/cart/${e.id}`}  onClick={handleClose}>
                                                                    <img src={e.imgdata} alt='' style={{ width: "5rem", height: "5rem" }}   />
                                                                </NavLink>
                                                            </td>
                                                            <td>
                                                                <p>{e.rname}</p>
                                                                <p>Price:₹ {e.price}</p>
                                                                <p>Quantity:{e.qnty}</p>
                                                                <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={()=>dlt(e.id)}>
                                                                    <i className='fas fa-trash smalltrash'></i>
                                                                </p>

                                                            </td>
                                                            <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={()=>dlt(e.id)}>
                                                                <i className='fas fa-trash largetrash'></i>
                                                            </td>
                                                        </tr>
                                                    </>

                                                )
                                            })
                                        }
                                        <p className='text-center'>Total:₹ {price}</p>

                                    </tbody>
                                </Table>

                            </div> :
                            <div className='card_details d-flex justify-content-center align-item-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
                                <i className='fas fa-close smallclose'
                                    onClick={handleClose}
                                    style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                                <p style={{ fontSize: 22, marginTop: "17px" }}>your carts is empty !</p>
                                <img src="https://static.vecteezy.com/system/resources/previews/004/999/463/original/shopping-cart-icon-illustration-free-vector.jpg" alt='cartD' className='emptycart_img' style={{ width: "5rem", padding: 5 }} />
                            </div>
                    }

                </Menu>
            </Navbar>
        </>
    )
}

export default Header