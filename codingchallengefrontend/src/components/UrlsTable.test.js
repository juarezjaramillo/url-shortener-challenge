import React from 'react';
import renderer from 'react-test-renderer';
import UrlsTable from "./UrlsTable";

it('renders correctly', () => {
    const fakeUrls = [
        {
            id:1,
            url: "https://www.google.com",
            code: "ab",
            shortened_url: "https://test-url.com/v/ab",
            hits:2,
            title:"Google Test"
        },
        {
            id:2,
            url: "https://www.google2.com",
            code: "ba",
            shortened_url: "https://test-url.com/v/ba",
            hits:1,
            title:"Google Test 2"
        },

    ]
    const tree = renderer
        .create(<UrlsTable urls={fakeUrls} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});