import * as React from "react";
import UrlsTableRow from "./UrlsTableRow";
import "./UrlsTable.css";

class UrlsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const urls = this.props.urls.map((url) =>
            <UrlsTableRow key={url.id} url={url}>
            </UrlsTableRow>
        );
        return (
            <table className="urls-table">
                <thead>
                <tr>
                    <th>Url</th>
                    <th>Title</th>
                    <th>Shortened Url</th>
                    <th>Hits</th>
                </tr>
                </thead>
                <tbody>{urls}</tbody>
            </table>
        );
    }
}

export default UrlsTable;