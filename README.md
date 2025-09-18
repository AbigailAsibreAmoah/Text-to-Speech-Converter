# Text-to-Speech Application

A serverless text-to-speech application built with AWS services that converts English text to speech in multiple languages with translation capabilities.

## Features

- **Text-to-Speech**: Convert text to natural-sounding speech using AWS Polly with SSML support
- **Multi-language Support**: English (US/UK), French, German, and Korean
- **Real-time Translation**: Automatic translation using AWS Translate
- **Multiple Voices**: Gender-specific voices with country flags for easy identification
- **Speed Control**: Adjustable playback speed (0.25x to 2.0x)
- **Download & Share**: Save audio files or share via native device sharing
- **Character Counter**: Real-time character count with 2500 character limit
- **Responsive Design**: Modern, mobile-friendly interface with animated background
- **Serverless Architecture**: Fully serverless using AWS services (~$0.11/month)

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

1. Enter English text in the textarea (up to 2500 characters)
2. Select desired voice with gender and country indicators
3. Choose target language for translation
4. Adjust speech speed (0.25x - 2.0x)
5. Click "Convert to Speech"
6. View translation and play generated audio
7. Download MP3 file or share via device sharing

## Supported Languages & Voices

- **English (US)**: Joanna (Female), Matthew (Male)
- **English (UK)**: Amy (Female), Brian (Male)
- **French**: Celine (Female)
- **German**: Marlene (Female)
- **Korean**: Seoyeon (Female)

## API Endpoints

- `POST /prod/speak` - Convert text to speech with translation and SSML support
  - Parameters: `text`, `voice`, `language`, `speed`
  - Returns: Base64 encoded MP3 audio + translation

## Cost Efficiency

**Monthly Cost Estimate: ~$0.11** (for 10K requests)
- S3 Static Hosting: ~$0.02
- CloudFront CDN: ~$0.01
- API Gateway: ~$0.04
- Lambda: ~$0.02
- AWS Polly: ~$0.016
- AWS Translate: ~$0.02

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Technical Features

- **SSML Support**: Speech Synthesis Markup Language for enhanced voice control
- **Client-side Audio Processing**: Download/share functionality runs in browser
- **Optimized Performance**: Single API call per conversion, minimal data transfer
- **Global CDN**: CloudFront distribution for worldwide performance
- **Auto-scaling**: Serverless architecture scales automatically

## License

This project is licensed under the MIT License.