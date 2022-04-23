FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /rails-react-app
WORKDIR /rails-react-app

COPY Gemfile /rails-react-app/Gemfile
COPY Gemfile.lock /rails-react-app/Gemfile.lock
RUN bundle install
COPY . /rails-react-app

COPY ./fullchain.pem /etc/fullchain.pem
COPY ./privkey.pem /etc/privkey.pem

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3001

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]