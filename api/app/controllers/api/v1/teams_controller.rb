class Api::V1::TeamsController < ApplicationController
  before_action :set_team, only: %i[create_image]

  def index
    render json: { teams: Team.all.order('created_at DESC')}
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
    render json: { teams: Team.order(created_at: :desc).limit(params[:limit]).offset(params[:offset]) }
  end

  def search_teams
    @teams = Team.where('name LIKE ?', "%#{params[:text]}%").limit(params[:limit])
    render json: { teams: @teams }
  end

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
