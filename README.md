# text-4-art
Text +17732496838 for a random piece of art. Not affiliated with [@art-institute-of-chicago](https://github.com/art-institute-of-chicago)

## Built with
* [Twilio Programmable SMS](https://www.twilio.com/sms)
* [Art Institue of Chicago Public API](https://www.artic.edu/open-access/public-api)
* Node.js with an Express.js server

## Author
* **Anule Ndukwu** - [anule](https://github.com/anule)

## Development
To get started, first run `npm install` to install packages.

There is a different Twilio number that can be used for development. This number only works locally, when the development server is running. To send messages locally, run these two commands, in the following order
1. `npm run start-dev` - boots up a nodemon server that will hot-reload with changes
2. `npm run twilio-dev` - starts an ngrok tunnel that shows you http requests and responses to the live, test number.
The test number is written as part of the `twilio-dev` command in `package.json`.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgements
* Used search query from [@AICbot](https://twitter.com/aicbot) ([code](https://glitch.com/edit/#!/aicbot?path=helpers.js:7:0))
* Inspired by covid-19 museum-trip nostalgia and many afternoons playing hooky in the modern wing

