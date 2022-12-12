import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useNavigate} from "react-router-dom"
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";


const Contact = () => {
    const navigate = useNavigate()

    const contactSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email").required("Email is required"),
		title: Yup.string().required('Name is required'),
        phone: Yup.string().required('Phone is required'),
        message: Yup.string().required('Message is required'),
        company: Yup.string().required('Company Name is required'),
	});

    const formik = useFormik({
		initialValues: {
			email: "",
			title:"",
            phone:"",
            message:"",
            company:"",
		},
		validationSchema: contactSchema,
		onSubmit: (data) => {
			Swal.fire({
                title:'Excellent!',
                icon:'success',
                text:'Message sent successfully'
            }).then((result) => {
                if (result.isConfirmed){
			        formik.resetForm();
                    navigate("/home")
                }
            })
		},
	});

    return(
        <>
            <Navbar />
            <div className="w-full flex items-center justify-center my-8">
                <form onSubmit={formik.handleSubmit} className="bg-white shadow rounded-xl border-2 py-8 lg:px-20 px-8">
                    <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">Let’s chat!</p>
                    <div className="md:flex items-center mt-8">
                        <div className="md:w-72 flex flex-col">
                            <label className="text-base font-semibold leading-none text-gray-800">Name</label>
                            <input type="text" name="title" className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" onChange={formik.handleChange}  value={formik.values.title}/>
                            {formik.touched.title && formik.errors.title && (
                                <span className="text-red-400 flex text-xs">
                                    {formik.errors.title}
                                </span>
                            )}
                        </div>
                        <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                            <label className="text-base font-semibold leading-none text-gray-800">Email Address</label>
                            <input type="email" name="email" className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" onChange={formik.handleChange} value={formik.values.email}/>
                            {formik.touched.email && formik.errors.email && (
                                <span className="text-red-400 flex text-xs">
                                    {formik.errors.email}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="md:flex items-center mt-8">
                        <div className="md:w-72 flex flex-col">
                            <label className="text-base font-semibold leading-none text-gray-800">Company name</label>
                            <input type="text" name="company" className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 " onChange={formik.handleChange}  value={formik.values.company}/>
                            {formik.touched.company && formik.errors.company && (
                                <span className="text-red-400 flex text-xs">
                                    {formik.errors.company}
                                </span>
                            )}
                        </div>
                        <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                            <label className="text-base font-semibold leading-none text-gray-800">Phone</label>
                            <input type="text" name="phone" className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" onChange={formik.handleChange}  value={formik.values.phone}/>
                            {formik.touched.phone && formik.errors.phone && (
                                <span className="text-red-400 flex text-xs">
                                    {formik.errors.phone}
                                </span>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="w-full flex flex-col mt-8">
                            <label className="text-base font-semibold leading-none text-gray-800">Message</label>
                            <textarea  type="text" name="message" className="h-24 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none"   value={formik.values.message} onChange={formik.handleChange}/>
                            {formik.touched.message && formik.errors.message && (
                                <span className="text-red-400 flex text-xs">
                                    {formik.errors.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <p className="text-xs leading-3 text-gray-600 mt-4">By clicking submit you agree to our terms of service, privacy policy and how we use data as stated</p>
                    <div className="flex items-center justify-center w-full">
                        <button className="mt-9 btn btn-success" type="submit" onClick={formik.handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Contact;