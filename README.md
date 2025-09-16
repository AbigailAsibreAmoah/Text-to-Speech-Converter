# Text-to-Speech Application

A serverless text-to-speech application built with AWS services that converts English text to speech in multiple languages with translation capabilities.

## Features

- 🎤 **Text-to-Speech**: Convert text to natural-sounding speech using AWS Polly
- 🌍 **Multi-language Support**: English, French, German, and Korean
- 🔄 **Real-time Translation**: Automatic translation using AWS Translate
- 🎭 **Multiple Voices**: Different voice options for each language
- 📱 **Responsive Design**: Modern, mobile-friendly interface
- ☁️ **Serverless Architecture**: Fully serverless using AWS services

## Architecture

```
Frontend (React) → CloudFront → S3
     ↓
API Gateway → Lambda → AWS Polly + AWS Translate
     ↓
Audio Response (Base64 MP3)
```

## AWS Services Used

- **AWS Lambda**: Backend processing and API logic
- **API Gateway**: RESTful API endpoints
- **AWS Polly**: Text-to-speech synthesis
- **AWS Translate**: Multi-language translation
- **S3**: Static website hosting
- **CloudFront**: Content delivery network
- **IAM**: Security and permissions

## Project Structure

```
Text-to-speech/
├── frontend/              # Original backend infrastructure (development)
├── backend/               # Production infrastructure (Terraform)
├── react-app tts-frontend/ # React frontend application
└── README.md              # This file
```

## Quick Start

### Prerequisites

- AWS CLI configured with appropriate permissions
- Terraform installed
- Node.js and npm installed

### Deployment

1. **Deploy Infrastructure**:
   ```bash
   cd backend/
   terraform init
   terraform apply
   ```

2. **Build and Deploy Frontend**:
   ```bash
   cd react-app\ tts-frontend/
   npm install
   npm run build
   aws s3 sync build/ s3://your-frontend-bucket --delete
   ```

3. **Access Application**:
   - Use the CloudFront URL provided in Terraform outputs

## Usage

1. Enter English text in the textarea
2. Select desired voice and target language
3. Click "Convert to Speech"
4. View translation (if applicable) and play generated audio

## Supported Languages

- **English (US)**: Joanna, Matthew, Amy, Brian
- **French**: Celine
- **German**: Marlene  
- **Korean**: Seoyeon

## API Endpoints

- `POST /prod/speak` - Convert text to speech with translation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.