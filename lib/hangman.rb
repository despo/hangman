class Hangman
  attr_reader :wrong_guesses, :correct_guesses

  def initialize(word=nil, wrong_guesses=nil, correct_guesses=nil)
    @word = word
    @wrong_guesses = wrong_guesses || []
    @correct_guesses = correct_guesses || []
  end

  def solution
    @word
  end

  def guess(letter)
    index = solution.downcase.index(letter.downcase)
    index ? @correct_guesses << solution[index] : @wrong_guesses << letter

    !!index
  end

  def to_s
    @word.each_char.map do |letter|
      correct_guesses.include?(letter) ? letter : "_"
    end.join("")
  end
end
