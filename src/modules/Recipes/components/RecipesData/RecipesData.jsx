import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getAllCategories } from "../../../../api/modules/categories";
import { getAllTags } from "../../../../api/modules/Tags";
import LightHeader from "../../../Shared/components/LightHeader/LightHeader";
import { FaCloudUploadAlt, FaFileImage } from "react-icons/fa";
import {
  createRecipe,
  updateRecipeById,
} from "../../../../api/modules/Recipes";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RecipesData() {
  // get categories
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const response = await getAllCategories();

      const data = response?.data;
      setCategories(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  //---------------------------------------
  // get Tags
  const [Tags, setTags] = useState([]);
  const getTags = async () => {
    try {
      const response = await getAllTags();
      // const data = response?.data;
      setTags(response);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  //----------------------------------------
  // all function of adding recipe
  const [isAdding, setIsAdding] = useState(false);
  // useForm for add recipe
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  // adding Recipe >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // convert data from body to formData
  const appendFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);

    if (data.recipeImage && data.recipeImage.length > 0) {
      formData.append("recipeImage", data.recipeImage[0]);
    }
    return formData;
  };
  //  function Add recipe
  const addRecipe = async (data) => {
    setIsAdding(true);
    let recipeData = appendFormData(data);

    try {
      if (isEditMode) {
        await updateRecipeById(state.recipeData.id, recipeData);
        toast.success("Updated Successfully");
      } else {
        await createRecipe(recipeData);
        toast.success("Added Successfully");
      }
      navigate("/dashboard/recipes");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding recipe");
    } finally {
      setIsAdding(false);
    }
  };
  //-----------------------------------
  // handel upload images
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };
  
  //------ handel update recipe
  const { state } = useLocation();
  const navigate = useNavigate();
  const isEditMode = state?.isUpdate;

  // useEffect for update
  useEffect(() => {
    if (isEditMode && state?.recipeData && categories.length > 0) {
      const { recipeData } = state;

      setValue("name", recipeData.name);
      setValue("price", recipeData.price);
      setValue("description", recipeData.description);
      setValue("tagId", recipeData.tag?.id);
      setValue("categoriesIds", String(recipeData.category[0]?.id));
    }
  }, [isEditMode, state, categories]);

  
  //-----------

  useEffect(() => {
    getCategories();
    getTags();
  }, []);
  return (
    <>
      <LightHeader Fill={isEditMode ? "Edit " : "Add "} />

      <div className="d-flex justify-content-center my-5">
        <Form className="col-md-8" onSubmit={handleSubmit(addRecipe)}>
          <fieldset>
            <Form.Group className="mb-3 ">
              <Form.Control
                {...register("name", { required: "Name is required" })}
                placeholder="Recipe Name"
                className="fw-semibold "
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </Form.Group>
            {/* ----- */}
            <Form.Group className="mb-3">
              <Form.Select
                {...register("tagId", { required: "Tag Id  is required" })}
                className="fw-semibold "
              >
                
                <option value="">Choose Tag...</option>
                {Tags.map((tag) => (
                  <option key={tag.id} value={tag?.id}>
                    {tag?.name}
                  </option>
                ))}
              </Form.Select>
              {errors.tagId && (
                <p className="text-danger">{errors.tagId.message}</p>
              )}
            </Form.Group>
            {/* ----- */}
            <Form.Group className="mb-3">
              <Form.Control
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 1,
                    message: "Price must be at least 1",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter a valid positive number",
                    },
                  },
                })}
                className="fw-semibold "
                placeholder="Price"
              />
              {errors.price && (
                <p className="text-danger">{errors.price.message}</p>
              )}
            </Form.Group>
            {/* ----- */}
            <Form.Group className="mb-3">
              <Form.Select
                {...register("categoriesIds", {
                  required: "Categories Id is required",
                })}
                className="fw-semibold"
              >
                <option>Choose Category...</option>
                {categories.map((category) => (
                  <option key={category.id} value={String(category.id)}>
                    {category?.name}
                  </option>
                ))}
              </Form.Select>
              {errors.categoriesIds && (
                <p className="text-danger">{errors.categoriesIds.message}</p>
              )}
            </Form.Group>
            {/* ----- */}
            <FloatingLabel controlId="floatingTextarea2" label="Description *">
              <Form.Control
                className="fw-semibold "
                as="textarea"
                placeholder="Leave a comment here"
                {...register("description", {
                  required: "Description Id is required",
                })}
              />
              {errors.description && (
                <p className="text-danger">{errors.description.message}</p>
              )}
            </FloatingLabel>
            {/* ----- */}
            {/* show old image */}
            {isEditMode && state?.recipeData?.imagePath && !fileName && (
              <div className="my-3 text-center">
                <img 
                  src={`https://upskilling-egypt.com:3006/${state.recipeData.imagePath}`}
                  alt="recipe"
                  className="update-image"
                  
                />
              </div>
            )}
            <Form.Group className="my-4">
              <label htmlFor="file-upload" className="custom-file-upload">
                <div className="upload-content">
                  {fileName ? (
                    <FaFileImage size={30} className="text-success" />
                  ) : (
                    <FaCloudUploadAlt size={30} />
                  )}
                  <p>
                    Drag & Drop or
                    <span className="highlight"> Choose a Item Image </span> to
                    Upload
                  </p>
                </div>
                <Form.Control
                  id="file-upload"
                  type="file"
                  className="d-none"
                  {...register("recipeImage", {
                    onChange: (e) => handleFileChange(e),
                  })}
                />
              </label>
            </Form.Group>

            <div className="d-flex justify-content-center  ">
              <button
                className=" px-5 mx-5 btn btn-outline-success fw-semibold "
                type="reset"
              >
                Cancel
              </button>
              <button
                className=" px-4 btn btn-success fw-semibold"
                type="submit"
                disabled={isAdding}
              >
                {isAdding ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Saving...
                  </>
                ) : isEditMode ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </fieldset>
        </Form>
      </div>
    </>
  );
}
