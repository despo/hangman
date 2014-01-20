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
    end

    describe "when correct" do
      it "returns true" do
        hangman.guess("f").must_equal(true)
      end
    end
  end
end
