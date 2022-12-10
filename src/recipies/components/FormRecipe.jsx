import { useState } from 'react'
import { useFormik } from 'formik';
import { v4 as uuid} from 'uuid'
import * as Yup from 'yup';

const FormRecipe = ({titleForm, titleBtn, onAction}) =>{

    const [image,setImage] = useState('')

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
                ingredients:data.ingredients,
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
        <form onSubmit={formik.handleSubmit}>
            <h3>{titleForm}</h3>
            <div>
                <label>Title</label>
                <input type="text" name="title" onChange={formik.handleChange} value={formik.values.title} required />
                {formik.touched.title && formik.errors.title && (
                    <span>{formik.errors.title}</span>
                )}
            </div>
            <div>
                <label>Author</label>
                <input type="text" name="author" onChange={formik.handleChange} value={formik.values.author} required />
                {formik.touched.author && formik.errors.author && (
                    <span>{formik.errors.author}</span>
                )}
            </div>
            <div>
                <label>Serving</label>
                <input type="number" name="servings" onChange={formik.handleChange} value={formik.values.servings} required />
                {formik.touched.servings && formik.errors.servings && (
                    <span>{formik.errors.servings}</span>
                )}
            </div>
            <div>
                <label>Cuisine Type</label>
                <input type="text" name="cuisineType" onChange={formik.handleChange} value={formik.values.cuisineType} required />
                {formik.touched.cuisineType && formik.errors.cuisineType && (
                    <span>{formik.errors.cuisineType}</span>
                )}
            </div>
            <div>
                <label>Meal Type</label>
                <input type="text" name="mealType" onChange={formik.handleChange} value={formik.values.mealType} required />
                {formik.touched.mealType && formik.errors.mealType && (
                    <span>{formik.errors.mealType}</span>
                )}
            </div>
            <div>
                <label>Total Calories</label>
                <input type="number" name="calories" onChange={formik.handleChange} value={formik.values.calories}  required/>
                {formik.touched.calories && formik.errors.calories && (
                    <span>{formik.errors.calories}</span>
                )}
            </div>
            <div>
                <label>Ingredients</label>
                <input type="textarea" name="ingredients" onChange={formik.handleChange} value={formik.values.ingredients} required />
                {formik.touched.ingredients && formik.errors.ingredients && (
                    <span>{formik.errors.ingredients}</span>
                )}
            </div>
            <div>
                <label>Image</label>
                <input type="file" name="image" onChange={handleChangeFile} required={!image} />
                <div >
                    { !!image 
                        && <img src={image} alt="preview" />
                    }
                </div>
            </div>
            
            <button type='submit'>{titleBtn}</button>
        </form>
    )
}

export default FormRecipe;