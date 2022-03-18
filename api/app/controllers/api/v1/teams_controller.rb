class Api::V1::TeamsController < ApplicationController
  before_action :set_user, only: %i[]

  def index
    render json: { teams: Team.all.order('created_at DESC')}
  end

  def get_teams_record
    render json: { teams: Team.order(created_at: :desc).limit(params[:limit]).offset(params[:offset]) }
  end

  private
    def set_team
      @team = Team.find(params[:id])
    end
    def team_params
      params.require(:team).permit()
    end
end
