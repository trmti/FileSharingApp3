class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[destroy]

  def index
    render json: { posts: Post.all.order('created_at DESC')}
  end

  def create
    post = Post.new(post_params)
    post.save
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
  end

  private

    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.permit(:image)
    end
end
