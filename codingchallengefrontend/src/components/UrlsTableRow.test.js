import React from 'react';
import renderer from 'react-test-renderer';
import UrlsTableRow from "./UrlsTableRow";

it('renders correctly', () => {
    const fakeUrl = {
            id:1,
            url: "https://www.google.com",
            code: "ab",
            shortened_url: "https://test-url.com/v/ab",
            hits:2,
            title:"Google Test"
        }
    const tree = renderer
        .create(<UrlsTableRow url={fakeUrl} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});