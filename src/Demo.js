import React, { Component } from 'react'

class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            goHome: false,
            goMembers: false,
            members: [
                {
                    fname: "SaketTour",
                    lname: "Monster",
                    address: "",
                    message: "Hi, this is Saket, i have a black audi",
                    car: "Audi",
                    profilePic: "",
                    idPic: ""
                },
                {
                    fname: "Flint",
                    lname: "Monster",
                    address: "",
                    message: "Hi, this is Flint, i have a black tesla",
                    car: "Tesla",
                    profilePic: "",
                    idPic: ""
                },
                {
                    fname: "Piet",
                    lname: "P",
                    address: "",
                    message: "Hi, this is Piet, i have a Ferrari !!",
                    car: "Ferrari",
                    profilePic: "",
                    idPic: ""
                }
            ],
            clicked: {
                fname: ""
            }

        }
    }

    componentDidMount() {
        this.setState({ goHome: true })
    }


    Home = () => {
        return (
            <div>
                Home Content
                <button onClick={() => this.setState({ goMembers: true, goHome: false })}>Members</button>
            </div>
        )
    }

    renderMember = (member, i) => {
        const invest = this.state.clicked.fname === member.fname ? true : false
        let memberRows = [
            <tr key={i} onClick={() => this.setState({ clicked: member })}>
                <td> {i + 1} </td>
                <td> {member.fname}, {member.lname}</td>
                <td> {member.car} </td>
            </tr>
        ]

        if (invest) {
            memberRows.push(
                <tr key={'invest-' + i}>
                    <td>{member.message}</td>
                    <td><button onClick={() => this.setState({goInvest: true, goHome: false, goAddMember: false, goMembers: false})}>Invest</button></td>
                </tr>
            )
        }

        return memberRows
    }

    addMember = () => {
        return (
            <div>
                This is Add Member Content
                <button onClick={() => this.setState({ goHome: true, goAddMember: false, goMembers: false })}>Home</button>
            </div>
        )
    }
    Members = () => {

        return (
            <div>
                <h3>Members</h3>
                <table style={{ "width": "100%" }}>
                    <tbody>
                        <tr>
                            <th>Nr</th>
                            <th>Members</th>
                            <th>Car</th>
                        </tr>
                        {
                            this.state.members.map((member, i) => {
                                return this.renderMember(member, i)
                            })
                        }
                    </tbody>
                </table>
                <button onClick={() => this.setState({ goAddMember: true, goHome: false, goMembers: false })}>Add Me</button>
                <button onClick={() => this.setState({ goHome: true, goMembers: false })}>Home</button>
            </div>)
    }

    invest = () => {
        return (
            <div>
                <div>
                <h5>Total Raised: </h5>
                </div>
                <div>
                <h5>My Account: </h5>
                </div>
                <div>
                <h5>Invest in ETH: </h5>
                </div>
                <button onClick={() => this.setState({ goMembers: true, goInvest:false, goHome: false })}>Members</button>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.goHome && this.Home()}
                {this.state.goMembers && this.Members()}
                {this.state.goAddMember && this.addMember()}
                {this.state.goInvest && this.invest()}
            </div>
        )
    }
}

export default Demo