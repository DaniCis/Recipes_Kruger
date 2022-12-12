import { useDispatch} from "react-redux";
import { startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/Login-Register-Layout.css";

export default function LoginPage() {
	const dispatch = useDispatch();

	const loginSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email").required("Email is required"),
		password: Yup.string()
			.min(6, "Password is too short - Should be 6 chars min.")
			.required("Password is required"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: (data) => {
			let email = data.email;
			let password = data.password;
			dispatch(startLoginWithEmailPassword({ email, password }));
			formik.resetForm();
		},
	});

	return (
		<div className="login__registre">
			<form onSubmit={formik.handleSubmit} className="sign-in-form">
				<div className="login__title">
					<h1 className="font-semibold text-gray-700">Hello Again!</h1>
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
						<span className="text-red-400 flex text-xs ml-6 mt-2" >
							{formik.errors.email}
						</span>
					)}
				</div>
				<div>
					<input
						name="password"
						type="password"
						placeholder="Password"
						defaultValue={formik.values.password}
						onChange={formik.handleChange}
						className = "w-96 sm:w-72 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 max-sm:w-72"
						
					/>
					<div></div>
					{formik.touched.password && formik.errors.password && (
						<span className="text-red-400 flex text-xs ml-6 mt-2">
							{formik.errors.password}
						</span>
					)}
				</div>
				<div >
					<button
						className="
						mt-10 rounded-lg shadow-md shadow-gray-400/50
                        bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-yellow-200 via-yellow-400 to-yellow-700 
                        py-3 px-12 text-lg font-medium capitalize text-gray-100"
						aria-label="login-btn"
						type="submit">
						Login
					</button>
					
				</div>

			</form>
		</div>
	);
}
