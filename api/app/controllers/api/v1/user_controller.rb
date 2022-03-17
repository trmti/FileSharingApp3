class Api::V1::UserController < ApplicationController
  before_action :set_user, only: %i[ get_image create_image update_image ]
  def index
    @users = User.all
    render json: @users
  end

  def get_image
    @post = @user.post
    render json: @post
  end

  def create_image
    @post = @user.create_post(image: params[:image])
    render json: @post
  end

  def update_image
    @post = @user.build_post(image: params[:image])
    @user.post = @post
    @user.save!
    render json: @user
  end

  private
    def set_user
      @user = User.find(params[:id])
    end
    def user_params
      params.require(:user).permit(:image)
    end
end