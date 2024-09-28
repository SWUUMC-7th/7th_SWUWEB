import './App.css'
import PropTypes from 'prop-types';

function Input(props){
    const { type, value, onChange, id } = props;
    return(
        <input 
            type={type} 
            value={value} 
            onChange={onChange}
            id={id}
        />
    )
}
Input.propTypes={
    type:PropTypes.string,
    value:PropTypes.string,
    onChange:PropTypes.func,
    id:PropTypes.number,
}
export default Input;