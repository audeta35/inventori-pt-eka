import { CircularProgress, Fade, FormControl, InputLabel, Slide, TextField } from '@material-ui/core';
import fetch from 'node-fetch';
import React, { Component } from 'react'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            showPass: false,
            isLoading: false,
            payload: {
                username: "",
                password: "",
            }
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isReady: true
            })
        }, 1500)
    }

    _setChange(e, id) {
        this.setState({
            payload: {
                ...this.state.payload,
                [id] : e.target.value
            }
        })
    }

    async _submitChange() {
        this.setState({isLoading: true})
        const url = `http://${window.location.host}/api/users/login`;
        const result = await fetch(url, {
            method: "POST",
            body: JSON.stringify(this.state.payload),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        const data = await result.json()
        if(data) {this.setState({isLoading: false})}
        console.log("balikan :", data);
    }

    render() {
        return (
             <div className="bg-warning" style={{position: 'fixed', width: '100%', height: '100%', }}>
                  <div className="row align-items-center h-100">
                      <div className="col-md-4 col-sm-7 col-9 justify-content-center text-center mx-auto">
                          {this.state.isReady ? (
                            <Slide direction="up" in={this.state.isReady}>
                                <div className="card bg-white shadow-lg">
                                    <div className="card-body">
                                        <div className="row">
                                            <img src='/static/UI/assets/logo.png' className="ml-3 text-center" width={120} />
                                            <div className="col-md-12 my-2">
                                                <TextField value={this.state.payload.username} fullWidth label="NAMA PENGGUNA" variant="filled" onChange={(e) => this._setChange(e, "username")} type="text" />
                                            </div>
                                            <div className="col-md-12 my-2">
                                                <TextField value={this.state.payload.password} fullWidth label="PASSWORD PENGGUNA" variant="filled" onChange={(e) => this._setChange(e, "password")} type={this.state.showPass ? "text" : "password" } />
                                                <small onMouseEnter={() => {this.setState({showPass: true})}} onMouseOut={() => {this.setState({showPass: false})}} className="float-right" className="float-right text-secondary" style={{cursor: "pointer"}}>
                                                    {this.state.showPass ? "hide " : "show "}
                                                    password
                                                </small>
                                            </div>
                                            <div className="col-md-12 my-2">
                                                <button type="submit" className="btn btn-block btn-outline-warning" onClick={() => this._submitChange()}>
                                                    {this.state.isLoading ? "Proses..." : "MASUK"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Slide>
                          ) : (
                            <>
                            <img src='/static/UI/assets/logo.png' width={250} />
                            <h3 className="text-white text-uppercase">
                              Sistem Informasi Barang
                            </h3>
                            </>
                          )}
                      </div>
                  </div>
              </div>
        )
    }
}
