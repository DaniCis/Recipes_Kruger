import { useDispatch} from "react-redux";
import { useState } from "react";
import { startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function LoginPage() {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginSchema = Yup.object().shape({
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
		},
		validationSchema: loginSchema,
		onSubmit: (data) => {
			setEmail(data.email)
			setPassword(data.password)
		  	dispatch(startLoginWithEmailPassword({ email, password }));
		  	formik.resetForm()
		}
	})

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
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
				<button type='submit'>Login</button>
			</form>
		</div>
	);
}
