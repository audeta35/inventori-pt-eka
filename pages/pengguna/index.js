import React, {Component} from 'react';
import DataTable from 'react-data-table-component';
import fetch from 'node-fetch';
import { Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { SupervisedUserCircle } from '@material-ui/icons';

export default class Pengguna extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1,
            isLoading: true,
            isOpenModal: false,
            isSee: false,
            detailUser: null,
            isOpenDetail: false,
            isEdit: true,
            // table record data
            data: [],
            dataFilter: [],
            // table header
            payload: {
                username: "",
                password: "",
                level: null,
            },
            columns: [
                {
                    name: 'Nomor',
                    selector: 'key',
                    sortable: true,
                    cell: (row) => (
                        <b>
                            {row.key + 1}
                        </b>
                    )
                },
                {
                    name: 'Nama Pengguna',
                    selector: 'name',
                    sortable: true,
                    cell: (row) => (
                        <b>
                           {row.name} 
                        </b>
                    )
                },
                {
                    name: 'Level Pengguna',
                    selector: 'level',
                    sortable: true,
                    cell: (row) => (
                        row.level === 1 ? (
                            <Chip icon={<SupervisedUserCircle/>} label="Admin" variant="outlined" />
                       ) : <Chip icon={<SupervisedUserCircle/>} label="Karyawan" />
                    )
                },
                {
                    name: 'Status Pengguna',
                    selector: 'status',
                    sortable: true,
                    cell: (row) => (
                        row.status === 1 ? (
                            <button className="btn-sm btn-block btn-warning text-white border-0">Aktif</button>
                        ) : <Chip label="Blokir" className="bg-secondary text-white" />
                    )
                },
                {
                    name: 'Opsi',
                    selector: 'opsi',
                    sortable: false,
                    cell: (row) => (
                        <button className="btn-xs btn-dark btn-block" onClick={() => this._setIsOpenDetail(row)}>
                            Info Pengguna
                        </button>
                    )
                }
            ],
            // get time, date, month and year
            date: new Date(),
            monthNames: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
            levelUser: [{
                name: "admin",
                value: 1,
            },{
                name: "karyawan",
                value: 0,
            }],
            // boolean show filter modal
            showFilter: false,
            // filter payload
            searchInput: '',
        }
    }

    componentWillMount() {
        this._getAllUser();
    }
    
    async _getAllUser() {
        const url = `http://${window.location.host}/api/users/list`;
        const result = await fetch(url, {
            method: "GET",
        })

        const data = await result.json();

        // this.setState({
        //     data: data.results
        // })

        // for(let i = 0; i < data.results.length; i++) {
        //     this.state.data.push({
        //         key: i,
        //         name: data.results[i].name,
        //         level: data.results[i].level,
        //         status: data.results[i].status,
        //         id_users: data.results[i].id_users,               
        //     })
        // }

        data.results.map((item, index) => {
            this.state.data.push({
                key: index,
                name: item.name,
                level: item.level,
                status: item.status,
                id_users: item.id_user,
            })
        })

        console.log(this.state.data)
        setTimeout(() => {
            this.setState({
                isLoading: false,
            })
        }, 500)
    }

    // function for set percentage value dikonfirmasi and belum_konfirmasi
    _setPercentage = (value, totalValue) => {
        let result = (value / totalValue) * 100;
        return Math.ceil(result);
    }

    async _setIsOpenModal() {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    async _setIsOpenDetail(row) {
        this.setState({
            ...this.state,
            detailUser: row,
            isOpenDetail: !this.state.isOpenDetail
        })

        console.log(row)
    }

    _setIsCloseDetail() {
        this.setState({
            ...this.state,
            isEdit: true,
            detailUser: null,
            isOpenDetail: !this.state.isOpenDetail
        })
    }

    _setIsEdit() {
        this.setState({
            isEdit: !this.state.isEdit,
        })
    }

    _setChange(e, id) {
        this.setState({
            payload : {
                ...this.state.payload,
                [id] : e.target.value
            }
        })
    }

    _setEditForm(e, id) {
        this.setState({
            ...this.state,
            detailUser : {
                ...this.state.detailUser,
                [id] : e.target.value
            }
        })

        console.log(this.state.detailUser)
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                Data Pengguna
                                <button className="float-right btn-xs btn-warning text-white rounded" onClick={() => this._setIsOpenModal()}>
                                    tambah pengguna
                                </button>
                            </div>
                            <div className="card-body text-center container-fluid">
                                {this.state.isLoading ? (
                                    <div className="w-100 py-5">
                                        <CircularProgress className="text-secondary" />
                                        <h6 className="mt-3 text-secondary">
                                            Memuat Data Pengguna...
                                        </h6>
                                    </div>
                                ) : (
                                    <DataTable
                                    key={this.state.number++}
                                    className="table border"
                                    noHeader={true}
                                    columns={this.state.columns}
                                    data={this.state.dataFilter.length === 0 ? this.state.data : this.state.dataFilter}
                                    fixedHeader={false}
                                    pagination={true}
                                    highlightOnHover={true}
                                    paginationRowsPerPageOptions={[25, 50, 75, 100]}
                                />
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                    <Dialog maxWidth="md" fullWidth={true} onClose={() => this._setIsOpenModal()} aria-labelledby="customized-dialog-title" open={this.state.isOpenModal}>
                        <DialogTitle id="customized-dialog-title" onClose={() => this._setIsOpenModal()}>
                        Tambah Pengguna
                        </DialogTitle>
                        <DialogContent dividers>
                            <div className="row">
                                <div className="col-md-4">
                                    <TextField value={this.state.payload.username} type="text" fullWidth={true} id="outlined-basic" label="Nama Pengguna" variant="filled" onChange={(event) => this._setChange(event, "username")} />
                                </div>
                                <div className="col-md-4">
                                    <TextField value={this.state.payload.password} type={this.state.isSee ? "text" : "password"} fullWidth={true} id="outlined-basic" label="Password Pengguna" variant="filled" onChange={(event) => this._setChange(event, "password")} />
                                </div>
                                <div className="col-md-4">
                                    <FormControl variant="filled" fullWidth={true}>
                                        <InputLabel id="level">Level Pengguna</InputLabel>
                                        <Select
                                            id="level"
                                            value={this.state.payload.level}
                                            onChange={(event) => this._setChange(event, "level")}
                                        >
                                            {this.state.levelUser.map((item, index) => (
                                                <MenuItem value={item.value} selected={this.state.payload.level === item.value}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                        <Button autoFocus onClick={() => this._setIsOpenModal()} color="primary">
                            Save changes
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.isOpenDetail}
                        onClose={() => this._setIsCloseDetail()}
                        maxWidth="xs"
                        fullWidth={true}
                    >
                        <DialogTitle id="customized-dialog" onClose={() => this._setIsOpenModal()}>
                            Info Pengguna
                        </DialogTitle>
                        <DialogContent dividers>
                            {this.state.detailUser ? (
                                <div className="row">
                                    <div className="col-md-12 my-1">
                                        <TextField value={this.state.detailUser.name} label="Nama Pengguna" fullWidth={true} type="text" className="text-dark"  disabled={this.state.isEdit} onChange={(e) => this._setEditForm(e, "name")} />
                                    </div>

                                    {this.state.isEdit ? null : (
                                    <div className="col-md-12 my-1">
                                        <TextField value={this.state.detailUser.password} label="Password Baru" fullWidth={true} type="password" className="text-dark" disabled={this.state.isEdit} onChange={(e) => this._setEditForm(e, "password")} />
                                    </div>
                                    )}

                                    <div className="col-md-12 my-1">
                                       <FormControl fullWidth={true} disabled={this.state.isEdit}>
                                           <InputLabel id="leveledit">Level Pengguna</InputLabel>
                                           <Select value={this.state.detailUser.level} onChange={(e) => this._setEditForm(e, "level")}>
                                           {this.state.levelUser.map((item, index) => (
                                                <MenuItem value={item.value} selected={this.state.detailUser.level === item.value}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                           </Select>
                                       </FormControl>
                                    </div>
                                </div>
                            ) : null}
                        </DialogContent>
                        <DialogActions>
                            {this.state.isEdit ? (
                            <>
                                <button onClick={() => this._setIsCloseDetail()} className="btn-sm btn-dark float-left text-white rounded">
                                    tutup
                                </button>
                                <button onClick={() => this._setIsEdit()} className="btn-sm btn-warning text-white rounded">
                                    Ubah
                                </button>
                                <button className="btn-sm btn-danger text-white rounded">
                                    hapus
                                </button>
                            </>
                            ) : (
                            <>
                                <button onClick={() => this._setIsCloseDetail()} className="btn-sm  btn-dark rounded">
                                    batal
                                </button>
                                <button className="btn-sm btn-warning text-white rounded">
                                    simpan
                                </button>
                            </>
                            )}
                        </DialogActions>
                    </Dialog>
                    </div>
                </div>
            </div>
        )
    }
}
