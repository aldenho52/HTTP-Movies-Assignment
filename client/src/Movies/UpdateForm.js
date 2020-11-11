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
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const changeHandler = e => {
        e.persist()
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
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
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={movie.director}
                />
                <input
                        type="text"
                        name="metascore"
                        onChange={changeHandler}
                        placeholder="metascore"
                        value={movie.metascore}
                />
                <button>
                Update
                </button>
            </form>
        </div>
    )
}

export default UpdateForm