# Deploying next application on AWS Using Serverless Component

## _A growing trend in recent years_

Serverless architecture allows you to pass your code to cloud providers who have their own servers that you can run your code from, so you don't have to worry about how the server works, how it's maintained, or how it scales, and only pay for what is used.

> As **Berta Escamilla** mentions in her article [Deploying Next.js on AWS Using Serverless Next.js](https://morioh.com/p/9ed515e8f10e).

## References sources

This configurations has been resolve consulting the next references:

- [AWS Lambda Functions](https://www.serverless.com/framework/docs/providers/aws/guide/functions) - Configurations for AWS Lambda Funtcions!
- [Serverless Nextjs](https://github.com/serverless-nextjs/serverless-next.js#readme) - Configurations for serverless components nextjs!
- [Serverless Nextjs](https://github.com/serverless-nextjs/serverless-next.js#readme) - Configurations for serverless components nextjs!
- [Serverless Components](https://github.com/serverless-nextjs/serverless-next.js/tree/master/packages/serverless-components/aws-cloudfront#3-configure) - Configurations for serverless component aws cloudfront!
- [AWS Cloudfront custom](https://serverless-nextjs.com/docs/customcloudfrontconfig) - Configurations custom for serverless component aws cloudfront!
- [AWS lambda@edge](https://serverless-nextjs.com/docs/lambdaatedgeconfig) - Configurations for serverless component aws lambda at lambda@edge
- [Deploy Webapp Nextjs](https://zditect.com/code/javascript/deploy-your-nextjs-apps-on-aws-lambdaedge-via-serverless-components.html) - Deploy your next application on AWS lambda@edge via serverless components!

## Requirenments

- serverless@2.7.0
- AWS Credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
  NOTE: configure the credentials in an .env file, place it on the root directory and on the serverless library so that it can connect to AWS.

## Install the dependencies

with npm

```sh
npm install -g serverless@2.7.0
```

## Deploy using serverless

run the next command

```sh
serverless
```

## Webapp deploy

Verify the deployment by navigating in
your preferred browser.

```sh
https://dnqhprtkix87s.cloudfront.net/
```
