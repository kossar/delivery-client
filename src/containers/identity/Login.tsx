import { useContext, useState } from "react";
import { AppContext, IAppState } from "../../context/AppContext";
import { ILoginInfo } from "../../dto/ILoginInfo";
import { BaseService } from "../../services/BaseService";
import { IMessages } from "../../types/IMessages";
import { useHistory } from "react-router-dom";
import { IAuth } from "../../types/IAuth";

export interface ILoginProps {
    values: ILoginInfo;
    handleChange: (
        target: HTMLInputElement
    ) => void;
    login: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoginView = (props: ILoginProps) => {
    return (<div className="row">
        <div className="col-sm-1 col-md-3"></div>
        <div className="col-sm-10 col-md-6">
            <form id="account" method="post">
                <h4>Use a local account to log in.</h4>
                <span
                // className="text-danger field-validation-valid ${{error}}"
                ></span>
                <hr />
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        id="email"
                        value={props.values.email} onChange={(e) => props.handleChange(e.target)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        value={props.values.password} onChange={(e) => props.handleChange(e.target)}
                    />
                </div>
                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => props.login(e)}
                    >
                        Log in
                </button>
                </div>
            </form>
        </div>
        <div className="col-sm-1 col-md-3"></div>
    </div>
    );
}

const initialLoginValues: ILoginInfo = {
    email: '',
    password: ''
};

const Login = () => {
    const appState = useContext(AppContext);
    const [loginValues, setFormValues] = useState(initialLoginValues);
    const history = useHistory();
    // const goToPreviousPath = () => {
    //     history.goBack()
    // }

    const goToHome = () => {
        history.push('/');
    }

    const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let result = await BaseService.post<IAuth | IMessages>(loginValues, 'Account/Login');

        if (result.ok && result.data) {
            const newState: IAuth = result.data as IAuth;
            appState.setState(newState, appState.appLang);

            console.log(appState);
            goToHome();

        }
    }

    const handleChange = (target: HTMLInputElement) => {
        if (target.id === 'password') {
            setFormValues({ ...loginValues, password: target.value });
            return;
        }

        if (target.id === 'email') {
            setFormValues({ ...loginValues, email: target.value });
            return;
        }
    }
    return (
        <LoginView values={loginValues} handleChange={handleChange} login={login} />
    )
}

export default Login;