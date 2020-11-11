import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    id: '20324',
    title: '',
    director: '',
    metascore: '',
    stars: ''
  };


const AddMovie = props => {
    const {setMovieList} = props
    const { push } = useHistory()
    const [movie, setMovie] = useState(initialMovie)


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
        axios.post(`http://localhost:5000/api/movies`, movie)
            .then(res => {
                console.log(res)
                setMovieList(res.data)
                push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <h2>Add New Movie</h2>
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
                <input
                        type="text"
                        name="stars"
                        onChange={changeHandler}
                        placeholder="stars"
                        value={movie.stars}
                />
                <p>Enter star names seperated by a comma</p>
                <button>
                Add
                </button>
            </form>
        </div>
    )
}

export default AddMovie