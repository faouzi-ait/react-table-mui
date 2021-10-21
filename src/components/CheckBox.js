import React from "react";

export const Checkbox = React.forwardRef(
  ({ indeterminate, label, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <label style={{ display: "block", margin: '4px 0' }}>
        <input type="checkbox" ref={resolvedRef} {...rest} />
        {label}
      </label>
    );
  }
);
