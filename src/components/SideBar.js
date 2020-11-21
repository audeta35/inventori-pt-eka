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

export default function SideBar(props) {

    const handleDrawerClose = async () => {
       props.handleDrawerClose();
    };

    const path = props.path;
    console.log(path);

    const menu = [{
        path : '/dashboard',
        name : 'Dashboard',
        icon : <DashboardOutlined />,
        submenu : null,
    },{
        path : '#',
        name : 'Stok Barang',
        icon : <DataUsageOutlined />,
        submenu : null,
    },{
        path : '#',
        name : 'Keuangan',
        icon : <LocalAtmOutlined />,
        submenu : null,
    },{
        path : '#',
        name : 'Rekap Data',
        icon : <ArchiveOutlined />,
        submenu : null,
    },{
        path : '#',
        name : 'Pengguna',
        icon : <PeopleAltOutlined />,
        submenu : null,
    },{
        path : '#',
        name : 'Backup Sistem',
        icon : <DesktopWindowsOutlined />,
        submenu : null,
    },{
        path : '#',
        name : 'Konfigurasi',
        icon : <SettingsOutlined />,
        submenu : null,
    },
    {
        path : '#',
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
                    <ListItem button key={index} className={data.path === path ? "text-primary" : null}>
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
