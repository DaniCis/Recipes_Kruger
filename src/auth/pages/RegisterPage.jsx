import { useDispatch } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/Login-Register-Layout.css";


export default function RegisterPage() {
	const dispatch = useDispatch();

	const signupSchema = Yup.object().shape({
		displayName: Yup.string().required("Name is required"),
		email: Yup.string().email("Invalid email").required("Email is required"),
		password: Yup.string()
			.min(6, "Password is too short - Should be 6 chars min.")
			.required("Password is required"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			displayName: "",
		},
		validationSchema: signupSchema,
		onSubmit: (data) => {
			let email = data.email;
			let password = data.password;
			let displayName = data.displayName;
			dispatch(
				startCreatingUserWithEmailPassword({ email, password, displayName })
			);
			formik.resetForm();
			
		},
	});

	return (
		<div>
			<form onSubmit={formik.handleSubmit} className="login__create">
				<div className="mb-4">
					<h1 className="text-xl font-semibold text-gray-700">Create New Account</h1>
				</div>
				<div>
					<input
						name="displayName"
						type="text"
						placeholder="Username"
						defaultValue={formik.values.displayName}
						onChange={formik.handleChange}
						className= "p-3 mt-4 text-base leading-none text-gray-900 bg-gray-100 border border-gray-200 rounded w-96 sm:w-72 focus:oultine-none focus:border-indigo-700 max-sm:w-72"
					/>
					<div></div>
					{formik.touched.displayName && formik.errors.displayName && (
						<span className="flex mt-2 ml-6 text-xs text-red-400">
							{formik.errors.displayName}
						</span>
					)}
				</div>
				<div>
					<input
						name="email"
						type="email"
						placeholder="correo@google.com"
						defaultValue={formik.values.email}
						onChange={formik.handleChange}
						className= "p-3 mt-4 text-base leading-none text-gray-900 bg-gray-100 border border-gray-200 rounded w-96 sm:w-72 focus:oultine-none focus:border-indigo-700 max-sm:w-72"
					/>
					<div></div>
					{formik.touched.email && formik.errors.email && (
						<span className="flex mt-2 ml-6 text-xs text-red-400">
							{formik.errors.email}
						</span>
					)}
				</div>
				<div >
					<input
						name="password"
						type="password"
						placeholder="Password"
						defaultValue={formik.values.password}
						onChange={formik.handleChange}
						className= "p-3 mt-4 text-base leading-none text-gray-900 bg-gray-100 border border-gray-200 rounded w-96 sm:w-72 focus:oultine-none focus:border-indigo-700 max-sm:w-72"
					/>
					<div></div>
					{formik.touched.password && formik.errors.password && (
						<span className="flex mt-2 ml-6 text-xs text-red-400">
							{formik.errors.password}
						</span>
					)}
				</div>
				<div className="">
					<button type="submit" className="px-12 py-3 mt-5 text-lg font-medium text-gray-100 capitalize rounded-lg shadow-md shadow-gray-400/50 bg-gradient-to-r from-rose-400 to-orange-300" value="Sign up">
						Register
					</button>
				</div>
			</form>
		</div>
	);
}
