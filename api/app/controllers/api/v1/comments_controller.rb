class Api::V1::CommentsController < ApplicationController
  private
  def comment_params
    params.require(:comment).permit()
  end
end
