# Welcome To GPTQuest!!!

I built this site using [React](https://reactjs.org/) and [Rails](https://rubyonrails.org/) in the hopes that someone out there would get as much joy out of the storytelling as I do.

This is my capstone project for [Flatiron](https://base.flatironschool.com/), and as such it reflects what I learned on my way through the curriculum there. I incorporated all the front and backend skills taught to me to the best of my ability and learned even more along the way. I also stetched my understadning of both external API useage and AI language models by utilzing [OpenAI's](https://openai.com/) chat function and the GPT 3.5 Turbo therein.

# Cloning the Repository

Open your terminal.

Clone the repository to your local machine by replacing <your-username> with your GitHub username:

```c
git clone https://github.com/danielerice/GPTQuest.git
```


# Setting Up Rails Backend

Ensure you have Ruby installed. You can check this by running:

```c
ruby -v
```

If not, install Ruby from [here](https://www.ruby-lang.org/en/documentation/installation/)

Install the required gems:

```c
bundle install
```

Set up the database:

```c
rails db:create db:migrate
```

Start the Rails server:

```c
rails server
```

The Rails server will be running at http://localhost:3000.

# Setting Up React Frontend

Ensure you have Node.js installed. You can check this by running:

```c
node -v
```

If not, install Node.js from [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Install the required packages:

```c
cd client
npm install
```

Start the React development server:

```c
npm start
```

The React development server will be running at http://localhost:3001.

Now you have successfully set up the Rails and React app on your local machine!

Happy coding! 🚀

# Usage

This app is designed to be used as a text based adventuring game. Users make accounts and send api calls to openai with carefully constructed context parameters I have chosen specifically to result in predictable resposnes.
Thank you so much for taking the time to read this and try out the app, I worked hard on it! Enjoy!!