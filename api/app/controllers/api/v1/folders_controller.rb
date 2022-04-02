class Api::V1::FoldersController < ApplicationController
  before_action :set_folder, only: %i[get_files create_image]

  def get_files
    @files = @folder.file_contents
    @res = []
    @files.each do |file|
      @image = file.post ? file.post.image : nil
      @comment_count = file.comments.size
      @res.push({file: file, image: @image, comment_count: @comment_count})
    end
    render json: @res
  end

  def create_image
    @post = @folder.create_post(image: params[:image])
    if @folder.save
      render json: @post, status: :created
    else
      render status: :internal_server_error
    end
  end

  private
    def set_folder
      @folder = Folder.find(params[:id])
    end

    def folder_params
      params.permit()
    end
end
