# 🎲 GPTQuest

An AI-powered text adventure game where your imagination is the only limit. Built with React, Rails, and OpenAI's GPT-3.5 Turbo.

## ✨ About

GPTQuest combines classic text-based adventure gaming with modern AI to create dynamic, personalized storytelling experiences. Each adventure is unique, with GPT-3.5 generating responses based on your choices and character context.

This project was created as my capstone for [Flatiron School](https://flatironschool.com/), showcasing full-stack development skills and creative API integration.

## 🎮 Features

- **Dynamic Storytelling**: AI-generated narratives that adapt to your choices
- **Character System**: Create and manage multiple characters across different adventures
- **Persistent Adventures**: Save your progress and return to your stories anytime
- **Item Management**: Collect and track items throughout your journey
- **User Authentication**: Secure accounts with personalized adventure histories

## 🛠️ Tech Stack

**Frontend**: React  
**Backend**: Ruby on Rails  
**AI Engine**: OpenAI GPT-3.5 Turbo  
**Database**: PostgreSQL (or SQLite for development)

## 🚀 Getting Started

### Prerequisites

- Ruby 2.7+ ([Installation Guide](https://www.ruby-lang.org/en/documentation/installation/))
- Node.js 14+ ([Installation Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/danielerice/GPTQuest.git
cd GPTQuest
```

**2. Backend Setup**
```bash
# Install dependencies
bundle install

# Set up database
rails db:create db:migrate db:seed

# Add your OpenAI API key to credentials
EDITOR="code --wait" rails credentials:edit
# Add: openai_api_key: your_key_here

# Start the Rails server
rails server
```

The backend will run at `http://localhost:3000`

**3. Frontend Setup**
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will run at `http://localhost:3001`

## 📖 How to Play

1. **Create an Account**: Sign up to start your adventure
2. **Create a Character**: Define your character's backstory and traits
3. **Choose an Adventure**: Select from available quests or create your own
4. **Make Choices**: The AI responds to your actions and decisions
5. **Collect Items**: Track your inventory as you progress
6. **Continue Your Story**: Your progress is saved automatically

## 🗺️ Project Structure

```
GPTQuest/
├── app/
│   ├── models/          # Rails models (User, Character, Adventure, Item)
│   ├── controllers/     # API endpoints
│   └── ...
├── client/
│   ├── src/
│   │   ├── components/  # React components
│   │   └── ...
│   └── package.json
├── db/
│   └── migrate/         # Database migrations
└── config/
    └── routes.rb        # API routes
```

## 🤝 Contributing

This is a learning project, but suggestions and feedback are always welcome! Feel free to:

- Open an issue for bugs or feature requests
- Fork the repo and submit a pull request
- Share your adventure stories!

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built during my time at [Flatiron School](https://flatironschool.com/)
- Powered by [OpenAI](https://openai.com/)
- Inspired by classic text adventure games and modern interactive fiction

## 📧 Contact

Created by [@danielerice](https://github.com/danielerice)

---

**Happy adventuring!** 🗡️✨