# URl Shortener Challenge

Go to 

[http://urlshortenercodechallenge.s3-website-us-east-1.amazonaws.com/](http://urlshortenercodechallenge.s3-website-us-east-1.amazonaws.com/)

for a live test of the URL Shortener

## Running locally

### Backend
In the project directory, run:
```shell script
cd CodingChallengeBackend
bundle install
ruby bin/rails db:migrate RAILS_ENV=development
ruby bin/rails server -b 0.0.0.0 -p 8080 -e development
```

This will install the dependencies and start a development server on [http://localhost:8080](http://localhost:8080)


### Frontend

In the project directory, run:
```shell script
cd codingchallengefrontend
yarn install
yarn start
```
Now you can open [http://localhost:3000](http://localhost:3000) and test the URL shortener

