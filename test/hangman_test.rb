require_relative 'test_helper'

describe Hangman do
  it "starts a game with a the specified word" do
    hangman = Hangman.new("pokemon")

    hangman.solution.must_equal("pokemon")
  end
end
