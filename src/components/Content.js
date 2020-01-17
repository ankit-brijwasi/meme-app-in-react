import React, { Component } from 'react'

export default class Content extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            imageURL: "",
            caption: "",
            disabled: true
        }
        // this.handleChange = this.handleChange.bind(this)
        // can be avoided because of arrow function, it has a lexical scope
        this.generateNewImage = this.generateNewImage.bind(this);
        this.fetchImage = this.fetchImage.bind(this);
    }
    fetchImage() {
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            fetch(memes[Math.round(Math.random() * 10)].url)
            .then(data => {
                this.setState({
                    imageURL: data.url,
                    isLoading: false,
                    disabled: false
                })
            })
        })
    }
    componentDidMount() {
        this.fetchImage()
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    generateNewImage() {
        this.setState({
            isLoading: true,
            imageURL: "",
            disabled: true
        })
        this.fetchImage()
    }
    render() {
        return (
            <div className="main-content">
                <center>
                    <input
                        className = "accept-caption"
                        name = "caption"
                        value = {this.state.caption}
                        placeholder = "some caption"
                        onChange = {this.handleChange}
                        disabled = {this.state.disabled}
                    />
                </center>
                <center>
                    <button type = "button"
                        className = "btn btn-link" 
                        onClick = {this.generateNewImage}
                    > Generate new image
                    </button>
                </center>
                <div className = "image">
                    {this.state.isLoading ? 
                    <p style = {{margin: "40px"}}>Loading the image...</p> 
                    : 
                    <div className="cover-img">
                        <img src = {this.state.imageURL} alt=""/>
                        {this.state.caption && <div className="caption">{this.state.caption}</div>}
                    </div>
                }
                </div>
            </div>
        )
    }
}
