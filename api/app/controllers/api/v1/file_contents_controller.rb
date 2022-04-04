class Api::V1::FileContentsController < ApplicationController
  before_action :set_file, exept: %i[]

  # ------ resources -----------------------
  def update
    @file.update(file_params)
    render json: @file, status: :ok
  end

  def destroy
    @file.destroy
    render json: {message: "ファイルを削除しました"}, status: :ok
  end

  # ------ post --------------------
  def create_image
    @post = @file.create_post(image: params[:image])
    if @file.save
      render json: @post, status: :created
    else
      render status: :internal_server_error
    end
  end

  def update_image
    @post = @file.build_post(image: params[:image])
    @file.post = @post
    if @file.save
      render json: @post, status: :created
    else
      render status: :internal_server_error
    end
  end

  private
    def set_file
      @file = FileContent.find(params[:id])
    end

    def file_params
      params.permit(:title, :description)
    end
end
