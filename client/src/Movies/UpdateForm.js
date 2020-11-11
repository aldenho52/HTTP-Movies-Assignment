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
            <form onSubmit={handleSubmit}>
            <label className='label-container'>Title:
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={movie.title}
                />
            </label><br></br>
            <label className='label-container'>Director:
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={movie.director}
                />
            </label><br></br>
            <label className='label-container'>Metascore:
                <input
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={movie.metascore}
                />
            </label><br></br>
            <label className='label-container'>Stars:
            <input
                type="text"
                name="stars"
                onChange={changeHandler}
                placeholder="stars"
                value={movie.stars}
            />
            </label><br></br>
            <p>Enter star names seperated by a comma</p> 
                <button>
                Update
                </button>
            </form>
        </div>
    )
}

export default UpdateForm