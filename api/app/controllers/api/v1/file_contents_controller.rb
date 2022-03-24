class Api::V1::FileContentsController < ApplicationController
  before_action :set_file, only: %i[get_file]

  private
    def set_file
      @file = FileContent.find(params[:id])
    end

    def file_params
      params.permit()
    end
end
