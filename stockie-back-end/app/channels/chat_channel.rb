class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
  end

  def receive(data)
    message_data = data.merge(sender: params[:nickname])
    ActionCable.server.broadcast("chat_channel", message_data)
  end
end
