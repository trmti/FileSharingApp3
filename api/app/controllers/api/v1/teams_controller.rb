class Api::V1::TeamsController < ApplicationController
  before_action :set_team, except: [:index, :get_teams_record, :search_teams]

  # ------ resources ---------------------------------------------
  def index
    render json: { teams: Team.all.order('created_at DESC')}
  end

  def show
    @image = @team.post ? @team.post.image.url : nil
    @leader_image = @team.leader.post ? @team.leader.post.image.url : nil

    @authors = @team.editors
    @author_res = []
    @authors.each do |author|
      @author_image = author.post ? author.post.image.url : nil
      @author_res.push({image: @author_image, name: author.name })
    end
    render json: {team: @team, image: @image, leader: {image: @leader_image, name: @team.leader.name}, authors: @author_res}, status: :ok
  end

  def update
    new_params = team_params.dup
    new_params.delete(:leader_id) {|key|
      @team.update(new_params)
      render json: @team, status: :ok
      return
    }
    @leader = User.find(params[:leader_id])
    @team.leader = @leader
    @team.update(new_params)
    render json: @team, status: :ok
  end

  def destroy
    @team.destroy
    render json: {message: "チームを削除しました"}, status: :ok
  end

  # ------ folder ----------------------------------------------------------
  def get_folders
    @folders = @team.folders.order('created_at DESC')
    @res = []
    @folders.each do |folder|
      @image = folder.post ? folder.post.image.url : nil
      @res.push({folder: folder, image: @image})
    end
    render json: @res, status: :ok
  end

  def create_folder
    @folder = @team.folders.build(title: params[:title], description: params[:description])
    @team.folders << @folder
    if @folder.save
      render json: @folder, status: :created
    else
      render status: :internal_server_error
    end
  end
  
  # ------ post ------------------------------
  def create_image
    @post = @team.create_post(image: params[:image])
    if @team.save
      render json: @post, status: :created
    else
      render status: :internal_server_error
    end
  end

  def update_image
    @post = @team.build_post(image: params[:image])
    @team.post = @post
    if @team.save
      render json: @post, status: :created
    else
      render status: :internal_server_error
    end
  end
  
  # ------ user ------------------------------
  def get_editor_ids
    render json: {ids: @team.editor_ids}, status: :ok
  end

  def get_leader_id
    render json: {id: @team.leader_id}, status: :ok
  end

  def get_waiting_users
    render json: @team.waiting_users, status: :ok
  end

  def get_waiting_user_ids
    render json: {ids: @team.waiting_user_ids}, status: :ok
  end

  def add_waiting_user
    if @team.waiting_users.exists?(params[:user_id]) || @team.editors.exists?(params[:user_id])
      render json: {}, status: :accepted
    else
      @user = User.find(params[:user_id])
      @team.waiting_users << @user
      render json: @user, status: :accepted
    end
  end

  
  def add_editor
    if @team.editors.exists?(params[:user_id])
      render json: {}, status: :not_modified
    else
      @editor = User.find(params[:user_id])
      @team.waiting_users.destroy(@editor)
      @team.editors << @editor
      render json: @editor, status: :accepted
    end
  end

  def remove_editor
    @team.editors.destroy(params[:user_id])
  end
  
  def reject_editor
    @team.waiting_users.destroy(params[:user_id])
  end
  # ------ team ------------------------
  def get_teams_record
    @teams = Team.order(created_at: :desc).limit(params[:limit]).offset(params[:offset])
    @res = []
    @teams.each do |team|
      @cover_image = team.post ? team.post.image.url : nil
      @leader_image = team.leader.post ? team.leader.post.image.url : nil
      @res.push({team: team, leader_image: @leader_image, cover_image: @cover_image})
    end
    render json: @res
  end

  def search_teams
    @teams = Team.where('name LIKE ?', "%#{params[:text]}%").limit(params[:limit])
    @res = []
    @teams.each do |team|
      @cover_image = team.post ? team.post.image.url : nil
      @leader_image = team.leader.post ? team.leader.post.image.url : nil
      @res.push({team: team, leader_image: @leader_image, cover_image: @cover_image})
    end
    render json: @res 
  end

  private
    def set_team
      @team = Team.find(params[:id])
    end
    def team_params
      params.require(:team).permit(:image, :name, :description, :publish_range, :leader_id, :user_id)
    end
    def post_params
      params.require(:post).permit(:image)
    end
    def folder_params
      params.require(:folder).permit(:title, :description)
    end
end
