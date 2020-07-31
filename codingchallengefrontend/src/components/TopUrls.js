import * as React from "react";
import {AppConfig} from "../Config";
import fetcher from "../fetcher";
import UrlsTable from "./UrlsTable";

class TopUrls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {urls: [], error: null, isLoaded:false};
    }

    componentDidMount() {
        // Get from backend
        fetcher(AppConfig.apiUrl+'/url/top', {
            method: 'get',
        }).then(response => response.json()).then(data => {
            this.setState({isLoaded:true});
            if (data.errors && data.errors.url){
                this.setState({error: data.errors.url.join (", "), urls:null});
            }else{
                this.setState({urls: data, error:null});
            }
        }, (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    render() {
        const { error, isLoaded, urls } = this.state;
        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <UrlsTable urls={urls}>
                </UrlsTable>
            );
        }
    }
}

export default TopUrls;