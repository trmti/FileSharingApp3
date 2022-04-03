class Api::V1::FileContentsController < ApplicationController
  before_action :set_file, only: %i[destroy create_image]

  def destroy
    @file.destroy
    render json: {message: "ファイルを削除しました"}, status: :ok
  end

  def create_image
    @post = @file.create_post(image: params[:image])
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
      params.permit()
    end
end
