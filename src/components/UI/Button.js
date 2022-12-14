import classes from "./Button.module.css"

const Button = ({children, ...rest}) => {
  return <button className={classes.button} {...rest}>{children}</button>;
};

export default Button;
