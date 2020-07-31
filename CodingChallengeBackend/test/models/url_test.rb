require 'test_helper'

class UrlTest < ActiveSupport::TestCase
  include Shortener
  test 'should not save Url model without url field' do
    url = Url.new
    assert_not url.save
  end

  test 'should save Url model wit url and title' do
    url = Url.new
    url.url = 'https://www.google.com'
    url.title = 'Google'
    assert url.save
  end

  test 'should calculate code after created' do
    url = Url.new
    url.url = 'https://www.google.com'
    url.title = 'Google'
    assert url.save
    assert_not_nil url.code
    assert_not_empty url.code
  end

  test 'should validate minimum length of url' do
    url = Url.new
    url.url = 'h'
    assert url.invalid?
  end

  test 'should validate maximum length of url' do
    url = Url.new
    url.url = "https://google.com/s=#{'There are many variations of passages of Lorem Ipsum available. ' * 100}"
    assert url.invalid?
  end

  test 'should validate minimum length of title' do
    url = Url.new
    url.title = 'h'
    assert url.invalid?
  end

  test 'should validate maximum length of title' do
    url = Url.new
    url.title = 'There are many variations of passages of Lorem Ipsum available. ' * 100
    assert url.invalid?
  end

  test 'should generate code in Base62' do
    url = Url.new
    url.url = 'https://www.google.com'
    url.title = 'Google'
    assert url.save
    assert_equal url.code, encode(url.id)
  end
end
