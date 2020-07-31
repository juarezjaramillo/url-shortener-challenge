class Url < ApplicationRecord
  include Shortener

  before_validation :add_protocol_to_url

  validates_presence_of :url
  validates :url, length: { in: 3..4000, too_short: '3 characters is the minimum required',
                            too_long: '4000 characters is the maximum allowed' }
  validate :valid_url?
  validates :code, length: { in: 1..200, too_short: '1 character is the minimum required',
                             too_long: '200 characters is the maximum allowed' },
                   allow_nil: true
  validates :title, length: { in: 1..200, too_short: '1 character is the minimum required',
                              too_long: '200 characters is the maximum allowed' }

  # generate code
  after_create :generate_code

  # The generated code is based on the id of the record, this is for simplicity.
  # This guarantees there where will be no clashes like would happen in the case
  # we were calculating it using hashes or random numbers.
  # This also makes it easy to adjust the code we generate so that
  # it skips the first ones (e.g. two letter codes)
  # (e.g. encode (id + 10000))
  def generate_code
    self.code = encode(id) if code.nil? || code.empty?
    save
    true
  end

  def valid_url?
    uri = URI.parse(url)
    errors.add(:url, 'is not a valid URL') if uri.host.nil?
  rescue URI::InvalidURIError
    errors.add(:url, 'is not a valid URL')
  end

  def add_protocol_to_url
    self.url = "http://#{url}" unless url.nil? || url.empty? ||  url[%r{\Ahttp://}] || url[%r{\Ahttps://}]
  end
end
