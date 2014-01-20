class Hangman
  attr_reader :wrong_guesses

  def initialize(word=null)
    @word = word
    @wrong_guesses = []
  end

  def solution
    @word
  end

  def guess(letter)
    guess = solution.downcase.include?(letter.downcase)
    @wrong_guesses << letter unless guess
    guess
  end
end
