import React from "react";
import { act } from "react-dom/test-utils";
import TopUrls from "./TopUrls";
import { render, screen } from '@testing-library/react'

it("renders urls data", async () => {
    const fakeUrls = [
    {
        id:1,
        url: "https://www.google.com",
        code: "ab",
        shortened_url: "https://test-url.com/v/ab",
        hits:0,
        title:"Google Test"
    },
        {
            id:2,
            url: "https://www.google2.com",
            code: "ba",
            shortened_url: "https://test-url.com/v/ba",
            hits:0,
            title:"Google Test 2"
        },

    ]
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUrls)
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<TopUrls />);
    });

    expect(screen.getByText(fakeUrls[0].title)).toBeInTheDocument()
    expect(screen.getByText(fakeUrls[1].title)).toBeInTheDocument()

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});

it("renders error", async () => {
    const fakeError = {
        errors:{
            url:[
                "First Error",
                "Second Error"
            ]
        }
    }
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeError)
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<TopUrls />);
    });
    expect(screen.getByText('Error:',{ exact: false })).toHaveTextContent("First Error");
    expect(screen.getByText('Error:',{ exact: false })).toHaveTextContent("Second Error");


    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});