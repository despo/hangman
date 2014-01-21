class Hangman
  def initialize(word=nil, correct_guesses=[], wrong_guesses=[])
    @word = word
    @wrong_guesses = wrong_guesses
    @correct_guesses = correct_guesses
  end

  def solution
    @word
  end

  def correct_guesses
    @correct_guesses.uniq!
    @correct_guesses
  end

  def wrong_guesses
    @wrong_guesses.uniq!
    @wrong_guesses
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
