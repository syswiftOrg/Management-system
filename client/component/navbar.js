import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Router from 'next/router';
import axios from 'axios';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Image from 'next/image';
import Menu from '@mui/material/Menu';
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';


const Navbar =({currentUser})=>{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
  

    const signoutFunc = async () => {
        await axios.post('/api/auth/signout');
        Router.push('/');
    }

    const showpath = () => {
        try
        {
            console.log(Router.pathname);
            return Router.pathname;
        }
        catch{
            return '/';
        }
    }

    const handleTrans = () => {
        Router.push('/trans');
    }

        return (
        <AppBar position="static" style={{backgroundColor:"#001540"}}>
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">   
            <MenuIcon
                    id="menuButton"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}/>
            <Menu 
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <div className="menu">
                    <ListItemButton onClick={handleClose}>库存管理</ListItemButton>
                    <ListItemButton onClick={handleTrans}>周转单管理</ListItemButton>
                </div>
            </Menu>
            </IconButton>
            <Image 
            src="/logo.png"
            alt="logo" 
            width={40} 
            height={40} 
            />
            <Button color="inherit" onClick={()=>{Router.push('/')}}>
            回主页
            </Button>
            <div id="pathname" style={{marginLeft:20,flexGrow:1}}>{/*showpath()*/}</div>
            {!currentUser
            ? <Button color="inherit" onClick={()=>{Router.push('/auth/loginPage')}}>登录</Button>
            : <div/>
            }
            {!currentUser
            ? <Button color="inherit" onClick={()=>{Router.push('/auth/signupPage')}}>注册</Button>
            : <div/>
            }
            {currentUser
            ? <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
            : <div/>
            }
            {currentUser
            ? <Button color="inherit" onClick={signoutFunc}>登出</Button>
            : <div/>
            }
        </Toolbar>
        </AppBar>
        );
}

export default Navbar;
