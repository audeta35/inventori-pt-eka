import React, {Component} from 'react';
import DataTable from 'react-data-table-component';
import fetch from 'node-fetch';
import { Chip, CircularProgress } from '@material-ui/core';
import { SupervisedUserCircle } from '@material-ui/icons';

export default class Pengguna extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1,
            isLoading: true,
            // table record data
            data: [],
            dataFilter: [],
            // table header
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
                        <div>
                            {row.level === 1 ? (
                                 <Chip icon={<SupervisedUserCircle/>} label="Admin" variant="outlined" />
                            ) : <Chip icon={<SupervisedUserCircle/>} label="Karyawan" className="bg-warning" /> }
                        </div>
                    )
                },
                {
                    name: 'Status Pengguna',
                    selector: 'status',
                    sortable: true,
                    cell: (row) => (
                        <div>
                            {row.status === 1 ? (
                                <Chip label="Aktif" className="bg-success text-white" />
                            ) : <Chip label="Blokir" className="bg-danger text-white" /> }
                        </div>
                    )
                }
            ],
            // get time, date, month and year
            date: new Date(),
            monthNames: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
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
                id_users: item.id_users,
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

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg-warning text-white">
                                Data Pengguna
                            </div>
                            <div className="card-body text-center container-fluid">
                                {this.state.isLoading ? (
                                    <CircularProgress className="py-5 text-warning" />
                                ) : (
                                    <DataTable
                                    key={this.state.number++}
                                    className="table border"
                                    noHeader={true}
                                    columns={this.state.columns}
                                    data={this.state.dataFilter.length === 0 ? this.state.data : this.state.dataFilter}
                                    Clicked={true}
                                    fixedHeader={false}
                                    pagination={true}
                                    Selected={this._handleChangeRowTable}
                                    pointerOnHover={true}
                                    highlightOnHover={true}
                                    paginationRowsPerPageOptions={[25, 50, 75, 100]}
                                />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
