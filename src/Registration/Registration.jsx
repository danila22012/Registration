import React, { Component } from 'react';
import styles from './styles.scss';
import InputMask from "react-input-mask";
import { CSSTransition } from "react-transition-group";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";

import FormControlLabel from "@material-ui/core/FormControlLabel";

const UserState = {
    key: 0,
    userName: "",
    userGender: "",
    userCreditCard: "",
    withLoyaltyProgram: false,
    userCoupon: "",
    timeStamp: new Date(),

    formToSend: true,
    timeToSend: 300,
}


class Registration extends Component {

    state = { ...UserState };

    handleChange = (e) => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
        console.log(this.state);
    };
    handleSubmit = () => {

        this.validateSubmit()

        this.props.addUser(this.state);
        this.setState(UserState);
        console.log(this.state);


        this.setState({ formToSend: false }) //переключаю стейт для анимации формы
        setTimeout(() => {
            this.setState({ formToSend: true })
        }, this.state.timeToSend);



    };
    changeSwitch = () =>{
        if (this.state.withLoyaltyProgram) this.setState({withLoyaltyProgram: false})
        else this.setState({withLoyaltyProgram: true})
    }
    validateSubmit = ()=>{

        if (this.state.userName.length === 0) {
            alert('UserName should be written')
            return
        }
        if (this.state.userGender === "") {
            alert('Putting down a gender is necessarily')
            return
        }
        if ([...this.state.userCreditCard].filter(el => el !== " " && el !== "_" ? true : false).length < 16) {
            alert('Error, put down a user card is necessarily')
            return
        }
        this.handleSubmit()
    }
    validateInput = (e) => {

        
        let target = e.target
        let value = target.value
        let name = target.name
        const nameRegExp = /^[a-zA-Z\-]+$/;

        let state;
        console.log(name);
        
       if(name === 'userName'){
          let valid = value.match(nameRegExp)
          console.log(valid)
          if(valid === null){
            alert("Your first name is not valid. Only characters A-Z, a-z and '-' are  acceptable.");
            return
          }
        } 
        else if(name ==='userGender'){
            console.log(value)
            if (value == 0) {
                alert('Putting down a gender is necessarily')
                return
            }
        }
        else if(name ==='userCreditCard'){
            
            if ([...value].filter(el => el !== " " && el !== "_" ? true : false).length < 16) {
                alert('Invalid user credit card')
                return
            }
        }
            

    }


    render() {
        return (
            <CSSTransition
                in={this.state.formToSend}
                timeout={this.state.timeToSend}
                mountOnEnter={true}
                classNames='form'
                unmountOnExit={true}
            >



                <div className="Registration-Form">
                    <label className="Registration-Form__Item">
                        Enter your name
                            <InputMask
                            
                            type="text"
                            className="Registration-Form__Input"
                            value={this.state.userName}
                            name="userName"
                            onChange={this.handleChange} 
                            onBlur={this.validateInput}/>
                    </label>



                    <label className="Registration-Form__Item">
                        Enter your gender

                        <FormControl className={'Select-form'}>
                            <Select 
                            className={'Select-form__Select'} 
                            onChange={this.handleChange} 
                            onBlur={this.validateInput}
                            value={this.state.userGender} 
                            name="userGender">
                                <MenuItem  value="0">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>

                            </Select>
                        </FormControl>
                    </label>



                    <label className="Registration-Form__Item">
                        Enter your credit card
                            <InputMask
                            mask="9999 9999 9999 9999"
                            className="Registration-Form__Input"
                            type="text"
                            value={this.state.userCreditCard}
                            name="userCreditCard"

                            onChange={this.handleChange} 
                            onBlur={this.validateInput}/>
                            
                    </label>
                    <FormGroup className="Registration-Form__Item">
                        <FormControlLabel
                            
                            label="Loyalty program"
                            control={<Switch
                                color="secondary"
                                labelPlacement="start"
                                onChange={this.changeSwitch}
                                value={this.state.userCoupon} 
                                />}

                        />
                    </FormGroup>

                   

                    <CSSTransition
                        in={this.state.withLoyaltyProgram}
                        timeout={300}
                        mountOnEnter={true}
                        classNames='coupon'
                        unmountOnExit={true}
                    >

                        <label className="Registration-Form__Item">
                            Coupon
                                <input
                                className="Registration-Form__Input"
                                type="text"
                                value={this.state.userCoupon}
                                name="userCoupon"
                                onChange={this.handleChange}
                            />
                        </label>

                    </CSSTransition>
                    <button className="Registration-Form__Button" onClick={this.validateSubmit}>submit </button>

                </div>
            </CSSTransition>
        )
    }

}
export default Registration;