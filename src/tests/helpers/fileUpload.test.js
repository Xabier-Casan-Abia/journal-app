import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'darkscarbo', 
    api_key: '842856955159184', 
    api_secret: '88tK30tO2-CtjBas9QLQtn-wAWc' 
});


describe('Tests in fileUpload', () => {
    
    test('should upload an image and return the URL', async (done) => {
        
        const resp = await fetch("https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Maurice_Ravel_1925.jpg/440px-Maurice_Ravel_1925.jpg");
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload(file); 

        expect(typeof url).toBe('string');

        //Delete uploaded img

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg','');

        cloudinary.v2.api.delete_resources( imageId, {}, ()=> {
            done();
        });

    })

    test('should return an error', async () => {
        
       
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file); 

        console.log(url)

        expect(url).toBe(null)

    })
    
})
