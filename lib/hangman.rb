class Hangman
  attr_reader :wrong_guesses
  attr_reader :wrong_guesses, :correct_guesses

  def initialize(word=null)
    @word = word
    @wrong_guesses = []
    @correct_guesses = []
  end

  def solution
    @word
  end

  def guess(letter)
    guess =  solution.downcase.include?(letter.downcase)

    if guess
      @correct_guesses << letter
    else
      @wrong_guesses << letter
    end
    guess
  end
end
