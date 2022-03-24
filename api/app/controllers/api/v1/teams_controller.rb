class Api::V1::TeamsController < ApplicationController
  before_action :set_team, only: %i[show create_image get_users get_editors get_folders]

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

  def get_users
    render json: @team.users.order('created_at DESC'), status: :ok
  end

  def get_editors
    render json: @team.editors.order('created_at DESC'), status: :ok
  end

  def get_folders
    @folders = @team.folders.order('created_at DESC')
    @res = []
    @folders.each do |folder|
      @image = folder.post ? folder.post.image.url : nil
      @res.push({folder: folder, image: @image})
    end
    render json: @res, status: :ok
  end

  def create_image
    @post = @team.create_post(image: params[:image])
    if @team.save
      render json: @post, status: :created
    else
      render status: :internal_server_error
    end
  end

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
    render json: @res  end

  private
    def set_team
      @team = Team.find(params[:id])
    end
    def team_params
      params.require(:team).permit(:image)
    end
    def post_params
      params.require(:post).permit(:image)
    end
end
