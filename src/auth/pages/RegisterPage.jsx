import { useState } from "react";
import { useDispatch } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function RegisterPage() {
	const dispatch = useDispatch();

	const signupSchema = Yup.object().shape({
		displayName: Yup.string()
			.required('Name is required'),
		email: Yup.string()
			.email('Invalid email')
			.required('Email is required'),
		password: Yup.string()
			.min(6, "Password is too short - Should be 6 chars min.")
			.required('Password is required'),
	});

	const formik = useFormik({
		initialValues: {
		  email: '',
		  password:'',
		  displayName:''
		},
		validationSchema: signupSchema,
		onSubmit: (data) => {
			let email = data.email;
			let password = data.password;
			let displayName = data.displayName;
			dispatch( startCreatingUserWithEmailPassword({ email, password, displayName }))
		  	formik.resetForm()
		}
	})

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<input
					name="displayName"
					type="text"
					placeholder="Complete Name"
					defaultValue={formik.values.displayName}
					onChange={formik.handleChange}
				/>
				{formik.touched.displayName && formik.errors.displayName && (
					<span>{formik.errors.displayName}</span>
				)}
				<input
					name="email"
					type="email"
					placeholder="correo@google.com"
					defaultValue={formik.values.email}
					onChange={formik.handleChange}
				/>
				{formik.touched.email && formik.errors.email && (
					<span>{formik.errors.email}</span>
				)}
				<input
					name="password"
					type="password"
					placeholder="Contraseña"
					defaultValue={formik.values.password}
					onChange={formik.handleChange}
				/>
				{formik.touched.password && formik.errors.password && (
					<span>{formik.errors.password}</span>
				)}
				<button type="submit">Register</button>
			</form>
		</div>
	);
}
