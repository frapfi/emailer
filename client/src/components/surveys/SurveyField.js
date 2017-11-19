//Survey Field contains logic to render a single label and text input
import React from 'react';

//reduxForm adds a many props to the field components
//props.input
export default ({ input, label, meta: { error, touched } }) => {
	//console.log(props);

	//mata object: all relevant field specific data
	//meta object also contains the a specific erroro property that was matched up
	//by Redux Form (field name === error.name )
	//console.log(meta);

	//{...input} === onBlur={input.onBlur} onChange={input.onChange}
	//if touched (user has touched the input field) is true show the error
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
};
