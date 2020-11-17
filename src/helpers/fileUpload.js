export const fileUpload = async (file) => {
    const cloudURL = "https://api.cloudinary.com/v1_1/darkscarbo/upload";

    const formData = new FormData();
    
    formData.append('file', file);
    formData.append('upload_preset', 'react-journal');

    try {

        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        }) 

        if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
           return null
        }
        
    } catch (error) {
        console.log(error)
    }
};