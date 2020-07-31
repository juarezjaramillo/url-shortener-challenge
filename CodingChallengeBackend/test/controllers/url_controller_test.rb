# frozen_string_literal: true

require 'test_helper'

class UrlControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get url_index_path
    assert_response :success
  end

  test 'should get url' do
    get url_path(1)
    assert_response :success
    output_url = response.parsed_body
    assert_equal 'Google', output_url['title']
    assert_equal 'https://www.google.com', output_url['url']
  end

  test 'should get top urls' do
    get top_url_index_path
    assert_response :success
    output_urls = response.parsed_body
    assert_equal 4, output_urls[0]['hits']
    assert_equal 3, output_urls[1]['hits']
    assert_equal 2, output_urls[2]['hits']
    assert_equal 1, output_urls[3]['hits']
  end

  test 'should obtain title and save url' do
    post url_index_path,
         params: { url: 'https://www.google.com' }
    assert_response :success
    output_url = response.parsed_body
    assert_equal 'Google', output_url['title']
  end

  test 'should not save if url is empty' do
    post url_index_path,
         params: { url: '' }
    assert_response :bad_request
  end

  test 'should not save if no url' do
    post url_index_path,
         params: {}
    assert_response :bad_request
  end

  test 'should not save if url is malformed' do
    post url_index_path,
         params: { url: 'http www google com' }
    assert_response :bad_request
  end

  test 'should not get if no record found' do
    get url_path(-1)
    assert_response :missing
  end
end
