import * as React from "react";
import {AppConfig} from "../Config";
import fetcher from "../fetcher";

class ShortenerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({url: event.target.value});
        if (event.target.value.length < 1) {
            this.setState({error: "Url cannot be empty"})
        }else{
            this.setState({error: null})
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        // do we have a url?
        if (this.state.error != null || this.state.url === ''){
            return;
        }
        // Post to backend
        fetcher(AppConfig.apiUrl+'/url', {
            method: 'POST',
            body: JSON.stringify({'url':this.state.url}),
        }).then(response => response.json()).then(data => {
            if (data.errors && data.errors.url){
                this.setState({error: data.errors.url.join (", "), shortUrl:null});
            }else{
                this.setState({shortUrl: data.shortened_url, error:null, url:''});
            }
        });

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" placeholder="Put your URL here"
                                value={this.state.url} onChange={this.handleChange} />
                </label>
                <input type="submit" title="Shorten" value="Shorten" />
            <p>
                {this.state.shortUrl &&
                <span>
                    Short URL:
                    &nbsp;<a href={this.state.shortUrl} className="App-link">
                    {this.state.shortUrl}
                </a>
                </span>
                }
                { this.state.error &&
                <span>Error: {this.state.error}</span>
                }
                </p>
            </form>
        );
    }
}

export default ShortenerForm;