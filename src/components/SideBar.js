import React, { Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { CssBaseline, Tooltip } from '@material-ui/core';
import { ArchiveOutlined, DashboardOutlined, DataUsageOutlined, DesktopWindowsOutlined, ExitToAppOutlined, LocalAtmOutlined, PeopleAltOutlined, SettingsOutlined } from '@material-ui/icons';
import { useRouter } from 'next/router'

export default function SideBar(props) {
    const router = useRouter()

    const navigation = async (path) => {
        router.push(path);
    }

    const handleDrawerClose = async () => {
       props.handleDrawerClose();
    };

    const path = window.location.pathname;
    console.log(path);

    const menu = [{
        path : '/',
        name : 'Dashboard',
        icon : <DashboardOutlined />,
        submenu : null,
    },{
        path : '/stok',
        name : 'Stok Barang',
        icon : <DataUsageOutlined />,
        submenu : null,
    },{
        path : '/keuangan',
        name : 'Keuangan',
        icon : <LocalAtmOutlined />,
        submenu : null,
    },{
        path : '/rekap',
        name : 'Rekap Data',
        icon : <ArchiveOutlined />,
        submenu : null,
    },{
        path : '/pengguna',
        name : 'Pengguna',
        icon : <PeopleAltOutlined />,
        submenu : null,
    },{
        path : '/backup',
        name : 'Backup Sistem',
        icon : <DesktopWindowsOutlined />,
        submenu : null,
    },{
        path : '/konfigurasi',
        name : 'Konfigurasi',
        icon : <SettingsOutlined />,
        submenu : null,
    },
    {
        path : '/auth/login',
        name : 'Keluar',
        icon : <ExitToAppOutlined />,
        submenu : null,
    },]

    return (
        <Fragment>
        {/* sidebar */}
        <Drawer
            variant="permanent"
            className={clsx(props.classes.drawer, {
            [props.classes.drawerOpen]: props.open,
            [props.classes.drawerClose]: !props.open,
            })}
            classes={{
            paper: clsx({
                [props.classes.drawerOpen]: props.open,
                [props.classes.drawerClose]: !props.open,
            }),
            }}
        >
            <div className={props.classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
                {props.theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            
            </div>
            <List>
            {menu.map((data, index) => (
                    <ListItem button onClick={() => navigation(data.path)} key={index} className={data.path === path ? "bg-info" : null}>
                        <ListItemIcon>
                            <Tooltip title={data.name}>
                                {data.icon}
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary={data.name} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
        {/* sidebar */}
        </Fragment>
    );
}
