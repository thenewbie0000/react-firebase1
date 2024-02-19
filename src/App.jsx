import React, { useEffect, useState } from 'react';
import Auth from './components/Auth';
import {auth, db, storage} from './config/firebase'
import {getDocs, collection, addDoc, deleteDoc,updateDoc, doc} from'firebase/firestore';
import RenderMovieList from './components/RenderMovieList';
import AddMovie from './components/AddMovie';
import { ref, uploadBytes } from 'firebase/storage';


const App = () => {
  const[movieList, setMovieList] = useState([]);

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // Update Title
  const [updatedTitle, setUpdatedTitle] = useState("");

  // File Upload State
  const [fileUpload, setFileUpload]= useState(null);

  const moviesCollectionRef = collection(db, "movies");

  const getMoviesList = async()=>{
    // READ DATA
    // SET MOVIE LIST 
    try{
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) =>({
        ...doc.data(),
        id:doc.id
      }))
      setMovieList(filteredData);
    } catch(err){
      console.error(err);
    }
  };

  useEffect(()=>{
    getMoviesList();
  }, [])

  const onSubmitMovie = async () =>{
    try{
      await addDoc(moviesCollectionRef, {
        title:newMovieTitle,
        releaseDate: newReleaseDate,
        receivedOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });

      alert("Movie Added");

      getMoviesList();
    }catch(err){
      console.error(err);
      alert("Log In First");
    }
  }

  const deleteMovie = async(id)=>{
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMoviesList();
  }

  const updateMovieTitle = async(id) =>{
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {title:updatedTitle});
    getMoviesList();
  }

  const uploadFile = async()=>{
    if(!fileUpload)
      return;
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try{
      await uploadBytes(fileFolderRef, fileUpload)
    }catch(err){
      console.error(err)
    }
  }


  return (
    <div>
      <Auth/>
      <AddMovie
       onSubmitMovie={onSubmitMovie} 
       isNewMovieOscar={isNewMovieOscar}
       setIsNewMovieOscar={setIsNewMovieOscar}
       setNewMovieTitle={setNewMovieTitle}
       setNewReleaseDate={setNewReleaseDate}
      />
      
      <RenderMovieList 
        movieList={movieList} 
        deleteMovie={deleteMovie}
        setUpdatedTitle={setUpdatedTitle}
        updateMovieTitle={updateMovieTitle}
      />

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  )
}

export default App;