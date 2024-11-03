import './App.css'
import PropTypes from 'prop-types';

function Button(props){
    const {onClick, children,  id, className}=props;
    return(
        <button 
            onClick={onClick} 
            id={id}
            className={className}
        >
            {children}
        </button>
    )
}
Button.propTypes={
    onClick:PropTypes.func,
    children:PropTypes.string,
    id:PropTypes.string,
    className:PropTypes.string
}
export default Button;