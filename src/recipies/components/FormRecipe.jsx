import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { v4 as uuid} from 'uuid'
import * as Yup from 'yup';

const FormRecipe = ({titleForm, titleBtn, onAction}) =>{

    const [image,setImage] = useState('')
    const navigate = useNavigate();

    const createSchema = Yup.object().shape({
		title: Yup.string().required('Title is required'),
        author: Yup.string().required('Author is required'),
        ingredients: Yup.string().required('Ingredients are required'),
        servings: Yup.number().min(1).required('Serving is required'),
        cuisineType: Yup.string().required('Cuisine type is required'),
        mealType: Yup.string().required('Meal type is required'),
        calories: Yup.number().min(1).required('Calories are required'),
	});

    const handleChangeFile = (e) =>{
        const element = e.target
        const file = element.files[0]
        const reader = new FileReader()     
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImage(reader.result.toString())
        }
    }

    const formik = useFormik({
		initialValues: {
            title:'',
            author:'',
            ingredients:'',
            servings: 0,
            cuisineType:'',
            mealType:'',
            calories:0,
        },
		validationSchema: createSchema,
		onSubmit: (data) => {
            const newRecipe = {
                id: uuid(),
                title: data.title,
                author:data.author,
                servings:data.servings,
                ingredients:data.ingredients.split(','),
                calories:data.calories,
                cuisineType:data.cuisineType,
                mealType:data.mealType,
                image,
            }
            onAction(newRecipe)
		  	formik.resetForm()
		}
	})

    return(
        <div className="bg-cover bg-[url('https://rb.gy/jkbuwh')] pt-8 pb-2">
            <form noValidate onSubmit={formik.handleSubmit} className=" card bg-white border border-gray-300 shadow-lg mx-6 sm:mx-12 md:mx-24 lg:mx-42 xl:mx-60 mb-8">
                <h3 className='md:text-2xl text-xl capitalize leading-7 font-bold text-center text-gray-700 mt-4'>{titleForm}</h3>
                <div className="card md:card-side ">
                    <div className='sm:w-1/2 mx-12 xl:ml-24 mt-6 md:mb-6' >
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Title</span>
                            </label>
                            <input type="text" name="title" className="input input-bordered input-sm w-full max-w-xs bg-gray-100" 
                            onChange={formik.handleChange} value={formik.values.title} required />
                            <label className="label">
                                {formik.touched.title && formik.errors.title && (
                                    <span className="label-text-alt font-semibold text-red-500">{formik.errors.title}</span>
                                )}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Author</span>
                            </label>
                            <input type="text" name="author" className="input input-bordered input-sm w-full max-w-xs bg-gray-100"
                            onChange={formik.handleChange} value={formik.values.author} required />
                            <label className="label">
                                {formik.touched.author && formik.errors.author && (
                                    <span className="label-text-alt font-semibold text-red-500">{formik.errors.author}</span>
                                )}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Cuisine Type</span>
                            </label>
                            <input type="text" name="cuisineType" className="input input-bordered input-sm w-full max-w-xs bg-gray-100"
                            onChange={formik.handleChange} value={formik.values.cuisineType} required />
                            <label className="label">
                                {formik.touched.cuisineType && formik.errors.cuisineType && (
                                    <span className="label-text-alt font-semibold text-red-500">{formik.errors.cuisineType}</span>
                                )}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Meal Type</span>
                            </label>
                            <input type="text" name="mealType" className="input input-bordered input-sm w-full max-w-xs bg-gray-100"
                            onChange={formik.handleChange} value={formik.values.mealType} required />
                            <label className="label">
                                {formik.touched.mealType && formik.errors.mealType && (
                                    <span className="label-text-alt font-semibold text-red-500">{formik.errors.mealType}</span>
                                )}
                            </label>
                        </div> 
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">List of Ingredients</span>
                            </label>
                            <textarea name="ingredients" className="textarea textarea-bordered bg-gray-100"
                            onChange={formik.handleChange} value={formik.values.ingredients} placeholder="List ingredients separeted by ','" required />
                            <label className="label">
                                {formik.touched.ingredients && formik.errors.ingredients && (
                                    <span className="label-text-alt font-semibold text-red-500">{formik.errors.ingredients}</span>
                                )}
                            </label>
                        </div>          
                    </div>
                    <div className='sm:w-1/2 mx-12 xl:mr-24 mb-6 md:mt-6'>
                        <div className='md:flex md:flex-row'>
                            <div className="form-control w-5/12 max-w-xs md:mr-8">
                                <label className="label">
                                    <span className="label-text font-semibold">Servings</span>
                                </label>
                                <input type="number" name="servings" className="input input-bordered input-sm w-full max-w-xs bg-gray-100"
                                onChange={formik.handleChange} value={formik.values.servings} min={1} required />
                                <label className="label">
                                    {formik.touched.servings && formik.errors.servings && (
                                        <span className="label-text-alt font-semibold text-red-500">{formik.errors.servings}</span>
                                    )}
                                </label>
                            </div>
                            <div className="form-control w-5/12 max-w-xs">
                                <label className="label">
                                    <span className="label-text font-semibold">Calories</span>
                                </label>
                                <input type="number" name="calories" className="input input-bordered input-sm w-full max-w-xs bg-gray-100"
                                onChange={formik.handleChange} value={formik.values.calories} min={1} required/>
                                <label className="label">
                                    {formik.touched.calories && formik.errors.calories && (
                                        <span className="label-text-alt font-semibold text-red-500">{formik.errors.calories}</span>
                                    )}
                                </label>
                            </div>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">Image</span>
                            </label>
                            <input type="file" name="image" className="file-input file-input-bordered file-input-success file-input-sm w-full max-w-xs bg-gray-100"
                            onChange={handleChangeFile} required={!image} />
                            <div className="mt-5 flex justify-content">
                                { !!image 
                                    ? <img className="w-3/5 h-auto" src={image} alt="preview" />
                                    : (
                                        <div className="h-52 w-48 bg-zinc-200">
                                            <div className="h-44 w-40 bg-zinc-300 m-4 border-dashed border-2">
                                                <p className='text-center text-sm mt-16'>Image</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className='flex justify-end '>
                            <button className="btn btn-success w-32 mt-6" type='submit'>{titleBtn}</button>
                            <button className="btn btn-info w-32 mt-6 ml-2" onClick={() => navigate('/recipeBook') }>Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormRecipe;