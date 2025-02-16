import React, { useState } from 'react';

const AddTask = () => {
    // Initialize state with an array of 2 empty image objects
    const [imageInputs, setImageInputs] = useState([null, null]);

    // Function to handle adding a new image input
    const addImageInput = () => {
        setImageInputs([...imageInputs, null]);
    };

    // Function to handle removing an image input
    const removeImageInput = () => {
        if (imageInputs.length > 2) {
            setImageInputs(imageInputs.slice(0, -1));
        }
    };

    // Function to handle image input change (convert image to base64)
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImageInputs = [...imageInputs];
                newImageInputs[index] = reader.result;  // Store base64 image data
                setImageInputs(newImageInputs);
            };
            reader.readAsDataURL(file);  // Convert image to base64
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the data to send to the API
        const data = {
            title: e.target.title.value,
            images: imageInputs.filter(image => image !== null)  // Only include non-null base64 images
        };

        console.log('Sending data to API:', data);

        // Here you would send `data` to your API (using fetch or axios)
    };

    console.log("imageInputs", imageInputs)

    return (
        <div className='p-6'>
            <h1 className='text-3xl mb-3 font-bold'>Add Task</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <input name='title' className='w-ful`l p-2 border-2 border-indigo-400 rounded-md outline-none' type="text" placeholder='Title of the thumbnail.' />
                <fieldset className='border-2 border-indigo-500 p-3 rounded-md'>
                    <legend className='m-3'>
                        <div className='flex gap-3'>
                            <button disabled={imageInputs?.length >= 5 ? true : false} className='px-2 py-1 bg-indigo-400 text-white rounded-md' type="button" onClick={addImageInput}>Add Image</button>
                            <button disabled={imageInputs?.length <= 2 ? true : false} className='px-2 py-1 bg-indigo-400 text-white rounded-md' type="button" onClick={removeImageInput}>Remove Image</button>
                        </div>
                    </legend>

                    <div className='flex justify-evenly gap-3'>
                        {imageInputs.map((image, index) => (
                            <div key={index}>
                                <input
                                    className='w-full p-2 mb-3 border-2 border-indigo-400 rounded-md outline-none'
                                    type="file"
                                    name={`image-${index}`}
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, index)}
                                />

                                {/* Show image preview if the image is loaded */}
                                {image && (
                                    <div className='mt-2'>
                                        <img
                                            src={image}
                                            alt={`preview-${index}`}
                                            className='max-w-full max-h-64 object-cover rounded-md'
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </fieldset>

                <button className='py-2 px-4 bg-indigo-400 text-white rounded-md' type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddTask;
