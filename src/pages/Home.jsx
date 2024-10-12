import { useState } from 'react';

function Home() {
  const [images, setImages] = useState([]); 
  const [page, setPage] = useState(1);      
  const [visibleImages, setVisibleImages] = useState([]); 
  const imagesPerPage = 9; 
    const [search,setSearch] = useState('')
    const searchs =(e)=>{
        setSearch(e.target.value)
    }
  const fetchImages = async () => {
    let url = `https://api.unsplash.com/search/photos?query=${search}&client_id=am5Wclo5pJ7f0Ukkl-GTdCUzmmttz5jDJJTzpo-X7lM&page=${page}`;
    let photo = await fetch(url);
    let json = await photo.json();
    let results = json.results;


    const imageUrls = results.map((img) => img.urls.small);
    
    setImages((prevImages) => [...prevImages, ...imageUrls]); 
    setVisibleImages(imageUrls.slice(0, imagesPerPage)); 
  };

  const loadMoreImages = () => {
    const nextPage = page + 0;
    const nextImages = images.slice(0, nextPage * imagesPerPage); 
    setPage(nextPage);
    setVisibleImages(nextImages); 
  };

  return (
    <>
      <div className="main d-flex f-col">
        <div className="top d-flex j-center align-center">
          <input type="text" placeholder="Search..." autoFocus  value={search} onChange={searchs}/>
          <button onClick={fetchImages}>Search</button> 
        </div>
        
        <div className="center d-flex align-center j-center">
          <div className="imgs">
            
            {visibleImages.length > 0 ? (
              visibleImages.map((imgUrl, index) => (
                <img key={index} src={imgUrl} alt="Fetched from Unsplash" />
              ))
            ) : (
              <p>No images found</p>
            )}
          </div>
        </div>
        {images.length > visibleImages.length && (
          <div className="bottom">
            <button onClick={loadMoreImages}>Next</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
