import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext, IAppState } from "../../context/AppContext";
import { IRegisterInfo } from "../../dto/IRegisterInfo";
import { BaseService } from "../../services/BaseService";
import { IAuth } from "../../types/IAuth";
import { IMessages } from "../../types/IMessages";


export interface IRegisterProps {
    values: IRegisterInfo;
    confirmPassword: string;
    displayPwMatchError: string;
    handleChange: (
        target: HTMLInputElement
    ) => void;
    register: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const RegisterView = (props: IRegisterProps) => {
    return (
        <div className="row">
            <div className="col-sm-1 col-md-3"></div>
            <div className="col-sm-10 col-md-6">
                <form method="post">
                    <h4>Create a new account.</h4>
                    <hr />
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            data-val="true"
                            id="email"
                            name="Input.Email"
                            value={props.values.email} onChange={(e) => props.handleChange(e.target)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="first-name">Firstname</label>
                        <input
                            className="form-control"
                            type="text"
                            data-val="true"
                            id="first-name"
                            minLength={1}
                            maxLength={128}
                            name="Input.Firstname"
                            value={props.values.firstname} onChange={(e) => props.handleChange(e.target)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last-name">Lastname</label>
                        <input
                            className="form-control"
                            type="text"
                            data-val="true"
                            id="last-name"
                            minLength={1}
                            maxLength={128}
                            name="Input.Lastname"
                            value={props.values.lastname} onChange={(e) => props.handleChange(e.target)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone-number">Phone Number</label>
                        <input
                            className="form-control"
                            type="tel"
                            id="phone-number"
                            name="Input.PhoneNumber"
                            value={props.values.phoneNumber} onChange={(e) => props.handleChange(e.target)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            data-val="true"
                            minLength={6}
                            id="password"
                            maxLength={100}
                            name="Input.Password"
                            value={props.values.password} onChange={(e) => props.handleChange(e.target)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="confirm-password"
                            name="Input.ConfirmPassword"
                            value={props.confirmPassword} onChange={(e) => props.handleChange(e.target)}
                        />
                        <span
                            className={"text-danger field-validation-valid " + props.displayPwMatchError} >
                            The password and confirmation password do not
                        match.</span>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => props.register(e)}
                    >
                        Register
                </button>
                </form>
            </div>
            <div className="col-sm-1 col-md-3"></div>
        </div >
    );
}

const initialRegisterValues: IRegisterInfo = {
    email: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    password: '',
};

const Register = () => {
    const appState = useContext(AppContext);
    const [registerValues, setFormValues] = useState(initialRegisterValues);

    const [confirmPw, setConfirmPassword] = useState('');
    const [displayPwError, setDisplayPwError] = useState('d-none');
    const history = useHistory();

    
    const goToHome = () => {
        history.push('/');
    }

    const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(registerValues);
        console.log(confirmPw);
        if (registerValues.password !== confirmPw) {
            setDisplayPwError('d-flex');
            return;
        }
        let result = await BaseService.post<IAuth | IMessages>(registerValues, 'Account/Register');

        if (result.ok && result.data) {
            const newState: IAuth = result.data as IAuth;

            appState.setState(newState, appState.appLang);

            goToHome();

        }
    }
    const handleChange = (target: HTMLInputElement) => {
        if (target.id === 'email') {
            setFormValues({ ...registerValues, email: target.value });
            return;
        }
        if (target.id === 'first-name') {
            setFormValues({ ...registerValues, firstname: target.value });
            return;
        }
        if (target.id === 'last-name') {
            setFormValues({ ...registerValues, lastname: target.value });
            return;
        }

        if (target.id === 'phone-number') {
            setFormValues({ ...registerValues, phoneNumber: target.value });
            return;
        }
        if (target.id === 'password') {
            console.log('pw');
            setFormValues({ ...registerValues, password: target.value });
            return;
        }

        if (target.id === 'confirm-password') {
            setConfirmPassword(target.value);
            return;
        }

        
    }
    return (<RegisterView
                 values={registerValues} 
                 handleChange={handleChange} 
                 register={register} 
                 confirmPassword={confirmPw}
                 displayPwMatchError={displayPwError} />);
        
}

export default Register;