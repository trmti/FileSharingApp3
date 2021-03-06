class Api::V1::UserController < ApplicationController
  before_action :set_user, exept: %i[ index show create_team ]

  # ------ resources -----------------------
  def index
    render json: { users: User.all.order('created_at DESC')}
  end

  def show
    render json: @user
  end

  def update
    @user.update(user_params)
    render json: @user, status: :ok
  end

  # ----- post --------------------------------
  def get_image
    render json: @user.post
  end

  def update_image
    @post = @user.build_post(image: params[:image])
    @user.post = @post
    if @user.save
      render json: @post, status: :created
    else
      render status: :internal_server_error
    end
  end

  # ----- team --------------------------------
  def get_join_teams
    @teams = @user.editable_teams.order('created_at DESC')
    @res = []
    @teams.each do |team|
      @cover_image = team.post ? team.post.image.url : nil
      @leader_image = team.leader.post ? team.leader.post.image.url : nil
      @res.push({team: team, leader_image: @leader_image, cover_image: @cover_image})
    end
    render json: @res, status: :ok
  end

  def create_team
    @team = @user.editable_teams.build(name: params[:name], description: params[:description], publish_range: params[:publish_range], leader_id: @user.id)
    @user.editable_teams << @team
    if @team.save
      render json: @team, status: :created
    else
      render status: :internal_server_error
    end
  end

  private
    def set_user
      @user = User.find(params[:id])
    end
    def user_params
      params.require(:user).permit(:image, :name, :message)
    end
    def post_params
      params.require(:post).permit(:image)
    end
    def team_params
      params.require(:team).permit(:name, :description, :publish_range, :image)
    end
end