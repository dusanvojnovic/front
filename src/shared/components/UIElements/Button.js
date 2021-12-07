import './Button.css';

const Button = (props) => {
  return (
    <button
      className={props.class ? `${props.class} button` : 'button'}
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
