class CommentsChannel < ApplicationCable::Channel
  def subscribed
    file = FileContent.find(params[:id])
    stream_for file
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end