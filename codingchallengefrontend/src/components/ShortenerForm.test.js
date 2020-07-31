import React from "react";
import { act } from "react-dom/test-utils";
import ShortenerForm from "./ShortenerForm";
import { render, fireEvent, screen } from '@testing-library/react'

it("posts url and shows shortened one", async () => {
    const inputText="www.google.com";
    const fakeUrl= {
        id: 1,
        url: "https://www.google.com",
        code: "ab",
        shortened_url: "https://test-url.com/v/ab",
        hits: 0,
        title: "Google Test"
    }
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUrl)
        })
    );

    render(<ShortenerForm />)

    fireEvent.change(screen.getByPlaceholderText('URL',{exact:false}), { target: { value: inputText } })

    expect(screen.getByPlaceholderText('URL',{exact:false})).toHaveValue(inputText);

    await act(async () => {
        fireEvent.submit(screen.getByTitle('Shorten'))
    });
    expect(screen.getByText('Short URL',{ exact: false })).toHaveTextContent("https://test-url.com/v/ab")
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});

it("posts url - renders error", async () => {
    const inputText="www.google.com";
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

    render(<ShortenerForm />)

    fireEvent.change(screen.getByPlaceholderText('URL', {exact:false}), { target: { value: inputText } })

    expect(screen.getByPlaceholderText('URL',{exact:false})).toHaveValue(inputText);

    await act(async () => {
        fireEvent.submit(screen.getByTitle('Shorten'))
    });

    expect(screen.getByText('Error:',{ exact: false })).toHaveTextContent("First Error");
    expect(screen.getByText('Error:',{ exact: false })).toHaveTextContent("Second Error");

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});