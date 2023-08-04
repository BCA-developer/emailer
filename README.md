# emailer
This is designed to enable sending emails from a BackEnd AWS application.  It assumes
that one has:
* access to an AWS account,
* followed the AWS-documented procedure enabling to successfully send emails from
a registered domain,
* associated that domain in DNS with the deployed application address,
* included the  folder named Config at the top-level of your application containing a
file named config.js containing a const JSON named config,
containing a key named "domain" whose value is the registered domain, and
* included the .aws folder with credentials to the AWS account under the app profile.
