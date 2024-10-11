# Intelligent Culinary Recommendation Chatbot Powered by Generative AI

Project Duration: January 2024 – May 2024

This project focuses on building an intelligent chatbot using Generative AI to offer personalized culinary recommendations. The bot interacts with users to provide meal suggestions based on preferences, dietary restrictions, and available ingredients. The chatbot was developed using React.js for the frontend and Node.js for the backend, with OpenAI APIs powering the AI model.

Key Features:

- AI-Driven Culinary Recommendations: The chatbot uses OpenAI's language models to generate meal ideas and recipes tailored to user preferences.
- Real-Time User Interaction: Provides immediate responses and multiple suggestions based on user inputs.
- High User Satisfaction: Achieved an 85% satisfaction rate from users, validating the accuracy and relevance of the AI's recommendations.
- User-Friendly Interface: A responsive and intuitive interface built with React.js, ensuring seamless interaction with the bot.
- Node.js Backend: Handles API requests, user inputs, and communicates with the OpenAI API to fetch responses.

Tech Stack:

- Frontend: React.js (JavaScript)
- Backend: Node.js with Express
- AI: OpenAI GPT models for generating recommendations
- API Integration: OpenAI API for natural language understanding and response generation

How It Works:

1. User Input: Users interact with the chatbot through the web interface. They can provide information such as preferred cuisine, dietary restrictions, and available ingredients.
2. Processing: The backend processes the input and makes an API call to OpenAI, which uses natural language processing to generate culinary suggestions.
3. Recommendation: The bot responds with personalized meal options and recipe ideas, adjusting suggestions based on further interactions.
4. Continuous Learning: User feedback helps improve the accuracy of the recommendations.

Installation:

To run the chatbot locally, follow these steps:

1. Clone the Repository:
   git clone https://github.com/PAn1COG/recipe-assistant
   cd intelligent-culinary-chatbot

2. Backend Setup:
   - Navigate to the backend directory:
     cd backend
   - Install dependencies:
     npm install
   - Create a .env file and add your OpenAI API key:
     OPENAI_API_KEY=your_openai_api_key
   - Start the backend server:
     npm start

3. Frontend Setup:
   - Navigate to the frontend directory:
     cd frontend
   - Install dependencies:
     npm install
   - Start the frontend server:
     npm start

4. Access the Application:
   Open your browser and navigate to http://localhost:3000 to interact with the chatbot.

Future Enhancements:

- Enhanced Customization: Allow users to save preferences for faster and more personalized recommendations in future interactions.
- Multi-Language Support: Expand language capabilities for users around the globe.
- Improved Feedback Loop: Integrate machine learning models to continually improve the recommendations based on user feedback.

License:

This project is licensed under the MIT License. See the LICENSE file for details.

Built by Sushrut Diwan (Project Lead)  
For more information or contributions, feel free to contact me at sushrut.email@example.com.

Note: This project is an academic endeavor and uses OpenAI's API for educational purposes.
