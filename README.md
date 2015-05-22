# hackernation

A single page application forum using [MEAN](http://blog.mongodb.org/post/49262866911/the-mean-stack-mongodb-expressjs-angularjs-and).

The purpose of hackernation as a platform is to share computer science / math problems meant to be solved using algorithms.

## Installation

* Hackernation is hosted here in Github. Simply follow one of these steps to download hackernation to your computer so you can run it locally:
  * Clone the git repository using ssh, https or with the [Windows](https://windows.github.com/) or [Mac](https://mac.github.com/) clients.
  * Download it as a [zip](https://github.com/dancmj/hackernation/archive/master.zip) file.
* Update your environment variables:
  * `export HACKERNATION_GITHUB_CLIENTID="5481f305ec2e0fccb6a8"`
  * `export HACKERNATION_GITHUB_CLIENTSECRET="c25295a0b5a43235678e680f3e9e2dd168f504db"`
  * `export HACKERNATION_DB="mongodb://steve:rogers@ds035702.mongolab.com:35702/hackernation-testing"`
* When you have Hackernation on your computer and updated the environment variables, run `npm install` & `bower install`.
* Run `nodemon` on the root of the folder.

Thats it, just go to `localhost:1337` and start hacking!

### Contributing
Improvements are changes of any kind are welcome, feel free to branch and crate a pull request.  Please make your changes in a new branch and request to pull into branch `master` but make sure the app is fully working before creating the pull request, unit tests will come soon.
