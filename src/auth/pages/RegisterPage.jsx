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
					<h1 className="font-semibold text-xl text-gray-700">Create New Account</h1>
				</div>
				<div>
					<input
						name="displayName"
						type="text"
						placeholder="Username"
						defaultValue={formik.values.displayName}
						onChange={formik.handleChange}
						className= "w-96 sm:w-72 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 max-sm:w-72"
					/>
					<div></div>
					{formik.touched.displayName && formik.errors.displayName && (
						<span className="text-red-400 flex text-xs ml-6 mt-2">
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
						className= "w-96 sm:w-72 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 max-sm:w-72"
					/>
					<div></div>
					{formik.touched.email && formik.errors.email && (
						<span className="text-red-400 flex text-xs ml-6 mt-2">
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
						className= "w-96 sm:w-72 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 max-sm:w-72"
					/>
					<div></div>
					{formik.touched.password && formik.errors.password && (
						<span className="text-red-400 flex text-xs ml-6 mt-2">
							{formik.errors.password}
						</span>
					)}
				</div>
				<div className="">
					<button type="submit" className="
						mt-5 rounded-lg shadow-md shadow-gray-400/50
                        bg-gradient-to-r from-rose-400 to-orange-300
                        py-3 px-12 text-lg font-medium capitalize text-gray-100" value="Sign up">
						Register
					</button>
				</div>
			</form>
		</div>
	);
}
