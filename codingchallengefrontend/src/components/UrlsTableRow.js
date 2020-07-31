import * as React from "react";

class UrlsTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const url = this.props.url;
        return (
            <tr>
                <td>{url.url}</td>
                <td>{url.title}</td>
                <td><a href={url.shortened_url} className="App-link">
                    {url.shortened_url}
                </a></td>
                <td>{url.hits}</td>
            </tr>
        );
    }
}

export default UrlsTableRow;