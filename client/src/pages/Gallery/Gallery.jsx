// PictureCarousel.js

import './Gallery.scss';
import {useState, useEffect} from "react";
import { supabase} from "../../utils";

export default function Gallery(){
  const[photos, setPhotos] = useState("");
  const bucket = supabase.storage.from('photos')

  async function getPhotos() {
    const { data: objects, error } = await supabase.storage.from('photos').list()
    if (error) {
      console.log('Error listing objects:', error.message)
    } else {
      const photoUrls = objects.map(object => supabase.storage.from('photos').getPublicUrl(object.name))
      setPhotos(photoUrls)
    }
    }

    useEffect(() => {
      getPhotos();
    }, []);
 
    return (
      <main className="gallery">

        <div className="gallery__main">
        {photos && photos.map((photo) => (
          <div className='gallery__frame'>
            <img className="gallery__pic" key={photo.data.id} src={photo.data.publicUrl} alt="pup pic" />
          </div>
        ))}
      </div>
   
      </main>
  )
}




