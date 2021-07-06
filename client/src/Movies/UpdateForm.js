import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
  };


const UpdateForm = props => {
    const { push } = useHistory()
    const [movie, setMovie] = useState(initialMovie)
    const { id } = useParams()

    useEffect (() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const changeHandler = e => {
        e.persist()
        let value = e.target.value;
        if (e.target.name === 'stars') {
            value = value.split(',')
        }
        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            props.setMovieList(res.data)
            push(`/movies/${id}`)
        })
    }

    return (
        <div className='update-form'>
            <h2>Update Movie</h2>
            <form className='form-container'onSubmit={handleSubmit}>
            <div className='input-container'>
            <span>Title:</span>
            <input
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="title"
                value={movie.title}
            />
            </div>
            <div className='input-container'>
            <span>Director:</span>
            <input
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="director"
                value={movie.director}
            />
            </div>
            <div className='input-container'>
            <span>Metascore:</span>
                <input
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={movie.metascore}
                />
            </div>
            <div className='input-container'>
            <span>Stars:*</span>
            <input
                type="text"
                name="stars"
                onChange={changeHandler}
                placeholder="stars"
                value={movie.stars}
            />
            </div>
            <p>*Enter star names seperated by a comma</p> 
                <button>
                Update
                </button>
            </form>
        </div>
    )
}

export default UpdateForm