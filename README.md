# serverless-big-mouth-app

Demo serverless framework app

## Install

- `git clone git@github.com:rudijs/serverless-big-mouth-app.git`
- `cd serverless-big-mouth-app`

## Deploy

Create a completely new serverless app:

- `sls deploy`
- `node scripts/seed-restaurants.js`
- Update the `restaurants_api` in serverless.yaml
- `sls deploy`

Update a particular function:

- `sls deploy -f get-index -l`

## Remove

- `sls remove`
