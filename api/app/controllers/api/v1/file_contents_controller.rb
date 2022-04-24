class Api::V1::FileContentsController < ApplicationController
  before_action :set_file, except: %i[]

  # ------ resources -----------------------
  def show
    image = @file.post ? @file.post.image.url : nil
    render json: {file: @file, image: image}, status: :ok
  end
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

  # ------ comment --------------------
  def create_comment
    comment = @file.comments.build(text: params[:text], user_id: params[:user_id])
    user = comment.user
    user_image = user.post ? user.post.image.url : nil
    if comment.save
      @file.save
      CommentsChannel.broadcast_to(@file, {comment: comment, user_image: user_image})
      head :ok
    else
      head :ok
    end
  end

  def get_comments
    comments = @file.comments.order("created_at DESC")
    res = []
    comments.each do |comment|
      user = comment.user
      user_image = user.post ? user.post.image.url : nil
      res.push({comment: comment, user_image: user_image})
    end
    render json: res, status: :ok
  end

  private
    def set_file
      @file = FileContent.find(params[:id])
    end

    def file_params
      params.require(:file_content).permit(:title, :description, :text, :user_id)
    end

    def comment_params
      params.require(:comment).permit(:text, :user_id)
    end
end
