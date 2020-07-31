require 'test_helper'

class RedirectControllerTest < ActionDispatch::IntegrationTest
  test 'should redirect to url' do
    get redir_path(code: '1')
    assert_redirected_to 'https://www.google.com'
  end

  test 'should show error page when code does not exist' do
    get redir_path(code: '-1')
    assert_response :missing
    assert_select 'title', 'Not Found'
    assert_select 'h1', 'Not Found'
  end
end
