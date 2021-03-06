class Api::V1::FoldersController < ApplicationController
  before_action :set_folder, except: %i[]

  # ------ resources --------------------------------
  def show
    render json: @folder
  end

  def update
    @folder.update(folder_params)
    render json: @folder, status: :ok
  end

  def destroy
    @folder.destroy
    render json: {message: "フォルダーを削除しました"}, status: :ok
  end

  # ------ file --------------------
  def get_files
    @files = @folder.file_contents
    @res = []
    @files.each do |file|
      @image = file.post ? file.post.image.url : nil
      @comment_count = file.comments.size
      @res.push({file: file, image: @image, comment_count: @comment_count})
    end
    render json: @res
  end

  def create_file
    @file_content = @folder.file_contents.build(title: params[:title], description: params[:description])
    @folder.file_contents << @file_content
    if @file_content.save
      render json: @file_content, status: :created
    else
      render status: :internal_server_error
    end
  end

  # ------ post --------------------------------
  def create_image
    @post = @folder.create_post(image: params[:image])
    if @folder.save
      render json: @post, status: :created
    else
      render status: :internal_server_error
    end
  end

  def update_image
    @post = @folder.build_post(image: params[:image])
    @folder.post = @post
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
      params.permit(:title, :description)
    end
end
