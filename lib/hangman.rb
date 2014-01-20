class Hangman
  def initialize(word=null)
    @word = word
  end

  def solution
    @word
  end

  def guess(letter)
    solution.downcase.include?(letter.downcase)
  end
end
