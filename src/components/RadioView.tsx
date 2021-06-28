import { IRadioValues } from "../types/IRadioValues";


const RadioView = (props: {
    radioValues: IRadioValues,
    radioValue: string;
    handleChange: (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => void,
    radioId: string
}) => {

    return (
        <div
            className="row d-flex justify-content-around m-3"
            v-if="radios.organisational"
        >
            <p>{props.radioValues.name}</p>
            <div className="form-group form-check">
                <label className="form-check-label">
                    <input
                        className="form-check-input"
                        type="radio"
                        id={props.radioId + "-radio-pos"}
                        checked={props.radioValue === 'true'}
                        onChange={(e) => props.handleChange(e.target)}
                        value="true"

                    />
                    {props.radioValues.positive}
                </label>
            </div>
            <div className="form-group form-check">
                <label className="form-check-label">
                    <input
                        className="form-check-input"
                        type="radio"
                        id={props.radioId + "-radio-neg"}
                        checked={props.radioValue === 'false'}
                        onChange={(e) => props.handleChange(e.target)}
                        value="false"
                    />
                    {props.radioValues.negative}
                </label>
            </div>
        </div>
    );
}

export default RadioView;