require_relative 'test_helper'

describe Hangman do
  it "starts a game with a the specified word" do
    hangman = Hangman.new("pokemon")

    hangman.solution.must_equal("pokemon")
  end

  describe "guess" do
    let(:hangman) { Hangman.new("flower") }

    describe "when wrong" do
      it "returns false" do
        hangman.guess("c").must_equal(false)
      end

      it "stores the wrong guesses" do
        hangman.guess("c").must_equal(false)
        hangman.guess("p").must_equal(false)

        hangman.wrong_guesses.must_equal(["c", "p"])
      end
    end

    describe "when correct" do
      it "returns true" do
        hangman.guess("f").must_equal(true)
      end

      it "stores the correct guesses" do
        hangman.guess("l").must_equal(true)
        hangman.guess("o").must_equal(true)

        hangman.correct_guesses.must_equal(["l", "o"])
      end

      it "updates the hangman string" do
        hangman.guess("l")
        hangman.to_s.must_equal("_l____")

        hangman.guess("w")
        hangman.to_s.must_equal("_l_w__")
      end
    end

    describe "#hint" do
      it "gives hint to player" do
        hangman.solution.must_include(hangman.hint)
      end

      it "is a correct guess" do
        hint = hangman.hint
        hangman.guess(hint)

        hangman.correct_guesses.must_include(hint)
      end
    end
  end
end
