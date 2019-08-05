# weather-app
A simple application for getting the local weather using the Open Weather Map API. The app will get the user's current location or the user can search for an alternate location. The weather in the chosen location will then be displayed. 

### Install & Launch

Sign up for an API key at https://openweathermap.org/.

To run this application, please ensure you have NPM and the create-react-app package installed globally on your machine. 

Clone the Github repository.

```
    $ git clone https://github.com/jenleap/weather-app.git
```
Move into the weather-app folder and run the command:

```
    $ npm install
```
After all required packages have been installed, create a new file called config.js inside the util folder (src > util). Enter your API key in the file as follows:

```
    export const apiKey = "<your api key>";
```

Move back to the main weather-app folder and run the command:
```
    $ npm start
```

This will start the application. You can now access it from the url: localhost:3000