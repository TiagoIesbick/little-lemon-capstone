import * as React from "react";


export const RadioGroup = ({ onChange, selected, children }) => {
    // Use React.Children.map and React.cloneElement to clone the children
    // and pass the correct props to each RadioOption
    const RadioOptions = React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        onChange,
        checked: child.props.value === selected,
      });
    });

    return <div className="RadioGroup form-control">{RadioOptions}</div>;
  };

  export const RadioOption = ({ value, checked, onChange, children }) => {
    // Hook up the onChange handler to call the onChange prop passed to RadioGroup
    // Also, make sure to pass the correct checked prop to the input element
    return (
      <div className="RadioOption">
        <label htmlFor={value}>
        <input
          id={value}
          type="radio"
          name={value}
          onChange={(e) => {onChange(e.target.value)}}
          value={value}
          checked={checked}
          />
          {children}
        </label>
      </div>
    );
  };
