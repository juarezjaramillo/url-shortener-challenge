module Shortener

  KEYS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.freeze
  BASE = KEYS.length

  # A simple algorithm to encode the number
  # The modulues the modulus value between the num and the base is prepended to the string
  # Then, the number is divided by the base to get the new number used for the modulus in the next iteration.
  # In the end, this will result in a base conversion (using KEYS as the base alphabet numbers)
  def encode(num)
    return '0' if num == 0
    return nil if num.negative?

    str = ''
    while num > 0
      str = KEYS[num % BASE] + str
      num /= BASE
    end
    str
  end

  # Simple algorithm to decode.
  # The base is elevated to the power of the character position in the string (backwards)
  # and then multiplied by the value it represents (based on the index of the character within the KEYS)
  # the result is added to the final result number
  def decode(str)
    num = 0
    i = 0
    while i < str.length
      pow = BASE**(str.length - i - 1)
      num += KEYS.index(str[i]) * pow
      i += 1
    end
    num
  end
end