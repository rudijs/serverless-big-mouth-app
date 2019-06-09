# serverless-big-mouth-app

Demo serverless framework app

## Install

- `npm i -g serverless`
- `git clone git@github.com:rudijs/serverless-big-mouth-app.git`
- `cd serverless-big-mouth-app`
- `npm install`

## Deploy

Create a completely new serverless app:

- `sls deploy`
- `node scripts/seed-restaurants.js`
- Update the `restaurants_api` in serverless.yaml
- `sls deploy`
- Update the `restaurants_api` in serverless.yml for the `get-index` function
- `sls info`
- After update deploy again
- `sls deploy`

Update a particular function:

- `sls deploy -f get-index -l`

## Remove

- `sls remove`
